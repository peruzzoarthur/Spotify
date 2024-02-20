// import { Artist, SpotifyApi } from "@spotify/web-api-ts-sdk";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Genre = {
  name: string;
  timestamp: string;
  createdAt: string;
  artists?: {
    id: string;
    name: string;
    timestamp: string;
    createdAt: string;
    discoveredBy?: string;
    spotifyId: string;
    imageUrl?: string;
  }[];
  discoveredBy?: string;
};

export const useGetGenres = () => {
  const { data: allGenresData } = useQuery({
    queryKey: ["get-all-genres"],
    queryFn: async (): Promise<Genre[]> => {
      const { data }: { data: Genre[] } = await axios.get(
        "http://localhost:3000/genres"
      );

      return data;
    },
  });

  return {
    allGenresData,
  };
};
