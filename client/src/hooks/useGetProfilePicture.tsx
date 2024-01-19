import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useGetProfilePictureProps = {
  sdk: SpotifyApi;
  userId: string | undefined;
};
export const useGetProfilePicture = ({
  sdk,
  userId,
}: useGetProfilePictureProps) => {
  const { data: profilePicture } = useQuery<string | undefined>({
    queryKey: ["get-profile-picture", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("Error fetching user data");
      }
      const fetchProfilePicture = (await sdk.users.profile(userId)).images[0]
        .url;

      if (fetchProfilePicture === undefined) {
        return undefined;
      }

      return fetchProfilePicture;
    },
  });
  return { profilePicture };
};
