import { ModifiedSlider } from "@/components/ui/modifiedSlider";
import React, { ReactNode } from "react";

type SliderInstrumentalnessProps = {
  instrumentalness: number[];
  setInstrumentalness: React.Dispatch<React.SetStateAction<number[]>>;
  children?: ReactNode;
};

export const SliderInstrumentalness: React.FC<SliderInstrumentalnessProps> = ({
  instrumentalness,
  setInstrumentalness,
}) => {
  const handleValueChange = (value: number[]) => {
    setInstrumentalness(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ModifiedSlider
          className="text-white bg-white bg-opacity-40 w-240"
          defaultValue={instrumentalness}
          max={1}
          step={0.01}
          onValueChange={handleValueChange}
        />
        <p className="mb-2 ml-2 text-base">🎷</p>
      </div>
    </>
  );
};
