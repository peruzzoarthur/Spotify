import { sortOptions } from "../components/SortOptions";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";
import { PlaylistByIdHeader } from "@/components/playlistById/PlaylistByIdHeader";
import { PlaylistByIdTracksSection } from "@/components/playlistById/PlaylistByIdTracksSection";
import { SelectAudioFeature } from "@/components/SelectAudioFeature";
import { useGetProfilePicture } from "@/hooks/useGetProfilePicture";
import { useSdk } from "@/hooks/useSdk";
import { usePlaylistById } from "@/hooks/usePlaylistById";
import { useCreateProgress } from "@/hooks/useCreateProgress";
import { CreateProgress } from "@/components/Progress";

export const PlaylistById = () => {
  const { progress } = useCreateProgress({
    // initialProgress: 13,
    // finalProgress: 66,
    delay: 800,
  });
  const sdk = useSdk();

  const {
    query,
    playlistInfo,
    setSortValue,
    sortedTracks,
    playlistTracksData,
  } = usePlaylistById({ sdk });

  const { profilePicture } = useGetProfilePicture({
    sdk: sdk,
    userId: playlistInfo?.owner.id,
  });

  if (query.error) {
    // TODO
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {playlistInfo && (
          <PlaylistByIdHeader
            profilePicture={profilePicture}
            playlistData={playlistInfo}
          />
        )}

        {query.isFetching && playlistInfo && !query.data && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}
        <Container className="bg-black bg-opacity-20">
          {playlistTracksData && (
            <>
              <SelectAudioFeature
                setSortValue={setSortValue}
                sortOptions={sortOptions}
              />
              <PlaylistByIdTracksSection tracks={sortedTracks} />

              <LoadMoreButton
                isFetching={query.isFetching}
                fetchNextPage={query.fetchNextPage}
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
              />
            </>
          )}
        </Container>
      </AnalogBackground>
    </>
  );
};
