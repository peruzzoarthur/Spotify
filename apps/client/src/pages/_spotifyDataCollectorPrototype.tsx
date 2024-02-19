// import { Container } from "@/components/Container";
// import { LoadMoreButton } from "@/components/LoadMoreButton";
// import { ArtistByIdAlbumsSection } from "@/components/artistById/ArtistByIdAlbumsSection";
// import { ArtistByIdHeader } from "@/components/artistById/ArtistByIdHeader";
// import { ArtistByIdRelatedArtistsSection } from "@/components/artistById/ArtistByIdRelatedArtistsSection";
// import { ArtistByIdTopTracksSection } from "@/components/artistById/ArtistByIdTopTracksSection";
// import { AnalogBackground } from "@/components/background/analogBackground";
// // import { Button } from "@/components/ui/button";
// import { useArtistById } from "@/hooks/useArtistById";
// import { useCollectArtist } from "@/hooks/useCollectArtist";
// import { useSdk } from "@/hooks/useSdk";
// import { useUserProfile } from "@/hooks/useUserProfile";
// import { SpotifyApi } from "@spotify/web-api-ts-sdk";
// import React from "react";

// export const SpotifyDataCollectorPrototype: React.FC = () => {
//   const sdk: SpotifyApi = useSdk();

//   const { artist, relatedArtists, topTracks, artistAlbums } = useArtistById({
//     sdk,
//   });

//   const { data: userProfile } = useUserProfile({ sdk });

//   const { collect } = useCollectArtist(
//     artist.artistData?.name,
//     artist.artistData?.genres,
//     userProfile?.display_name
//   );
//   if (artist && userProfile) {
//     collect();
//   }

//   return (
//     <>
//       <AnalogBackground>
//         {artist.artistData && (
//           <ArtistByIdHeader artistData={artist.artistData} />
//         )}
//         {/* <Button className="text-white bg-black" onClick={collect}>
//           Collect
//         </Button> */}

//         {topTracks.artistTopTracks && (
//           <>
//             <Container className="bg-black bg-opacity-30">
//               <ArtistByIdTopTracksSection tracks={topTracks.artistTopTracks} />
//             </Container>
//           </>
//         )}

//         {artistAlbums && (
//           <>
//             <Container className="bg-black bg-opacity-40">
//               <ArtistByIdAlbumsSection artistAlbums={artistAlbums.albums}>
//                 <LoadMoreButton
//                   fetchNextPage={artistAlbums.fetchNextPage}
//                   hasNextPage={artistAlbums.hasNextPage}
//                   isFetching={artistAlbums.isFetchingAlbums}
//                   isFetchingNextPage={artistAlbums.isFetchingNextPage}
//                 />
//               </ArtistByIdAlbumsSection>
//             </Container>
//           </>
//         )}
//         {relatedArtists.relatedArtistsData && (
//           <Container className="bg-black bg-opacity-50">
//             <ArtistByIdRelatedArtistsSection
//               artists={relatedArtists.relatedArtistsData?.artists}
//             />
//           </Container>
//         )}
//       </AnalogBackground>
//     </>
//   );
// };
