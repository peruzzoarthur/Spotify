import { Page, SavedAlbum, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

type useGetSavedAlbumsProps = {
  sdk: SpotifyApi;
};

export const useGetSavedAlbums = ({ sdk }: useGetSavedAlbumsProps) => {
  const [savedAlbums, setSavedAlbums] = useState<SavedAlbum[]>([]);

  const updateAlbums = (newAlbums: SavedAlbum[]) => {
    setSavedAlbums((oldAlbums) => {
      if (oldAlbums) {
        return [...oldAlbums, ...newAlbums];
      } else {
        return [...newAlbums];
      }
    });
  };

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<Page<SavedAlbum>>({
    queryKey: ["user-saved-albums"],
    queryFn: async ({ pageParam = 0 }) => {
      const fetchSavedAlbums = await sdk.currentUser.albums.savedAlbums(
        50,
        Number(pageParam)
      );
      updateAlbums(fetchSavedAlbums.items);

      return fetchSavedAlbums;
    },
    enabled: !!sdk,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
      return;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    savedAlbums,
  };
};
