import { LoudnessModifiedSlider } from "@/components/ui/modifiedSlider";
import React, { ReactNode } from "react";

type SliderLoudnessProps = {
  loudness: number[];
  setLoudness: React.Dispatch<React.SetStateAction<number[]>>;
  children?: ReactNode;
};

export const SliderLoudness: React.FC<SliderLoudnessProps> = ({
  loudness,
  setLoudness,
}) => {
  const handleValueChange = (value: number[]) => {
    setLoudness(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <LoudnessModifiedSlider
          className="text-white bg-white bg-opacity-40 w-240"
          defaultValue={loudness}
          min={-60}
          max={0}
          step={0.5}
          onValueChange={handleValueChange}
        />
        <p className="mb-2 ml-2 text-base">🔊</p>
      </div>
    </>
  );
};
