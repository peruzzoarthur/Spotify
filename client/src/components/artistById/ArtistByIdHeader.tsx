import { Artist } from "@spotify/web-api-ts-sdk";
import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

type ArtistByIdProps = {
  artistData: Artist;
};

export const ArtistByIdHeader: React.FC<ArtistByIdProps> = ({ artistData }) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-row">
          <Link to={artistData.uri}>
            <img
              src={artistData.images[0]?.url}
              className="ml-4 rounded-sm w-72 h-72"
            />
          </Link>
          <div className="flex flex-col items-start justify-center h-full mt-16 mb-2 ml-6">
            <h1 className="mt-16 ml-3 text-6xl text-white">
              {artistData.name}
            </h1>
            <div>
              <div className="flex flex-col mt-2 ml-4 text-lg text-white">
                {artistData.genres.join(" • ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
