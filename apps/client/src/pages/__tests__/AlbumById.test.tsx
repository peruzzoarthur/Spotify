// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { renderWithClient } from "@/mocks/utils";
// import { AlbumById } from "../AlbumById";
// import { waitFor } from "@testing-library/react";
// import { vi } from "vitest";
// import {
//   Album,
//   Market,
//   MaxInt,
//   Page,
//   SimplifiedTrack,
//   SpotifyApi,
// } from "@spotify/web-api-ts-sdk";
// import { albumMock, pagedAlbumMock } from "@/mocks/mockedResponses";
// import { AlbumByIdHeader } from "@/components/albumById/AlbumByIdHeader";

// const buildSpotifySdkMock = () =>
//   ({
//     albums: {
//       get: async (_id: string, _market?: Market): Promise<Album> => {
//         return albumMock as unknown as Album;
//       },
//       tracks: async (
//         _albumId: string,
//         _market?: Market,
//         _limit?: MaxInt<50>,
//         _offset?: number
//       ): Promise<Page<SimplifiedTrack>> => {
//         return pagedAlbumMock as Page<SimplifiedTrack>;
//       },
//     },
//   } as SpotifyApi);

// const mockedSdk = buildSpotifySdkMock();

// vi.mock("@/hooks/useSpotify", () => ({
//   useSpotify: () => {
//     return mockedSdk;
//   },
// }));

// vi.mock("react-router-dom", () => ({
//   useParams: () => ({
//     id: "666",
//   }),
//   Link: () => <a href="/">A Mocked Link</a>,
// }));
// describe("AlbumById Component Tests", async () => {
//   it("renders the HEADER with the correct ui", async () => {
//     const result = renderWithClient(
//       <AlbumByIdHeader albumData={albumMock as unknown as Album} />
//     );
//     waitFor(() =>
//       expect(result.baseElement).toMatchInlineSnapshot(`
//       <body>
//         <div>
//           <div
//             class="flex flex-col bg-black bg-opacity-30"
//           >
//             <div
//               class="flex justify-end mt-1 mr-2"
//             >
//               <button
//                 aria-expanded="false"
//                 aria-haspopup="menu"
//                 data-state="closed"
//                 id="radix-:r0:"
//                 type="button"
//               >

//                 <img
//                   alt="Spotify Logo"
//                   class="w-24 h-24 rounded-full"
//                   src="/src/styles/img/spotify_logologo.jpg"
//                 />
//               </button>
//             </div>
//             <div
//               class="flex flex-row"
//             >
//               <img
//                 class="ml-4 rounded-sm w-72 h-72"
//                 src="https://i.scdn.co/image/ab67616d0000b273eb5b1b39c6c992b79b27651e"
//               />
//               <div
//                 class="flex flex-col items-start justify-center h-full mt-16 mb-2 ml-6"
//               >
//                 <h1
//                   class="mt-16 ml-3 text-6xl text-white"
//                 >
//                   The Black Saint And The Sinner Lady
//                 </h1>
//                 <div>
//                   <div
//                     class="mt-2 ml-4 text-lg text-white"
//                   >
//                     Charles Mingus
//                   </div>
//                 </div>
//                 <div
//                   class="flex flex-row ml-5 text-xs text-slate-100"
//                 >
//                   <a
//                     href="/"
//                   >
//                     A Mocked Link
//                   </a>
//                   <a
//                     href="/"
//                   >
//                     A Mocked Link
//                   </a>
//                   <p
//                     class="ml-2"
//                   >
//                     /
//                     The Black Saint And The Sinner Lady
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     `)
//     );
//   });

//   it.only("renders the SECTION with the correct ui", async () => {
//     const result = renderWithClient(<AlbumById />);
//     await waitFor(async () => {
//       expect(result.getAllByRole("heading")).toMatchInlineSnapshot();
//     });
//   });
// });
