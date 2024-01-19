import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtistProps } from "@/types";
import React from "react";
import { AddButton } from "./AddButton";
import { RemoveButton } from "./RemoveButton";
import { Link } from "react-router-dom";

export const ArtistCard: React.FC<ArtistProps> = ({
  genres,
  image,
  name,
  id,
}) => {
  return (
    <>
      <Card className="mt-6 mb-2 ml-6 mr-6 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-3 h-460 w-300">
        <CardHeader>
          {image[0] && (
            <Link to={`/artist/${id}`}>
              <img
                src={image[0].url}
                alt={name}
                className="w-56 h-56 rounded-lg"
              />
            </Link>
          )}
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light ">{genres}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export const ArtistCardWithAddButton: React.FC<ArtistProps> = ({
  genres,
  image,
  name,
  handleClick,
  id,
}) => {
  return (
    <>
      <Card className="mt-6 mb-2 ml-6 mr-6 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-3 h-460 w-300">
        <CardHeader>
          {image[0] && (
            <Link to={`/artist/${id}`}>
              <img
                src={image[0].url}
                alt={name}
                className="w-56 h-56 rounded-lg"
              />
            </Link>
          )}
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light ">{genres}</CardDescription>
        </CardHeader>
        <CardFooter className="">
          <AddButton handleClick={handleClick} />
        </CardFooter>
      </Card>
    </>
  );
};

export const ArtistCardWithRemoveButton: React.FC<ArtistProps> = ({
  genres,
  image,
  name,
  handleClick,
  id,
}) => {
  return (
    <>
      <Card className="mt-2 mb-2 ml-6 mr-6 text-white transition-all duration-700 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-20 hover:pt-2 hover:pl-3 h-500 w-300">
        <CardHeader>
          {image[0] && (
            <Link to={`/artist/${id}`} target="_blank">
              <img
                src={image[0].url}
                alt={name}
                className="w-56 h-56 rounded-lg"
              />
            </Link>
          )}
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription className="font-light ">{genres}</CardDescription>
        </CardHeader>
        <CardFooter>
          <RemoveButton handleClick={handleClick} />
        </CardFooter>
      </Card>
    </>
  );
};
