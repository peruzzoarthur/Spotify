import { HttpResponse, http } from "msw";
import { profileMock } from "../mockedResponses";
import {
  longTermTopArtistsFirstRequest,
  longTermTopArtistsSecondRequest,
  mediumTermTopArtistsFirstRequest,
  mediumTermTopArtistsSecondRequest,
  profileFetchFiveArtists,
  shortTermTopArtistsFirstRequest,
  shortTermTopArtistsSecondRequest,
} from "../mockedResponses/topArtist";
import {
  longTermTopTracksFirstRequest,
  longTermTopTracksSecondRequest,
  mediumTermTopTracksFirstRequest,
  mediumTermTopTracksSecondRequest,
  profileFetchFiveTracks,
  shortTermTopTracksFirstRequest,
  shortTermTopTracksSecondRequest,
} from "../mockedResponses/topTracks";
import {
  playlistsFirstFetch,
  playlistsFourthFetch,
  playlistsSecondFetch,
  playlistsThirdFetch,
  profileFetchFivePlaylists,
} from "../mockedResponses/playlists";
import {
  profileFetchFiveAlbums,
  userAlbumsFirstRequest,
  userAlbumsSecondRequest,
} from "../mockedResponses/userAlbums";

export const meHandlers = [
  http.get("https://api.spotify.com/v1/me", () => {
    return HttpResponse.json(profileMock);
  }),
  http.get("https://api.spotify.com/v1/me/top/artists", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;

    if (search === "?limit=5") {
      console.log("Profile top artists :)");
      return HttpResponse.json(JSON.parse(profileFetchFiveArtists));
    } else if (search === "?time_range=short_term&limit=10&offset=0") {
      console.log("Short term -> first fetch - artists");
      return HttpResponse.json(JSON.parse(shortTermTopArtistsFirstRequest));
    } else if (search === "?time_range=short_term&limit=10&offset=10") {
      console.log("Short term -> second fetch - artists");
      return HttpResponse.json(JSON.parse(shortTermTopArtistsSecondRequest));
    } else if (search === "?time_range=medium_term&limit=10&offset=0") {
      console.log("Medium term -> first fetch - artists");
      return HttpResponse.json(JSON.parse(mediumTermTopArtistsFirstRequest));
    } else if (search === "?time_range=medium_term&limit=10&offset=10") {
      console.log("Medium term -> second fetch - artists");
      return HttpResponse.json(JSON.parse(mediumTermTopArtistsSecondRequest));
    } else if (search === "?time_range=long_term&limit=10&offset=0") {
      console.log("Long term -> first fetch - artists");
      return HttpResponse.json(JSON.parse(longTermTopArtistsFirstRequest));
    } else if (search === "?time_range=long_term&limit=10&offset=10") {
      console.log("Long term -> second fetch - artists");
      return HttpResponse.json(JSON.parse(longTermTopArtistsSecondRequest));
    }
  }),

  http.get("https://api.spotify.com/v1/me/top/tracks", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    if (search === "?limit=5") {
      console.log("Profile top tracks :)");
      return HttpResponse.json(JSON.parse(profileFetchFiveTracks));
    } else if (search === "?time_range=short_term&limit=10&offset=0") {
      console.log("Short term -> first fetch - tracks");
      return HttpResponse.json(JSON.parse(shortTermTopTracksFirstRequest));
    } else if (search === "?time_range=short_term&limit=10&offset=10") {
      console.log("Short term -> second fetch - tracks");
      return HttpResponse.json(JSON.parse(shortTermTopTracksSecondRequest));
    } else if (search === "?time_range=medium_term&limit=10&offset=0") {
      console.log("Medium term -> first fetch - tracks");
      return HttpResponse.json(JSON.parse(mediumTermTopTracksFirstRequest));
    } else if (search === "?time_range=medium_term&limit=10&offset=10") {
      console.log("Medium term -> second fetch - tracks");
      return HttpResponse.json(JSON.parse(mediumTermTopTracksSecondRequest));
    } else if (search === "?time_range=long_term&limit=10&offset=0") {
      console.log("Long term -> first fetch - tracks");
      return HttpResponse.json(JSON.parse(longTermTopTracksFirstRequest));
    } else if (search === "?time_range=long_term&limit=10&offset=10") {
      console.log("Long term -> second fetch - tracks");
      return HttpResponse.json(JSON.parse(longTermTopTracksSecondRequest));
    }
  }),

  http.get("https://api.spotify.com/v1/me/playlists", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    console.log(search);
    if (search === "?limit=5") {
      return HttpResponse.json(JSON.parse(profileFetchFivePlaylists));
    } else if (search === "?limit=25&offset=0") {
      return HttpResponse.json(JSON.parse(playlistsFirstFetch));
    } else if (search === "?limit=25&offset=25") {
      return HttpResponse.json(JSON.parse(playlistsSecondFetch));
    } else if (search === "?limit=25&offset=50") {
      return HttpResponse.json(JSON.parse(playlistsThirdFetch));
    } else if (search === "?limit=25&offset=75") {
      return HttpResponse.json(JSON.parse(playlistsFourthFetch));
    }
  }),

  http.get("https://api.spotify.com/v1/me/albums", ({ request }) => {
    const url = new URL(request.url);
    const search = url.search;
    console.log(search);
    if (search === "?limit=5") {
      return HttpResponse.json(JSON.parse(profileFetchFiveAlbums));
    } else if (search === "?limit=50&offset=0") {
      return HttpResponse.json(JSON.parse(userAlbumsFirstRequest));
    } else if (search === "?limit=50&offset=50") {
      return HttpResponse.json(JSON.parse(userAlbumsSecondRequest));
    }
  }),

  http.get("https://api.spotify.com/v1/users/sp3ruzzo", () => {
    console.log("Got your profile...");
    return HttpResponse.json({
      display_name: "sp3ruzzo_",
      external_urls: { spotify: "https://open.spotify.com/user/sp3ruzzo" },
      followers: { href: null, total: 8 },
      href: "https://api.spotify.com/v1/users/sp3ruzzo",
      id: "sp3ruzzo",
      images: [
        {
          url: "https://i.scdn.co/image/ab67757000003b82dc3b6eb0f878421bf88a5539",
          height: 64,
          width: 64,
        },
        {
          url: "https://i.scdn.co/image/ab6775700000ee85dc3b6eb0f878421bf88a5539",
          height: 300,
          width: 300,
        },
      ],
      type: "user",
      uri: "spotify:user:sp3ruzzo",
    });
  }),
];
