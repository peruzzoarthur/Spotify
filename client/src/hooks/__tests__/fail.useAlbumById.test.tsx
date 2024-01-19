// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { it, expect, describe, vi } from "vitest";
// import "@testing-library/jest-dom";

// import {
//   Market,
//   MaxInt,
//   Page,
//   SimplifiedTrack,
//   SpotifyApi,
// } from "@spotify/web-api-ts-sdk";
// import { useAlbumByIdGetTracks } from "@/hooks/useAlbumByIdGetTracks";
// import { pagedAlbumMock } from "@/mocks/mockedResponses";
// const buildSpotifySdkMock = () =>
//   ({
//     albums: {
//       tracks: async (
//         _albumId: string,
//         _market?: Market,
//         _limit?: MaxInt<50>,
//         _offset?: number
//       ): Promise<Page<SimplifiedTrack>> => {
//         console.log("### tracks");

//         return pagedAlbumMock as Page<SimplifiedTrack>;
//       },
//     },
//   } as SpotifyApi);

// describe("useAlbumById", async () => {
//   it("should throw a CustomError with the expected message and status code when called with an undefined id", () => {
//     vi.mock("react-router-dom", () => ({
//       useParams: () => ({
//         id: undefined,
//       }),
//     }));

//     expect(() =>
//       useAlbumByIdGetTracks({ sdk: buildSpotifySdkMock() })
//     ).toThrowError("No ID provided");
//     vi.clearAllMocks();
//     vi.resetAllMocks();
//   });
// });
