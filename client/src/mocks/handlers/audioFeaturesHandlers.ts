import { HttpResponse, http } from "msw";
import { audioFeaturesMock } from "../mockedResponses/tracksAudioFeatures";

export const audioFeaturesHandlers = [
  http.get("https://api.spotify.com/v1/audio-features", () => {
    console.log("AudioFeaturesMock");
    return HttpResponse.json(audioFeaturesMock);
  }),
];
