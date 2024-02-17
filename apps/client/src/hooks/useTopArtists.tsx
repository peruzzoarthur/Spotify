import { useState } from "react";
import { Artist, Page, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

type useTopArtistsProps = {
  activeRange: TimeRange["value"];
  sdk: SpotifyApi;
};

export const useTopArtists = ({ activeRange, sdk }: useTopArtistsProps) => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  const updateTopArtists = (newArtists: Artist[]) => {
    setTopArtists((oldArtists) => {
      if (oldArtists) {
        return [...oldArtists, ...newArtists];
      } else {
        return [...newArtists];
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
  } = useInfiniteQuery<Page<Artist>>({
    queryKey: ["top-artists", activeRange],
    queryFn: async ({ pageParam = 0 }) => {
      const fetchTopArtists = await sdk.currentUser.topItems(
        "artists",
        activeRange,
        10,
        Number(pageParam)
      );

      updateTopArtists(fetchTopArtists.items);

      return fetchTopArtists;
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
    topArtists,
    setTopArtists,
  };
};
