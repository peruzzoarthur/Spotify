import { Album, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useAlbumByIdGetInfo = ({ sdk }: { sdk: SpotifyApi }) => {
  const { id } = useParams<string>();

  if (!id) {
    throw new Error("No ID provided");
  }

  const {
    data: albumData,
    error,
    isFetching,
    isSuccess,
  } = useQuery<Album>({
    queryKey: ["album-by-id-info", id],
    queryFn: async () => {
      const fetchAlbumInfo = await sdk.albums.get(id);
      return fetchAlbumInfo;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { albumData, error, isFetching, isSuccess };
};
