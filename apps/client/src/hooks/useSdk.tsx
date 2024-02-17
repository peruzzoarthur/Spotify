import {
  client_id,
  redirect_url,
  // redirect_url,
  scopes,
  // secret,
} from "@/spotify";
import {
  // AccessToken,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { useSpotify } from "./useSpotify";

export const useSdk = () => {
  return useSpotify(client_id, redirect_url, scopes) as SpotifyApi;
};

//

// const token = JSON.parse(
//   localStorage.getItem(
//     "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token"
//   ) as string
// ) as unknown as AccessToken;
// if (token) {
//   return SpotifyApi.withAccessToken(client_id, token);
// } else {
//   return SpotifyApi.withUserAuthorization(client_id, redirect_url, [scopes]);
