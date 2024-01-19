import { TrackWithAudioFeatures } from "@/types";
import { Table, TableBody } from "../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import logo from "../../styles/img/spotify_logologo.jpg";
import { TrackTableHeader } from "../TrackTableHeader";
import { useContext } from "react";
import { CartContext } from "../recommendation/RecommendationContext";
import { useToast } from "../ui/use-toast";
import { TrackTableRow } from "../TrackTableRow";

type ArtistByIdTopTracksSectionProps = {
  tracks: TrackWithAudioFeatures[];
};

export const ArtistByIdTopTracksSection: React.FC<
  ArtistByIdTopTracksSectionProps
> = ({ tracks }) => {
  const { addToCart, errorMessage, setErrorMessage, cart } =
    useContext(CartContext);

  const { toast } = useToast();

  const toasted = (track: TrackWithAudioFeatures) => {
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
      <div className="flex flex-col items-start justify-center w-full mt-8">
        <h2 className="ml-6 text-5xl text-left text-white">Top tracks</h2>

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
      </div>
    </>
  );
};
