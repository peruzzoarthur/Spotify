import { HttpResponse, http } from "msw";
import {
  blackSaintWhiteSinnerAlbum,
  blackSaintWhiteSinnerArtist,
  blackSaintWhiteSinnerSimpleTracks,
  clubeDaEsquinaAlbum,
  clubeDaEsquinaArtist,
  clubeDaEsquinaSimplifiedTracks,
} from "../mockedResponses/albums";

export const albumHandlers = [
  // mocking AlbumById with Charles Mingus Album
  http.get("https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV", () => {
    console.log("AlbumById --- albumMock");
    return HttpResponse.json(blackSaintWhiteSinnerAlbum);
  }),

  http.get("https://api.spotify.com/v1/albums/5risYG7klZCSLMNxB9dZhf", () => {
    console.log("AlbumById --- Clube Album Mock");
    return HttpResponse.json(clubeDaEsquinaAlbum);
  }),

  http.get(
    "https://api.spotify.com/v1/albums/6Sts4Yh7KsDFwq2yTWrGGV/tracks",
    () => {
      console.log("AlbumById --- Mocked Mingus Simplified Tracks");
      return HttpResponse.json(blackSaintWhiteSinnerSimpleTracks);
    }
  ),
  http.get(
    "https://api.spotify.com/v1/albums/5risYG7klZCSLMNxB9dZhf/tracks",
    () => {
      console.log("AlbumById --- Mocked Clube Simplified Tracks");
      return HttpResponse.json(clubeDaEsquinaSimplifiedTracks);
    }
  ),

  // 5risYG7klZCSLMNxB9dZhf

  http.get("https://api.spotify.com/v1/artists/1W8TbFzNS15VwsempfY12H", () => {
    console.log("AlbumById --- The Mingus Artists Mock's");
    return HttpResponse.json(blackSaintWhiteSinnerArtist);
  }),
  http.get("https://api.spotify.com/v1/artists/3Bnq7jiU506HcPjRgQ43TM", () => {
    console.log("AlbumById --- The Clube Artists Mock's");
    return HttpResponse.json(clubeDaEsquinaArtist);
  }),
];
