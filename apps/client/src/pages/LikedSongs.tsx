import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { LikedSongsHeader } from "@/components/liked-songs/LikedSongsHeader";
import { AnalogBackground } from "@/components/background/analogBackground";

import { LoadMoreButton } from "@/components/LoadMoreButton";
import { SelectAudioFeature } from "@/components/SelectAudioFeature";
import { sortOptions } from "@/components/SortOptions";
import { LikedSongsTracksSection } from "@/components/liked-songs/LikedSongsTracksSection";
import { Container } from "@/components/Container";
import { useSdk } from "@/hooks/useSdk";
import { useGetCurrentUserProfile } from "@/hooks/useGetCurrentUserProfilePicture";
import { CreateProgress } from "@/components/Progress";
import { useCreateProgress } from "@/hooks/useCreateProgress";
import { useLikedSongs } from "@/hooks/useLikedSongs";
// import { useGetArtistInfoById } from "@/hooks/useGetArtistInfoByIdArray";
// import axios from "axios";

export const LikedSongs = () => {
  const { progress } = useCreateProgress({
    // initialProgress: 13,
    // finalProgress: 66,
    delay: 800,
  });

  const sdk: SpotifyApi = useSdk();

  const {
    query,
    setSortValue,
    sortedTracks,
    likedSongsData,
    //  artistIds
  } = useLikedSongs({
    sdk,
  });

  const currentUserProfile = useGetCurrentUserProfile({ sdk });

  // const { artistData } = useGetArtistInfoById({ sdk: sdk, ids: artistIds });

  // artistData?.map((artist) => {
  //   axios.post("http://localhost:3000/artists", {
  //     name: artist.name,
  //     genres: artist.genres,
  //     user: currentUserProfile?.display_name,
  //     spotifyId: artist.id,
  //     imageUrl: artist.images[0].url,
  //   });
  // });

  if (query.error) {
    // TODO
    return <div>Error: {query.error.message}</div>;
  }

  return (
    <>
      <AnalogBackground>
        {currentUserProfile && (
          <LikedSongsHeader profile={currentUserProfile} />
        )}

        {query.isFetching && currentUserProfile && !query.data && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}

        <Container className="bg-black bg-opacity-20">
          {likedSongsData && query.data && (
            <>
              <SelectAudioFeature
                sortOptions={sortOptions}
                setSortValue={setSortValue}
              />
              <LikedSongsTracksSection tracks={sortedTracks} />
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
