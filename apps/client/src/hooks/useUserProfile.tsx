import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";
import { SpotifyError } from "@/CustomError";

type useUserProfileProps = {
  sdk: SpotifyApi;
};

export const useUserProfile = ({ sdk }: useUserProfileProps) => {
  const { data, error, isFetching } = useQuery<UserProfile, SpotifyError>({
    queryKey: ["home"],
    queryFn: async () => {
      const fetchProfile = await sdk.currentUser.profile();
      return fetchProfile;
    },
    enabled: !!sdk,
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, error, isFetching };
};
