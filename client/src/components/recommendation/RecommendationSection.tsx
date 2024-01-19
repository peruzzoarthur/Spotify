import React, { ReactNode, useContext } from "react";
import { CartContext, CartItem } from "./RecommendationContext";
import { Artist, Track } from "@spotify/web-api-ts-sdk";
import { ArtistCardWithRemoveButton } from "../ArtistCard";
import { TrackCardWithRemoveButton } from "../TrackCard";

type RecommendationSectionProps = {
  children?: ReactNode;
};

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  children,
}: RecommendationSectionProps) => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="pt-8 pb-4 min-h-640">
        <h2 className="ml-4 text-4xl text-left text-white">
          Input Data for Recommendations
        </h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {cart.map((item, index) => (
            <div key={index}>
              {isTrack(item) && (
                <TrackCardWithRemoveButton
                  artists={item.artists.map((a) => a.name).join(", ")}
                  image={item.album.images}
                  name={item.name}
                  handleClick={() => handleRemoveFromCart(item.id)}
                  duration={item.duration_ms}
                  popularity={item.popularity}
                />
              )}

              {isArtist(item) && (
                <ArtistCardWithRemoveButton
                  genres={item.genres.join(" • ")}
                  image={item.images}
                  name={item.name}
                  handleClick={() => handleRemoveFromCart(item.id)}
                  id={item.id}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-8 pb-4">{children}</div>
      </div>
    </>
  );
};

// Type guards
function isTrack(item: CartItem): item is Track {
  return (item as Track).type === "track";
}

function isArtist(item: CartItem): item is Artist {
  return (item as Artist).type === "artist";
}
