import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ShowAllButtonProps {
  url: string;
  className?: string;
}

export const ShowAllButton = ({ url, className }: ShowAllButtonProps) => {
  return (
    <Link to={url}>
      <Button
        className={`mt-2 ml-2 text-white bg-black bg-opacity-50 hover:scale-125 transition-all duration-700 hover:bg-opacity-30 ${className}`}
      >
        Show all
      </Button>
    </Link>
  );
};
