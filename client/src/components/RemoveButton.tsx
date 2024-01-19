import React from "react";
import { Button } from "./ui/button";

type RemoveButtonProps = {
  handleClick?: () => void;
};

export const RemoveButton: React.FC<RemoveButtonProps> = ({ handleClick }) => {
  return (
    <Button
      onClick={handleClick}
      className="text-white transition-all duration-500 bg-red-600 bg-opacity-60 hover:scale-110 "
    >
      Remove
    </Button>
  );
};
