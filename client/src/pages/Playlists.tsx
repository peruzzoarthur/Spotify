import { PlaylistsHeader } from "@/components/playlists/PlaylistsHeader";
import { PlaylistsSection } from "@/components/playlists/PlaylistsSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";
import { useSdk } from "@/hooks/useSdk";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { useGetPlaylists } from "@/hooks/useGetPlaylists";
import { CreateProgress } from "@/components/Progress";
import { useCreateProgress } from "@/hooks/useCreateProgress";

export const Playlists = () => {
  const { progress } = useCreateProgress({
    // initialProgress: 13,
    // finalProgress: 66,
    delay: 350,
  });
  const sdk = useSdk();

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    playlists,
  } = useGetPlaylists({ sdk });

  const currentUserProfile = useGetCurrentUserProfile({ sdk });

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <AnalogBackground>
      {currentUserProfile && <PlaylistsHeader profile={currentUserProfile} />}
      {isFetching && currentUserProfile && !data && (
        <>
          <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
            {CreateProgress({ progress })}
          </Container>
        </>
      )}
      <Container>
        {data && playlists && (
          <>
            <PlaylistsSection playlists={playlists} />
            <LoadMoreButton
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        )}
      </Container>
    </AnalogBackground>
  );
};
