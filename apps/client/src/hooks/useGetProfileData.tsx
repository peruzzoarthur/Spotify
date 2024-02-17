import {
  Artist,
  SavedAlbum,
  SimplifiedPlaylist,
  SpotifyApi,
  Track,
  UserProfile,
} from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useGetProfileDataProps = {
  sdk: SpotifyApi;
};

export const useGetProfileData = ({ sdk }: useGetProfileDataProps) => {
  const {
    data: profileData,
    error: profileError,
    isFetching: profileFetching,
  } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const fetchProfileData = sdk.currentUser.profile();
      return fetchProfileData;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: userTopItems,
    error: topItemsError,
    isFetching: topItemsFetching,
  } = useQuery<{
    topArtists: Artist[];
    topTracks: Track[];
  }>({
    queryKey: ["profile", "top-items"],
    queryFn: async () => {
      const fetchTopArtists = (
        await sdk.currentUser.topItems("artists", undefined, 5)
      ).items;
      const fetchTopTracks = (
        await sdk.currentUser.topItems("tracks", undefined, 5)
      ).items;
      return { topArtists: fetchTopArtists, topTracks: fetchTopTracks };
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: userPlaylists,
    error: playlistsError,
    isFetching: playlistsFetching,
  } = useQuery<SimplifiedPlaylist[]>({
    queryKey: ["profile", "user-playlists"],
    queryFn: async () => {
      const fetchUserPlaylists = (await sdk.currentUser.playlists.playlists(5))
        .items;
      return fetchUserPlaylists;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: savedAlbums,
    error: savedAlbumsError,
    isFetching: savedAlbumsFetching,
  } = useQuery<SavedAlbum[]>({
    queryKey: ["profile", "saved-albums"],
    queryFn: async () => {
      const fetchSavedAlbums = (await sdk.currentUser.albums.savedAlbums(5))
        .items;
      return fetchSavedAlbums;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data: { profileData, userTopItems, userPlaylists, savedAlbums },
    error: { profileError, topItemsError, playlistsError, savedAlbumsError },
    state: {
      profileFetching,
      topItemsFetching,
      playlistsFetching,
      savedAlbumsFetching,
    },
  };
};
