import { AnalogBackground } from "@/components/background/analogBackground";
import { TopArtistsHeader } from "@/components/topArtists/TopArtistsHeader";
import { TopArtistsOptions } from "@/components/topArtists/TopArtistsOptions";
import { TopArtistsSection } from "@/components/topArtists/TopArtistsSection";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { Container } from "@/components/Container";
import { useTopArtists } from "../hooks/useTopArtists";
import { useState } from "react";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { CreateProgress } from "@/components/Progress";
import { useCreateProgress } from "@/hooks/useCreateProgress";

export type TimeRange = {
  value: "short_term" | "medium_term" | "long_term";
};

export const TopArtists = () => {
  const { progress } = useCreateProgress({
    delay: 200,
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
    topArtists,
    setTopArtists,
  } = useTopArtists({ activeRange, sdk });

  const currentUserProfile = useGetCurrentUserProfile({ sdk });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {currentUserProfile && (
          <TopArtistsHeader profile={currentUserProfile} />
        )}

        {isFetching && currentUserProfile && !data && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}
        <Container>
          {data && topArtists && (
            <>
              <TopArtistsOptions
                setActiveRange={setActiveRange}
                activeRange={activeRange}
                setTopArtists={setTopArtists}
              />

              <TopArtistsSection artists={topArtists} />

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
