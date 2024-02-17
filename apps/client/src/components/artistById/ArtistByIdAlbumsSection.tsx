import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk";
import { ReactNode } from "react";
import { AlbumCard } from "../AlbumCard";

interface ArtistByIdAlbumsSectionProps {
  artistAlbums: SimplifiedAlbum[];
  children?: ReactNode;
}

export const ArtistByIdAlbumsSection = ({
  artistAlbums,
  children,
}: ArtistByIdAlbumsSectionProps) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Albums</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {artistAlbums.map((item, index) => (
            <div key={index}>
              <AlbumCard
                artists={item.artists}
                id={item.id}
                images={item.images}
                name={item.name}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-8 pb-4">{children}</div>
    </>
  );
};
