import { http, HttpResponse } from "msw";

import { allMockedTracks } from "../mockedResponses/tracksRoute";

export const tracksHandlers = [
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  http.get("https://api.spotify.com/v1/tracks", ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    const ids1Line = url.searchParams.getAll("ids");
    const singleLineIds = ids1Line[0];
    const ids = singleLineIds.split(",");
    console.log(ids);
    console.log("Tracks --- tracks Mock");

    const checkMockedTracks = allMockedTracks.tracks.filter((track) =>
      ids.includes(track.id)
    );
    if (checkMockedTracks.length > 0) {
      return HttpResponse.json({
        tracks: checkMockedTracks,
      });
    } else {
      return;
    }
  }),
];
