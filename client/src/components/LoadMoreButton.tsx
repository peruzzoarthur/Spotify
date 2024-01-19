import React from "react";
import { Button } from "./ui/button";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import {
  Artist,
  Page,
  Playlist,
  PlaylistedTrack,
  SimplifiedPlaylist,
  Track,
} from "@spotify/web-api-ts-sdk";

type LoadMoreButtonProps = {
  isFetching?: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        | Page<Artist | Track | SimplifiedPlaylist | Playlist | PlaylistedTrack>
        | undefined
        | unknown,
        unknown
      >,
      Error
    >
  >;
};

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <Button
      className="flex items-center text-white transition-all duration-500 bg-black w-300 bg-opacity-80 hover:scale-110"
      onClick={async (e) => {
        e.preventDefault();
        await fetchNextPage();
      }}
    >
      {isFetching && !isFetchingNextPage
        ? "Loading..."
        : isFetchingNextPage
        ? "Loading More..."
        : hasNextPage
        ? "Load More"
        : "Nothing to Load"}
    </Button>
  );
};
