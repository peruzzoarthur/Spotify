import { ReactNode, useContext } from "react";
import { CartContext } from "../recommendation/RecommendationContext";
import { Artist } from "@spotify/web-api-ts-sdk";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";
import { ArtistCardWithAddButton } from "../ArtistCard";
import { useToast } from "@/components/ui/use-toast";

type ArtistByIdRelatedArtistsSectionProps = {
  artists: Artist[];
  children?: ReactNode;
};

export const ArtistByIdRelatedArtistsSection = ({
  artists,
  children,
}: ArtistByIdRelatedArtistsSectionProps) => {
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
        <h2 className="ml-6 text-5xl text-left text-white">Related Artists</h2>

        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {artists.map((item, index) => (
            <div key={index}>
              <ArtistCardWithAddButton
                image={item.images}
                name={item.name}
                handleClick={() => handleAddToCart(item)}
                genres={item.genres.join(" • ")}
                id={item.id}
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
        <div className="flex justify-center pt-8 pb-4">{children}</div>
      </div>
    </>
  );
};
