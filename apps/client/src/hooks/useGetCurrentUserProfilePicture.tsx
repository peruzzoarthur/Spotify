import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useGetCurrentUserProfileProps = {
  sdk: SpotifyApi;
};
export const useGetCurrentUserProfile = ({
  sdk,
}: useGetCurrentUserProfileProps) => {
  const { data: currentUserProfile } = useQuery<UserProfile>({
    queryKey: ["get-currentUser-profile"],
    queryFn: async () => {
      const fetchCurrentUserProfile = await sdk.currentUser.profile();
      return fetchCurrentUserProfile;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return currentUserProfile;
};
