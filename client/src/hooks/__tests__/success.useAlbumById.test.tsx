// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { it, expect, describe, vi } from "vitest";
// import { renderHook, waitFor } from "@testing-library/react";
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
// import { createWrapper } from "@/mocks/utils";

// const buildSpotifySdkMock = () =>
//   ({
//     albums: {
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

// vi.mock("react-router-dom", () => ({
//   useParams: () => ({
//     id: "6Sts4Yh7KsDFwq2yTWrGGV",
//   }),
// }));
// describe("useAlbumById Success Cases", () => {
//   it("calls fetch function for album tracks with the id provided", async () => {
//     const wrapper = createWrapper();
//     const sdkMock = buildSpotifySdkMock();
//     vi.clearAllMocks();
//     vi.resetAllMocks();
//     const spy = vi.spyOn(sdkMock.albums, "tracks");

//     renderHook(() => useAlbumByIdGetTracks({ sdk: sdkMock }), {
//       wrapper: wrapper,
//     });

//     expect(spy).toHaveBeenCalledWith(
//       "6Sts4Yh7KsDFwq2yTWrGGV",
//       undefined,
//       50,
//       0
//     );
//   });

//   it("initializes sdk for testing and make an album call using the hook", async () => {
//     const wrapper = createWrapper();
//     const sdkMock = buildSpotifySdkMock();

//     const { result } = renderHook(
//       () => useAlbumByIdGetTracks({ sdk: sdkMock }),
//       {
//         wrapper,
//       }
//     );
//     await waitFor(() =>
//       expect(result.current.pagedSimplifiedTracks).toBeDefined()
//     );
//     expect(result.current.pagedSimplifiedTracks?.pages[0].items).toEqual(
//       pagedAlbumMock.items
//     );
//     expect(result.current.error).toBeNull();
//     expect(result.current.fetchNextPage).toBeInstanceOf(Function);
//     expect(result.current.isFetchingNextPage).toBe(false);
//     expect(result.current.hasNextPage).toBe(false);
//     expect(result.current.isFetching).toBe(false);
//     expect(result.current.isSuccess).toBe(true);
//   });
// });
