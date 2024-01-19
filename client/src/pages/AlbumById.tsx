import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { CreateProgress } from "@/components/Progress";
import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";
import { AlbumByIdSection } from "@/components/albumById/AlbumByIdSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useAlbumByIdGetInfo } from "@/hooks/useAlbumByIdGetInfo";
import { useAlbumByIdGetTracks } from "@/hooks/useAlbumByIdGetTracks";
import { useConvertSimplifiedTrackToTrackWithAudioFeatures } from "@/hooks/useConvertSimplifiedTrackToTrack";
import { useGetArtistPicture } from "@/hooks/useGetArtistPicture";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export const AlbumById: React.FC = () => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 200);
    return () => clearTimeout(timer);
  }, []);

  const sdk: SpotifyApi = useSdk();

  const { albumData } = useAlbumByIdGetInfo({ sdk });
  const { artistPicture } = useGetArtistPicture({
    sdk: sdk,
    artistId: albumData?.artists[0].id,
  });

  const {
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ids,
  } = useAlbumByIdGetTracks({ sdk });

  const { convertedToTracks } =
    useConvertSimplifiedTrackToTrackWithAudioFeatures({
      ids,
      sdk,
    });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {albumData && (
          <AlbumByIdHeader
            artistPicture={artistPicture}
            albumData={albumData}
          />
        )}

        {isFetching && albumData && convertedToTracks.isFetching && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}
        {convertedToTracks.data && (
          <Container className="bg-black bg-opacity-60">
            <>
              <AlbumByIdSection
                albumData={albumData}
                tracks={convertedToTracks.data}
              />
              {hasNextPage && (
                <LoadMoreButton
                  isFetching={isFetching}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              )}
            </>
          </Container>
        )}
      </AnalogBackground>
    </>
  );
};
