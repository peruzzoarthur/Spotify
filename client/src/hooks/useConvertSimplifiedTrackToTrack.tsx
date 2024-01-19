import { TrackWithAudioFeatures } from "@/types";
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useConvertSimplifiedTrackToTrackProps = {
  ids: string[] | undefined;
  sdk: SpotifyApi;
};

export const useConvertSimplifiedTrackToTrackWithAudioFeatures = ({
  ids,
  sdk,
}: useConvertSimplifiedTrackToTrackProps) => {
  const { data, isFetching } = useQuery<TrackWithAudioFeatures[] | undefined>({
    queryKey: ["album-by-id", "tracks", ids],
    queryFn: async () => {
      if (!ids) {
        throw new Error("Failed fetching album tracks");
      }

      const fetch = await sdk.tracks.get(ids);
      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);
      const tracksWithAudioFeatures: TrackWithAudioFeatures[] = fetch.map(
        (t) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) => audioFeature.id === t.id
          );
          return {
            ...(t as Track),
            audio_features: correspondingAudioFeature,
          };
        }
      );

      return tracksWithAudioFeatures;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    convertedToTracks: {
      data,
      isFetching,
    },
  };
};
