import { Track } from "@spotify/web-api-ts-sdk";
import React, { useContext } from "react";
import { TrackCardWithAddButton } from "../TrackCard";
import { CartContext } from "../recommendation/RecommendationContext";
import { useToast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";

type SearchTracksSectionProps = {
  tracks: Track[];
};

export const SearchTracksSection: React.FC<SearchTracksSectionProps> = ({
  tracks,
}: SearchTracksSectionProps) => {
  const { addToCart, errorMessage, setErrorMessage, cart } =
    useContext(CartContext);

  const { toast } = useToast();

  const toasted = (track: Track) => {
    const existingItem = cart.find((cartItem) => cartItem.id === track.id);
    if (cart.length >= 5) {
      return;
    } else if (!existingItem) {
      toast({
        title: "Success! 🙌",
        description: `Added ${track.name} to recommendation cart.`,
        className: "bg-emerald-600 bg-opacity-60 text-white",
      });
    }
  };

  const handleAddToCart = (track: Track) => {
    addToCart(track);
    toasted(track);
  };

  const handleErrorMessage: React.MouseEventHandler<HTMLElement> = () => {
    setErrorMessage("");
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Tracks</h2>
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {tracks.map((t, index) => (
            <TrackCardWithAddButton
              key={index}
              artists={t.artists.map((a) => a.name).join(", ")}
              name={t.name}
              image={t.album.images}
              handleClick={() => handleAddToCart(t)}
            />
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
