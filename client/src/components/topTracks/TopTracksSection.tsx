import { ReactNode, useContext } from "react";
import { CartContext } from "../recommendation/RecommendationContext";
import { Track } from "@spotify/web-api-ts-sdk";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";
import { useToast } from "../ui/use-toast";
import { TrackCardWithAddButton } from "../TrackCard";

interface TopTracksSectionsProps {
  topTracks: Track[];
  children?: ReactNode;
}

export const TopTracksSection = ({
  topTracks,
  children,
}: TopTracksSectionsProps) => {
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
      <div className="pt-8 pb-4 min-h-640">
        {/* <h2 className="ml-4 text-4xl text-left text-white">
          Input Data for Recommendations
        </h2> */}
        <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {topTracks.map((item, index) => (
            <div key={index}>
              <TrackCardWithAddButton
                image={item.album.images}
                name={item.name}
                handleClick={() => handleAddToCart(item)}
                artists={item.artists.map((a) => a.name).join(", ")}
                duration={item.duration_ms}
                popularity={item.popularity}
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
