import { Container } from "@/components/Container";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { ArtistByIdAlbumsSection } from "@/components/artistById/ArtistByIdAlbumsSection";
import { ArtistByIdHeader } from "@/components/artistById/ArtistByIdHeader";
import { ArtistByIdRelatedArtistsSection } from "@/components/artistById/ArtistByIdRelatedArtistsSection";
import { ArtistByIdTopTracksSection } from "@/components/artistById/ArtistByIdTopTracksSection";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useArtistById } from "@/hooks/useArtistById";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import React from "react";

export const ArtistById: React.FC = () => {
  const sdk: SpotifyApi = useSdk();

  const { artist, relatedArtists, topTracks, artistAlbums } = useArtistById({
    sdk,
  });

  return (
    <>
      <AnalogBackground>
        {artist.artistData && (
          <ArtistByIdHeader artistData={artist.artistData} />
        )}

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
