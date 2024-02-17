import { Page, SimplifiedPlaylist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

type userGetPlaylistsProps = {
  sdk: SpotifyApi;
};

export const useGetPlaylists = ({ sdk }: userGetPlaylistsProps) => {
  const [playlists, setPlaylists] = useState<SimplifiedPlaylist[]>([]);

  const updatePlaylists = (newPlaylists: SimplifiedPlaylist[]) => {
    setPlaylists((oldPlaylists) => {
      if (oldPlaylists) {
        return [...oldPlaylists, ...newPlaylists];
      } else {
        return [...newPlaylists];
      }
    });
  };
  const {
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<Page<SimplifiedPlaylist>>({
    queryKey: ["playlists"],

    queryFn: async ({ pageParam }) => {
      const fetch = await sdk.currentUser.playlists.playlists(
        25,
        Number(pageParam)
      );

      await updatePlaylists(fetch.items);

      return fetch;
    },

    enabled: !!sdk,

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
    },
  });
  return {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    playlists,
    setPlaylists,
  };
};
