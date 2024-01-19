import { AudioFeaturesWithListOrder, TrackWithAudioFeatures } from "@/types";
import {
  Page,
  Playlist,
  PlaylistedTrack,
  SpotifyApi,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type usePlaylistByIdProps = {
  sdk: SpotifyApi;
};
type PlaylistByIdQueryFnProps = {
  pageParam: string | null | unknown;
};

export const usePlaylistById = ({ sdk }: usePlaylistByIdProps) => {
  const { id } = useParams<string>();

  const [sortValue, setSortValue] =
    useState<keyof AudioFeaturesWithListOrder>("default_list_order");
  const [playlistTracksData, setPlaylistTracksData] = useState<
    TrackWithAudioFeatures[] | undefined
  >();
  // const [playlistData, setPlaylistData] = useState<Playlist>();

  const updateTracks = (newTracks: TrackWithAudioFeatures[]) => {
    setPlaylistTracksData((oldTracks) => {
      if (oldTracks) {
        return [...oldTracks, ...newTracks];
      } else {
        return [...newTracks];
      }
    });
  };

  const { data: playlistInfo } = useQuery<Playlist>({
    queryKey: ["playlistInfo", { id }],
    queryFn: async () => {
      if (!id) {
        throw new Error("No ID provided");
      }
      // fetch data about the playlist, in order to be displayed as info [header]
      const fetchPlaylistData = await sdk.playlists.getPlaylist(id);
      return fetchPlaylistData;
      // setPlaylistTracksData(fetchPlaylistData)
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<Page<PlaylistedTrack>>({
    queryKey: ["playlistTracks", { id }],

    queryFn: async ({ pageParam = "0" }: PlaylistByIdQueryFnProps) => {
      if (!id) {
        throw new Error("No ID provided");
      } // todo: adjust error with a pattern for all components

      // fetch the playlisted tracks
      const playlist = await sdk.playlists.getPlaylistItems(
        id as string,
        undefined,
        undefined,
        50,
        Number(pageParam)
      );

      // map ids for further fetching of tracks audio features
      const ids = playlist.items.map((t) => t.track.id);
      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);

      // returning new object with proper structure, tracks + audio_features
      const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
        playlist.items.map((item) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) => audioFeature.id === item.track.id
          );
          return {
            ...(item.track as Track),
            audio_features: correspondingAudioFeature,
          };
        });

      updateTracks(tracksWithAudioFeatures);

      return playlist;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
      return;
    },
  });

  // sorting tracks by audio feature
  const sortedTracks = useMemo<TrackWithAudioFeatures[]>(() => {
    if (!playlistTracksData) {
      return [];
    }

    return [...playlistTracksData].sort(
      (a: TrackWithAudioFeatures, b: TrackWithAudioFeatures) => {
        const aFeatures = a["audio_features"] as AudioFeaturesWithListOrder;
        const bFeatures = b["audio_features"] as AudioFeaturesWithListOrder;

        if (!aFeatures || !bFeatures) {
          return 0;
        }

        return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
      }
    );
  }, [sortValue, playlistTracksData]);

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
    // playlistData,
    playlistInfo,
    setSortValue,
    playlistTracksData,
  };
};
