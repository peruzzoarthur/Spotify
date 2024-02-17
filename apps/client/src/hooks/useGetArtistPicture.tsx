import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useGetArtistPictureProps = {
  sdk: SpotifyApi;
  artistId: string | undefined;
};
export const useGetArtistPicture = ({
  sdk,
  artistId,
}: useGetArtistPictureProps) => {
  const { data: artistPicture } = useQuery<string>({
    queryKey: ["get-artist-picture", artistId],
    queryFn: async () => {
      if (!artistId) {
        throw new Error("Error fetching user data");
      }
      const fetchArtistPicture = (await sdk.artists.get(artistId)).images[0]
        .url;
      return fetchArtistPicture;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { artistPicture };
};
