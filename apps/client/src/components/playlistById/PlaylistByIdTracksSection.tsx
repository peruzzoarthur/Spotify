import { useContext } from "react";
import { CartContext } from "../recommendation/RecommendationContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";
import { Table, TableBody } from "../ui/table";
import { TrackTableHeader } from "../TrackTableHeader";
import { TrackTableRow } from "../TrackTableRow";
import { Track } from "@spotify/web-api-ts-sdk";
import { useToast } from "../ui/use-toast";
import { TrackWithAudioFeatures } from "@/types";

type PlaylistByIdTracksSectionProps = {
  tracks: TrackWithAudioFeatures[];
};
export const PlaylistByIdTracksSection = ({
  tracks,
}: PlaylistByIdTracksSectionProps) => {
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

  const handleAddToCart = (track: TrackWithAudioFeatures) => {
    addToCart(track);
    toasted(track);
  };

  const handleErrorMessage: React.MouseEventHandler<HTMLElement> = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-4 pb-2 pl-4 pr-4"></div>
      <section className="w-full h-auto pb-2">
        <Table>
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
          <TrackTableHeader />
          <TableBody>
            {tracks.map((track, index) => (
              <TrackTableRow
                key={index}
                artists={track.artists.map((a) => a.name).join(", ")}
                duration={track.duration_ms}
                id={track.id}
                image={track.album.images}
                index={index}
                name={track.name}
                order={index + 1}
                uri={track.uri}
                popularity={track.popularity}
                audio_features={track.audio_features}
                handleClick={() => handleAddToCart(track)}
              />
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};
