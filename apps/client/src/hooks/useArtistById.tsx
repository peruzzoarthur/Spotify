import { TrackWithAudioFeatures } from "@/types";
import {
  Artist,
  Artists,
  Page,
  SimplifiedAlbum,
  SpotifyApi,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useArtistById = ({ sdk }: { sdk: SpotifyApi }) => {
  const [albums, setAlbums] = useState<SimplifiedAlbum[]>([]);

  const { id } = useParams<string>();
  if (!id) {
    throw new Error("No ID provided");
  }

  const updateAlbums = (newAlbums: SimplifiedAlbum[]) => {
    setAlbums((oldAlbums) => {
      if (oldAlbums) {
        return [...oldAlbums, ...newAlbums];
      } else {
        return [...newAlbums];
      }
    });
  };

  useEffect(() => {
    setAlbums([]);
  }, [id]);

  const { data: artistData, isFetching: isFetchingArtist } = useQuery<Artist>({
    queryKey: ["artist-by-id", id],
    queryFn: async () => {
      const fetchArtistData = await sdk.artists.get(id);
      return fetchArtistData;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: relatedArtistsData, isFetching: isFetchingRelatedArtists } =
    useQuery<Artists>({
      queryKey: ["related-artists-by-id", id],
      queryFn: async () => {
        const fetchRelatedArtistsData = await sdk.artists.relatedArtists(id);
        return fetchRelatedArtistsData;
      },
      enabled: !!sdk,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const { data: artistTopTracks, isFetching: isFetchingTopTracks } = useQuery<
    TrackWithAudioFeatures[]
  >({
    queryKey: ["artist-top-tracks-by-id", id],
    queryFn: async () => {
      const fetchTopTracksData = await sdk.artists.topTracks(id, "BR");
      const ids = fetchTopTracksData.tracks.map((t) => t.id);
      const fetchAudioFeatures = await sdk.tracks.audioFeatures(ids);

      const tracksWithAudioFeatures: TrackWithAudioFeatures[] =
        fetchTopTracksData.tracks.map((t) => {
          const correspondingAudioFeature = fetchAudioFeatures.find(
            (audioFeature) => audioFeature.id === t.id
          );
          return {
            ...(t as Track),
            audio_features: correspondingAudioFeature,
          };
        });

      return tracksWithAudioFeatures;
    },
    enabled: !!sdk,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: artistAlbums,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching: isFetchingAlbums,
  } = useInfiniteQuery<Page<SimplifiedAlbum>>({
    queryKey: ["artist-albums", id],
    queryFn: async ({ pageParam = 0 }) => {
      const fetchArtistAlbums = await sdk.artists.albums(
        id,
        undefined,
        undefined,
        5,
        Number(pageParam)
      );

      updateAlbums(fetchArtistAlbums.items);

      return fetchArtistAlbums;
    },
    enabled: !!sdk,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next) {
        const url = new URL(lastPage.next);
        const pageParam = url.searchParams.get("offset");
        return pageParam;
      }
      return;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    artist: {
      artistData,
      isFetchingArtist,
    },
    relatedArtists: {
      relatedArtistsData,
      isFetchingRelatedArtists,
    },
    topTracks: {
      artistTopTracks,
      isFetchingTopTracks,
    },

    artistAlbums: {
      data: artistAlbums,
      error,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage,
      isFetchingAlbums,
      albums,
      setAlbums,
    },
  };
};
