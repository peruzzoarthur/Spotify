import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { CreateProgress } from "@/components/Progress";
import { AlbumHeader } from "@/components/albums/AlbumsHeader";
import { AlbumsSection } from "@/components/albums/AlbumsSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { useGetSavedAlbums } from "@/hooks/useGetSavedAlbums";
import { useSdk } from "@/hooks/useSdk";
import React, { useEffect, useState } from "react";

export const Albums: React.FC = () => {
  const [progress, setProgress] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sdk = useSdk();

  const currentUserProfile = useGetCurrentUserProfile({ sdk });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    savedAlbums,
  } = useGetSavedAlbums({ sdk });

  if (error instanceof Error) {
    <div>{error.message}</div>;
  }
  return (
    <>
      <AnalogBackground>
        {currentUserProfile && <AlbumHeader profile={currentUserProfile} />}
        {isFetching && !data && currentUserProfile ? (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        ) : (
          <>
            <Container>
              <AlbumsSection savedAlbums={savedAlbums}>
                <LoadMoreButton
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage}
                  isFetching={isFetching}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </AlbumsSection>
            </Container>
          </>
        )}
      </AnalogBackground>
    </>
  );
};
