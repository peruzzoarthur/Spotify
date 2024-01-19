import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {
  Config,
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import {
  CartContext,
  CartItem,
} from "../components/recommendation/RecommendationContext";
import { RecommendationHeader } from "../components/recommendation/RecommendationHeader";
import { RecommendationSection } from "../components/recommendation/RecommendationSection";
import { useSpotify } from "../hooks/useSpotify";
import { client_id, redirect_url, scopes } from "../spotify";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import logo from "../styles/img/spotify_logologo.jpg";
import { Table, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrackTableRow } from "@/components/TrackTableRow";
import { TrackTableHeader } from "@/components/TrackTableHeader";
import { useToast } from "@/components/ui/use-toast";
import { CustomError } from "@/CustomError";
import { AnalogBackground } from "@/components/background/analogBackground";
import { RecommendationAlert } from "@/components/recommendation/RecommendationAlert";
import { ContainerDark } from "@/components/Container";
import { RecommendationOptions } from "@/components/recommendation/RecommendationOptions";
import { RecommendationsResponse } from "@/types";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const Recommendation = (): React.JSX.Element => {
  // Context
  const { requestSeeds, cart } = useContext(CartContext);
  // To export playlist state
  const [addAsPlaylist, setAddAsPlaylist] = useState<string[]>([]);
  // Audio features states
  const [danceability, setDanceability] = useState<number[]>([]);
  const [energy, setEnergy] = useState<number[]>([]);
  const [loudness, setLoudness] = useState<number[]>([]);
  const [speechiness, setSpeechiness] = useState<number[]>([]);
  const [acousticness, setAcousticness] = useState<number[]>([]);
  const [instrumentalness, setInstrumentalness] = useState<number[]>([]);
  const [liveness, setLiveness] = useState<number[]>([]);
  const [valence, setValence] = useState<number[]>([]);
  // State functionality options
  const [isFilters, setIsFilters] = useState<boolean>(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false);
  const [tryAgain, setTryAgain] = useState<boolean>(false);

  // Toast
  const { toast } = useToast();

  // Init SDK
  const sdk = useSpotify(client_id, redirect_url, scopes) as SpotifyApi;

  // Handle creating and exporting playlist
  const handleExportAsPlaylist = async (): Promise<void> => {
    // define toast reaction for playlist creation
    const toasted = async () => {
      toast({
        title: "Success! 🙌",
        description: `Created playlist with name "Cold ${randomCoolPlaylistName}"`,
        className: "bg-black bg-opacity-60 text-white",
      });
    };

    // extract a string of the cart elements for further adding to playlist description... this need better implementing...
    // todo
    const extractSeedsList = (
      cart: CartItem[]
    ): { tracks: string; artists: string } => {
      const trackNames: string[] = [];
      const artistNames: string[] = [];

      cart.forEach((item) => {
        if (item.type === "track") {
          trackNames.push(item.name);
        } else if (item.type === "artist") {
          artistNames.push(item.name);
        }
      });
      const tracksString = trackNames.join(", ");
      const artistsString = artistNames.join(", ");

      return { tracks: tracksString, artists: artistsString };
    };

    const seedsList = extractSeedsList(cart);

    // generate random string for naming the playlist
    const randomStringConfig: Config = {
      dictionaries: [colors, adjectives, animals],
      separator: " ",
      length: 3,
    };

    const randomCoolPlaylistName = uniqueNamesGenerator(randomStringConfig);

    // get the username for calling createPlaylist
    const username = (await sdk.currentUser.profile()).id;

    // create playlist with random name and added seeds to description...
    const createPlaylist = await sdk.playlists.createPlaylist(username, {
      name: `Cold ${randomCoolPlaylistName}`,
      description:
        `Created with Coldzapp Spotify API.` +
        `  // Track Seeds: ${seedsList.tracks}` +
        `  // Artist Seeds: ${seedsList.artists}`,
      public: true,
    });

    // add recommended tracks (state: addAsPlaylist) to the above created randomNamedPlaylist
    const addRecommendationsToPlaylist = await sdk.playlists.addItemsToPlaylist(
      createPlaylist.id,
      addAsPlaylist
    );

    // toast it
    await toasted();

    return addRecommendationsToPlaylist;
  };

  // fetching and managing recommendations with useQuery
  const { data, error, isFetching } = useQuery<
    RecommendationsResponse | undefined,
    CustomError
  >({
    queryKey: ["recommendation-response", tryAgain, requestSeeds],
    queryFn: async () => {
      if (
        requestSeeds.seed_artists.length === 0 &&
        requestSeeds.seed_genres.length === 0 &&
        requestSeeds.seed_tracks.length === 0
      ) {
        throw new CustomError(
          "Please select at least one artist, genre, or track for recommendations.",
          400 //todo
        );
      }

      try {
        const fetchRecommendations = await sdk.recommendations.get({
          ...requestSeeds,
          limit: 20,
          target_acousticness: acousticness[0],
          target_danceability: danceability[0],
          target_energy: energy[0],
          target_instrumentalness: instrumentalness[0],
          target_liveness: liveness[0],
          target_loudness: loudness[0],
          target_speechiness: speechiness[0],
          target_valence: valence[0],
        });

        setAddAsPlaylist(fetchRecommendations.tracks.map((t) => t.uri));

        const fetchAudioFeatures = await sdk.tracks.audioFeatures(
          fetchRecommendations.tracks.map((t) => t.id)
        );

        const recommendationWithAudioFeatures: RecommendationsResponse = {
          seeds: fetchRecommendations.seeds,
          tracks: fetchRecommendations.tracks.map((track, index) => ({
            ...track,
            audio_features: fetchAudioFeatures[index],
          })),
        };

        setTryAgain(false);

        return recommendationWithAudioFeatures;
      } catch (error) {
        throw new CustomError(`Something bad happened.`, 429);
      }
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  if (error) {
    const defaultBehavior = {
      onClick: () => window.location.reload(),
      description: "Click to try again",
    };

    const returnBehavior = {
      onClick: () => (window.location.href = "/"),
      description: "Go back home",
    };

    return (
      <>
        <AnalogBackground>
          {!isFetching && error.status === 401 && (
            <RecommendationAlert
              error={error}
              description={returnBehavior.description}
              onClick={returnBehavior.onClick}
            />
          )}
          {!isFetching && error.status !== 401 && (
            <RecommendationAlert
              error={error}
              description={defaultBehavior.description}
              onClick={defaultBehavior.onClick}
            />
          )}
          <RecommendationHeader />
          <RecommendationSection />
        </AnalogBackground>
      </>
    );
  }

  return (
    <>
      <AnalogBackground>
        <RecommendationHeader />
        <RecommendationSection />
        <RecommendationOptions
          isFilters={isFilters}
          isFiltersExpanded={isFiltersExpanded}
          setIsFilters={setIsFilters}
          setIsFiltersExpanded={setIsFiltersExpanded}
          setValence={setValence}
          valence={valence}
          setTryAgain={setTryAgain}
          danceability={danceability}
          setDanceability={setDanceability}
          acousticness={acousticness}
          setAcousticness={setAcousticness}
          energy={energy}
          setEnergy={setEnergy}
          loudness={loudness}
          setLoudness={setLoudness}
          liveness={liveness}
          setLiveness={setLiveness}
          instrumentalness={instrumentalness}
          setInstrumentalness={setInstrumentalness}
          speechiness={speechiness}
          setSpeechiness={setSpeechiness}
        />
        {data && data.tracks.length !== 0 ? (
          <ContainerDark>
            <h1 className="mt-6 mb-6 text-2xl">Recommended Tracks</h1>
            {!isFetching ? (
              <>
                <Table>
                  <TrackTableHeader />
                  <TableBody>
                    {data.tracks.map((track, index) => (
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
                      />
                    ))}
                  </TableBody>
                </Table>

                {addAsPlaylist.length > 0 && (
                  <div className="flex">
                    <Button
                      onClick={async () => await handleExportAsPlaylist()}
                      className="flex items-center mt-2 text-white transition-all duration-500 bg-white w-300 bg-opacity-30 hover:scale-110"
                    >
                      Export as Cool Playlist
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-white"> Loading... </div>
            )}
          </ContainerDark>
        ) : (
          !isFetching &&
          data &&
          data.tracks.length === 0 && (
            <Alert
              variant="destructive"
              onClick={() => window.location.reload()}
              className="text-white bg-red-800 cursor-pointer"
            >
              <img className="w-4 h-4" src={logo} />
              <AlertTitle>Seed issue 😩</AlertTitle>
              <AlertDescription>
                Please re-adjust your seeds and clickOnMe...
              </AlertDescription>
            </Alert>
          )
        )}
      </AnalogBackground>
    </>
  );
};
