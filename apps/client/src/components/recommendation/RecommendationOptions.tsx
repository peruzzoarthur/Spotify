import React from "react";
import { Button } from "../ui/button";
import { SliderValence } from "./sliders/SliderValence";
import { SliderDanceability } from "./sliders/SliderDanceability";
import { SliderEnergy } from "./sliders/SliderEnergy";
import { SliderLoudness } from "./sliders/SliderLoudness";
import { SliderSpeechiness } from "./sliders/SliderSpeechiness";
import { SliderAcousticness } from "./sliders/SliderAcousticness";
import { SliderInstrumentalness } from "./sliders/SliderInstrumentalness";
import { SliderLiveness } from "./sliders/SliderLiveness";

type RecommendationOptionsProps = {
  isFilters: boolean;
  isFiltersExpanded: boolean;
  setIsFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFiltersExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setTryAgain: React.Dispatch<React.SetStateAction<boolean>>;
  // af props
  danceability: number[];
  setDanceability: React.Dispatch<React.SetStateAction<number[]>>;
  energy: number[];
  setEnergy: React.Dispatch<React.SetStateAction<number[]>>;
  loudness: number[];
  setLoudness: React.Dispatch<React.SetStateAction<number[]>>;
  speechiness: number[];
  setSpeechiness: React.Dispatch<React.SetStateAction<number[]>>;
  acousticness: number[];
  setAcousticness: React.Dispatch<React.SetStateAction<number[]>>;
  instrumentalness: number[];
  setInstrumentalness: React.Dispatch<React.SetStateAction<number[]>>;
  liveness: number[];
  setLiveness: React.Dispatch<React.SetStateAction<number[]>>;
  valence: number[];
  setValence: React.Dispatch<React.SetStateAction<number[]>>;
};

export const RecommendationOptions: React.FC<RecommendationOptionsProps> = ({
  isFilters,
  isFiltersExpanded,
  setIsFilters,
  setIsFiltersExpanded,
  setTryAgain,
  danceability,
  setDanceability,
  acousticness,
  energy,
  instrumentalness,
  liveness,
  loudness,
  setAcousticness,
  setEnergy,
  setInstrumentalness,
  setLiveness,
  setLoudness,
  setSpeechiness,
  speechiness,
  valence,
  setValence,
}) => {
  const handleSetFilter = () => {
    if (!isFilters) {
      setValence([0.5]);
      setDanceability([0.5]);
      setAcousticness([0.5]);
      setEnergy([0.5]);
      setInstrumentalness([0.5]);
      setLiveness([0.5]);
      ~setLoudness([-30]);
      setSpeechiness([0.5]);
      setIsFilters(true);
      setIsFiltersExpanded(true);
    } else if (!isFiltersExpanded) {
      setIsFiltersExpanded(true);
    } else {
      setIsFiltersExpanded(false);
    }
  };

  const handleTryAgain = () => {
    setTryAgain(true);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black bg-opacity-60">
      <Button
        className="w-32 mt-4 mb-4 text-white bg-white bg-opacity-20"
        onClick={handleSetFilter}
      >
        Filters
      </Button>
      {isFilters && isFiltersExpanded && (
        <>
          <div className="grid grid-cols-2 gap-x-4">
            <SliderDanceability
              danceability={danceability}
              setDanceability={setDanceability}
            />
            <SliderEnergy energy={energy} setEnergy={setEnergy} />
            <SliderLoudness loudness={loudness} setLoudness={setLoudness} />
            <SliderSpeechiness
              speechiness={speechiness}
              setSpeechiness={setSpeechiness}
            />
            <SliderAcousticness
              acousticness={acousticness}
              setAcousticness={setAcousticness}
            />
            <SliderInstrumentalness
              instrumentalness={instrumentalness}
              setInstrumentalness={setInstrumentalness}
            />
            <SliderLiveness liveness={liveness} setLiveness={setLiveness} />

            <SliderValence valence={valence} setValence={setValence} />
          </div>
          <Button
            className="mt-4 mb-4 text-white w-300 bg-purple-950 bg-opacity-40"
            onClick={handleTryAgain}
          >
            Refresh Recommended Tracks
          </Button>
        </>
      )}
    </div>
  );
};
