import axios from "axios";

type requestBodyParams = {
  name: string | undefined;
  genres: string[] | undefined;
  user: string | undefined;
  spotifyId: string | undefined;
  imageUrl: string | undefined;
};

export const useCollectArtist = (
  artistName: string | undefined,
  artistGenres: string[] | undefined,
  user: string | undefined,
  spotifyId: string | undefined,
  imageUrl: string | undefined
) => {
  const collect = async () => {
    try {
      const requestBody: requestBodyParams = {
        name: artistName,
        genres: artistGenres,
        user: user,
        spotifyId: spotifyId,
        imageUrl: imageUrl,
      };
      const { data } = await axios.post(
        "http://localhost:3000/artists",
        requestBody
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error)
        if (error.response) {
          console.error(
            "Request failed with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Request made but no response received");
        } else {
          console.error("Error setting up the request:", error.message);
        }
      } else {
        // Non-Axios error
        console.error("An error occurred during the request.");
      }
    }
  };
  return { collect };
};
