import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const ContainerDark: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white bg-black rounded-md bg-opacity-80">
      {children}
    </div>
  );
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center text-white bg-white rounded-md bg-opacity-20",
        className
      )}
    >
      {children}
    </div>
  );
};
