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

export const useGetGenres = () =>
  // { sdk }: { sdk: SpotifyApi }
  {
    // const [artistsIds, setArtistsIds] = useState<string[]>([]);
    // const [artists, setArtists] = useState<Artist[]>([]);

    const { data: allGenresData } = useQuery({
      queryKey: ["get-all-genres"],
      queryFn: async (): Promise<Genre[]> => {
        const { data }: { data: Genre[] } = await axios.get(
          "http://localhost:3000/genres"
        );
        // const ids = data.flatMap((g) => g.artists?.map((a) => a.spotifyId) || []);
        // setArtistsIds(ids);

        // const fetchArtists = await Promise.all(
        //   artistsIds.map(async (id) => await sdk.artists.get(id))
        // );
        // setArtists(fetchArtists);

        return data;
      },
    });

    return {
      allGenresData,
      // artists
    };
  };
