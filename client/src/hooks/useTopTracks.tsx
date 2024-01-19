import { useState } from "react";

import { Page, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

type useTopArtistsProps = {
  activeRange: TimeRange["value"];
  sdk: SpotifyApi;
};

export const useTopTracks = ({ activeRange, sdk }: useTopArtistsProps) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const updateTracks = (newTracks: Track[]) => {
    setTopTracks((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
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
  } = useInfiniteQuery<Page<Track>>({
    queryKey: ["top-tracks", activeRange],
    queryFn: async ({ pageParam = 0 }) => {
      const fetchTopTracks = await sdk.currentUser.topItems(
        "tracks",
        activeRange,
        10,
        Number(pageParam)
      );

      updateTracks(fetchTopTracks.items);

      return fetchTopTracks;
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
    topTracks,
    setTopTracks,
  };
};
