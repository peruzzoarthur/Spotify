import React from "react";
import { Album } from "@spotify/web-api-ts-sdk";
import { AlbumCard } from "../AlbumCard";

type SearchAlbumsSectionProps = {
  albums: Album[];
};

export const SearchAlbumsSection: React.FC<SearchAlbumsSectionProps> = ({
  albums,
}: SearchAlbumsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Albums</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {albums.map((ab, index) => (
            <div key={index} className="mb-4 mr-4">
              <AlbumCard
                key={index}
                artists={ab.artists}
                id={ab.id}
                images={ab.images}
                genres={ab.genres}
                name={ab.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
