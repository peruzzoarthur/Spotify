import { AudioFeaturesWithListOrder } from "@/types";
import React, { useState } from "react";
import { Button } from "./ui/button";

type SelectAudioFeatureProps = {
  sortOptions: string[];
  setSortValue: React.Dispatch<
    React.SetStateAction<keyof AudioFeaturesWithListOrder>
  >;
};

export const SelectAudioFeature: React.FC<SelectAudioFeatureProps> = ({
  sortOptions,
  setSortValue,
}: SelectAudioFeatureProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setSortValue(option as keyof AudioFeaturesWithListOrder);
    setSelectedOption(option);
  };
  return (
    <div className="flex justify-center mt-2 mb-2 ">
      {sortOptions.map((option) => (
        <Button
          key={option}
          className={`mr-1 transition-all duration-500 ${
            selectedOption === option
              ? "bg-black bg-opacity-70 hover:scale-105 hover:bg-opacity-80 border border-white" // Add styles for selected option
              : "bg-black bg-opacity-70 hover:scale-105 hover:bg-opacity-80"
          }`}
          onClick={() => handleButtonClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};
