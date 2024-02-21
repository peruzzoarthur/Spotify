// import { Artist, SpotifyApi } from "@spotify/web-api-ts-sdk";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";

export type Genre = {
  name: string;
  timestamp: string;
  createdAt: string;
  artists: {
    id: string;
    name: string;
    timestamp: string;
    createdAt: string;
    discoveredBy?: string;
    spotifyId: string;
    imageUrl?: string;
    spotifyUri?: string;
  }[];
  discoveredBy?: string;
};

export const useGetGenres = () => {
  const { data: allGenresData, isFetching } = useQuery({
    queryKey: ["get-all-genres"],
    queryFn: async (): Promise<Genre[] | undefined> => {
      const { data }: { data: Genre[] } = await axios.get(
        "http://localhost:3000/genres"
      );
      if (data) {
        return data;
      }
      return;
    },
  });

  const [arraySize, setArraySize] = useState<number>(10);

  const filteredGenresData = useMemo(() => {
    return allGenresData?.filter((genre) => genre.artists.length >= arraySize);
  }, [allGenresData, arraySize]);

  return {
    allGenresData,
    isFetching,
    filteredGenresData,
    setArraySize,
  };
};
