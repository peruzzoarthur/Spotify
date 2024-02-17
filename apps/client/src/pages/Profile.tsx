import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { AnalogBackground } from "@/components/background/analogBackground";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTopArtistsSection } from "@/components/profile/ProfileTopArtistsSection";
import { ProfileTopTracksSection } from "@/components/profile/ProfileTopTracksSection";
import { ProfilePlaylistsSection } from "@/components/profile/ProfilePlaylistsSection";
import { useSdk } from "@/hooks/useSdk";
import { useGetProfileData } from "@/hooks/useGetProfileData";
import { ProfileSavedAlbumsSection } from "@/components/profile/ProfileSavedAlbumsSection";
import { CreateProgress } from "@/components/Progress";
import { Container } from "@/components/Container";
import { useCreateProgress } from "@/hooks/useCreateProgress";

export const Profile = () => {
  const { progress } = useCreateProgress({
    delay: 180,
  });
  const sdk: SpotifyApi = useSdk();

  const { data, state, error } = useGetProfileData({ sdk });

  if (error instanceof Error) {
    return (
      <>
        <div> {error.profileError?.message}</div>
        <div> {error.playlistsError?.message}</div>
        <div> {error.topItemsError?.message}</div>
      </>
    );
  }

  return (
    <AnalogBackground>
      {data.profileData && (
        <ProfileHeader
          followers={data.profileData.followers.total}
          image={data.profileData.images[1]?.url}
          name={data.profileData.display_name}
        />
      )}

      {state.topItemsFetching &&
        !data.userTopItems &&
        !data.userPlaylists &&
        !data.savedAlbums && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}
      {data.userTopItems?.topArtists && (
        <ProfileTopArtistsSection topArtists={data.userTopItems.topArtists} />
      )}

      {data.userTopItems?.topTracks && (
        <ProfileTopTracksSection topTracks={data.userTopItems.topTracks} />
      )}

      {data.userPlaylists && (
        <ProfilePlaylistsSection playlists={data.userPlaylists} />
      )}

      {data.savedAlbums && (
        <ProfileSavedAlbumsSection savedAlbum={data.savedAlbums} />
      )}
    </AnalogBackground>
  );
};
