import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaylistProps } from "@/types";
import React from "react";
import { Link } from "react-router-dom";

export const PlaylistCard: React.FC<PlaylistProps> = ({
  totalTracks,
  image,
  name,
  id,
}) => {
  return (
    <>
      <Card className="mt-6 mb-2 ml-6 mr-6 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-3 h-460 w-300">
        <CardHeader>
          {image[0] && (
            <Link to={`/playlist/${id}`}>
              <img
                src={image[0].url}
                alt={name}
                className="w-56 h-56 rounded-lg"
              />
            </Link>
          )}
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light ">
            {totalTracks} tracks
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};
