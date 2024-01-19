import React, { useContext } from "react";
import { Artist } from "@spotify/web-api-ts-sdk";
import { ArtistCardWithAddButton } from "../ArtistCard";
import { CartContext } from "../recommendation/RecommendationContext";
import { useToast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";

type SearchArtistsSectionProps = {
  artists: Artist[];
};

export const SearchArtistsSection: React.FC<SearchArtistsSectionProps> = ({
  artists,
}: SearchArtistsSectionProps) => {
  const { addToCart, errorMessage, setErrorMessage, cart } =
    useContext(CartContext);

  const { toast } = useToast();

  const toasted = (artist: Artist) => {
    const existingItem = cart.find((cartItem) => cartItem.id === artist.id);
    if (cart.length >= 5) {
      return;
    } else if (!existingItem) {
      toast({
        title: "Success! 🙌",
        description: `Added ${artist.name} to recommendation cart.`,
        className: "bg-emerald-600 bg-opacity-60 text-white",
      });
    } else {
      return;
    }
  };

  const handleAddToCart = (artist: Artist) => {
    addToCart(artist);
    toasted(artist);
  };

  const handleErrorMessage: React.MouseEventHandler<HTMLElement> = () => {
    setErrorMessage("");
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Artists</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {artists.map((artist, index) => (
            <div key={index} className="mb-4 mr-4">
              <ArtistCardWithAddButton
                genres={artist.genres.join(" • ")}
                image={artist.images}
                name={artist.name}
                id={artist.id}
                handleClick={() => handleAddToCart(artist)}
              />
            </div>
          ))}
          {errorMessage && (
            <Alert className="fixed text-white bg-red-800">
              <img className="w-4 h-4" src={logo} />
              <AlertTitle>{errorMessage}</AlertTitle>
              <AlertDescription
                className="cursor-pointer"
                onClick={handleErrorMessage}
              >
                Click to close message.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
