import { SavedAlbum } from "@spotify/web-api-ts-sdk";
import { ReactNode } from "react";
import { AlbumCard } from "../AlbumCard";

type AlbumsSectionProps = {
  savedAlbums: SavedAlbum[];
  children?: ReactNode;
};

export const AlbumsSection = ({
  savedAlbums,
  children,
}: AlbumsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {savedAlbums.map((item, index) => (
            <div key={index}>
              <AlbumCard
                artists={item.album.artists}
                id={item.album.id}
                images={item.album.images}
                name={item.album.name}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-8 pb-4">{children}</div>
    </>
  );
};
