import { AudioFeaturesWithListOrder, TrackWithAudioFeatures } from "@/types";
import { Page, SavedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

type LikedSongsQueryFnProps = {
  pageParam: string | null | unknown;
};

type useLikedSongsProps = {
  sdk: SpotifyApi;
};

export const useLikedSongs = ({ sdk }: useLikedSongsProps) => {
  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [likedSongsData, setLikedSongsData] = useState<
    TrackWithAudioFeatures[] | undefined
  >();
  const [artistIds, setArtistIds] = useState<string[]>([]);

  // update function for keeping all fetched data in the same array

  const updateTracks = (newTracks: TrackWithAudioFeatures[]) => {
    setLikedSongsData((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
      }
    });
  };

  // fetching

  const {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    data,
    error,
    isFetching,
  } = useInfiniteQuery<Page<SavedTrack>>({
    queryKey: ["liked-songs"],
    queryFn: async ({ pageParam = "0" }: LikedSongsQueryFnProps) => {
      const fetchLikedSongs = await sdk.currentUser.tracks.savedTracks(
        50,
        Number(pageParam)
      );

      const ids = fetchLikedSongs.items.map((t) => t.track.id);

      setArtistIds(
        fetchLikedSongs.items
          .map((t) => t.track.artists)
          .flatMap((a) => a)
          .map((a) => a.id)
      );

      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);
      // TODO Here I might have an issue... If the track doesn't have an audio feature it will break the code probably :(
      const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
        fetchLikedSongs.items.map((item) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) =>
              audioFeature !== null && audioFeature.id === item.track.id
          );
          return {
            ...item.track,
            audio_features: correspondingAudioFeature,
          };
        });

      updateTracks(tracksWithAudioFeatures);

      return fetchLikedSongs;
    },

    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

    initialPageParam: 0,
    // im at 2450 for loading db

    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
      return;
    },
  });

  // sorting liked songs

  const sortedTracks = useMemo<TrackWithAudioFeatures[]>(() => {
    if (!likedSongsData) {
      return [];
    }

    return [...likedSongsData].sort(
      (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
        const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
        const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

        if (!aFeatures || !bFeatures) {
          return 0;
        }

        return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
      }
    );
  }, [sortValue, likedSongsData]);

  return {
    query: {
      data,
      error,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
      isFetching,
    },
    sortedTracks,
    setSortValue,
    likedSongsData,
    artistIds,
  };
};
