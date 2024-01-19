import React from "react";
import { Artist } from "@spotify/web-api-ts-sdk";
import { ArtistCard } from "../ArtistCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileTopArtistsSectionProps = {
  topArtists: Artist[];
};

export const ProfileTopArtistsSection: React.FC<
  ProfileTopArtistsSectionProps
> = ({ topArtists }: ProfileTopArtistsSectionProps) => {
  return (
    <>
      <div className="flex flex-row items-start justify-between mt-6">
        <h2 className="justify-start ml-6 text-4xl text-left text-white lg:ml-12 sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl">
          Top Artists
        </h2>
        <ShowAllButton
          className="mt-1 mr-6 bg-black lg:mt-4 lg:mr-12 hover:bg-opacity-60"
          url="/top-artists"
        />
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {topArtists.map((artist, index) => (
          <div key={index} className="mb-4 mr-4">
            <ArtistCard
              genres={artist.genres.join(" • ")}
              image={artist.images}
              name={artist.name}
              id={artist.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};
