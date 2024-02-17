import { AnalogBackground } from "@/components/background/analogBackground";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";
import { TopTracksHeader } from "@/components/topTracks/TopTracksHeader";
import { TopTracksSection } from "@/components/topTracks/TopTracksSection";
import { useTopTracks, TimeRange } from "../hooks/useTopTracks";
import TopTracksOptions from "@/components/topTracks/TopTracksOptions";
import { useState } from "react";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { useCreateProgress } from "@/hooks/useCreateProgress";
import { CreateProgress } from "@/components/Progress";

export const TopTracks = () => {
  const { progress } = useCreateProgress({
    delay: 220,
  });

  const [activeRange, setActiveRange] =
    useState<TimeRange["value"]>("short_term");

  const sdk: SpotifyApi = useSdk();

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    topTracks,
    setTopTracks,
  } = useTopTracks({ activeRange, sdk });

  const currentUserProfile = useGetCurrentUserProfile({ sdk });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {currentUserProfile && <TopTracksHeader profile={currentUserProfile} />}

        {isFetching && currentUserProfile && !data && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}
        <Container>
          {data && topTracks && (
            <>
              <TopTracksOptions
                setActiveRange={setActiveRange}
                activeRange={activeRange}
                setTopTracks={setTopTracks}
              />
              <TopTracksSection topTracks={topTracks} />

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
    </>
  );
};
