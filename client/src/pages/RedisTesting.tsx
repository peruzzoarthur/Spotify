import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { ArtistByIdAlbumsSection } from "@/components/artistById/ArtistByIdAlbumsSection";
import { ArtistByIdHeader } from "@/components/artistById/ArtistByIdHeader";
import { ArtistByIdRelatedArtistsSection } from "@/components/artistById/ArtistByIdRelatedArtistsSection";
import { ArtistByIdTopTracksSection } from "@/components/artistById/ArtistByIdTopTracksSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Button } from "@/components/ui/button";
import { useArtistById } from "@/hooks/useArtistById";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import axios from "axios";
import React from "react";

export const Redis: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { artist, relatedArtists, topTracks, artistAlbums } = useArtistById({
    sdk,
  });

  // const addArtistToRedis = () => {

  //   fetch("http://localhost:3000/saveArtistsByGenre", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestBody),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       // Handle response
  //     })
  //     .catch((error) => {
  //       throw new Error(error.message);
  //     });
  // };

  const addArtist2Redis = async () => {
    const requestBody = {
      genre: "test-genre",
      artists: [artist.artistData?.name],
    };
    const { data } = await axios.post(
      "http://localhost:3000/saveArtistsByGenre",
      requestBody
    );
    console.log(data);
  };

  return (
    <>
      <AnalogBackground>
        {artist.artistData && (
          <ArtistByIdHeader artistData={artist.artistData} />
        )}
        <Button className="text-white bg-black" onClick={addArtist2Redis}>
          REDIS
        </Button>

        {topTracks.artistTopTracks && (
          <>
            <Container className="bg-black bg-opacity-30">
              <ArtistByIdTopTracksSection tracks={topTracks.artistTopTracks} />
            </Container>
          </>
        )}

        {artistAlbums && (
          <>
            <Container className="bg-black bg-opacity-40">
              <ArtistByIdAlbumsSection artistAlbums={artistAlbums.albums}>
                <LoadMoreButton
                  fetchNextPage={artistAlbums.fetchNextPage}
                  hasNextPage={artistAlbums.hasNextPage}
                  isFetching={artistAlbums.isFetchingAlbums}
                  isFetchingNextPage={artistAlbums.isFetchingNextPage}
                />
              </ArtistByIdAlbumsSection>
            </Container>
          </>
        )}
        {relatedArtists.relatedArtistsData && (
          <Container className="bg-black bg-opacity-50">
            <ArtistByIdRelatedArtistsSection
              artists={relatedArtists.relatedArtistsData?.artists}
            />
          </Container>
        )}
      </AnalogBackground>
    </>
  );
};
