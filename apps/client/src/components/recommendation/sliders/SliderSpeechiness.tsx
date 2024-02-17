import { ModifiedSlider } from "@/components/ui/modifiedSlider";
import React, { ReactNode } from "react";

type SliderSpeechinessProps = {
  speechiness: number[];
  setSpeechiness: React.Dispatch<React.SetStateAction<number[]>>;
  children?: ReactNode;
};

export const SliderSpeechiness: React.FC<SliderSpeechinessProps> = ({
  speechiness,
  setSpeechiness,
}) => {
  const handleValueChange = (value: number[]) => {
    setSpeechiness(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ModifiedSlider
          className="text-white bg-white bg-opacity-40 w-240"
          defaultValue={speechiness}
          max={1}
          step={0.01}
          onValueChange={handleValueChange}
        />
        <p className="mb-2 ml-2 text-base">🗣️</p>
      </div>
    </>
  );
};
