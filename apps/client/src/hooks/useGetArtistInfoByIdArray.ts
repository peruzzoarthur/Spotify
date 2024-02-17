import { Artist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

export const useGetArtistInfoById = ({
  sdk,
  ids,
}: {
  sdk: SpotifyApi;
  ids: string[];
}) => {
  const { data: artistData } = useQuery<Artist[]>({
    queryKey: ["artists-by-array-of-ids", ids],
    queryFn: async () => {
      console.log(ids);
      const artists = await Promise.all(
        ids.map(async (id) => {
          const artist = await sdk.artists.get(id);
          console.log(`Artist data for ${id}:`, artist);
          return artist;
        })
      );
      return artists;
    },
    enabled: !!sdk && !!ids,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    artistData,
  };
};
