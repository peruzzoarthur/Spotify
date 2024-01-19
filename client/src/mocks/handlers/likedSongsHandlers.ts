import { http, HttpResponse } from "msw";
import {
  likedSongsFirstFetch,
  likedSongsSecondFetch,
} from "../mockedResponses/likedSongs";

export const likeSongsHandlers = [
  http.get("https://api.spotify.com/v1/me/tracks", ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    if (url.search === "?limit=50&offset=0") {
      console.log("mOck LikED?");

      return HttpResponse.json(JSON.parse(likedSongsFirstFetch));
    } else if (url.search === "?limit=50&offset=10") {
      console.log("Load more please?");

      return HttpResponse.json(JSON.parse(likedSongsSecondFetch));
    } else {
      console.log("Calling with spotify api");
      return;
    }
  }),
];
