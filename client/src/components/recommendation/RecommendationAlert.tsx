import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CustomError } from "@/CustomError";
import logo from "../../styles/img/spotify_logologo.jpg";

type RecommendationAlertProps = {
  error: CustomError;
  onClick: () => void;
  description: string;
};

export const RecommendationAlert: React.FC<RecommendationAlertProps> = ({
  description,
  error,
  onClick,
}) => {
  return (
    <Alert
      variant="destructive"
      onClick={onClick}
      className="text-white bg-red-800 cursor-pointer"
    >
      <img className="w-4 h-4" src={logo} />
      <AlertTitle>{error.message}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
