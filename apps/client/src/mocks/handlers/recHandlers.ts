import { HttpResponse, http } from "msw";
import { recommendationResponseMocked } from "../mockedResponses/recommendation";

export const recHandlers = [
  http.get("https://api.spotify.com/v1/recommendations", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    console.log(search);
    if (
      search ===
      "?seed_tracks=1Jmqubf9kGkWeYQXQKImL5%2C1LAHOjKgPPioDsT6k9EBNw%2C3afeZ81GDy59tATovKyH6Z%2C7K1YQElsdDnETP0jA7d0BS&seed_genres=&seed_artists=22WZ7M8sxp5THdruNY3gXt&limit=20"
    )
      return HttpResponse.json(JSON.parse(recommendationResponseMocked));
  }),
];
