import React from "react";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

type AddButtonProps = {
  handleClick?: () => void;
  className?: string;
};

export const AddButton: React.FC<AddButtonProps> = ({
  handleClick,
  className,
}) => {
  return (
    <Button
      onClick={handleClick}
      className={twMerge(
        "text-white transition-all duration-500 bg-emerald-600 bg-opacity-60 hover:scale-110",
        className
      )}
    >
      Add
    </Button>
  );
};
