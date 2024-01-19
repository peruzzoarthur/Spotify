import {
  Artist,
  Copyright,
  ExternalIds,
  ExternalUrls,
  Image,
  Page,
  Restrictions,
  SimplifiedArtist,
  SimplifiedTrack,
} from "@spotify/web-api-ts-sdk";
import { Track } from "@spotify/web-api-ts-sdk";

//  Props

export type AlbumProps = {
  artists: Artist[] | SimplifiedArtist[];
  tracks?: Page<SimplifiedTrack>;
  album_type?: string;
  available_markets?: string[];
  copyrights?: Copyright[];
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls;
  genres?: string[];
  href?: string;
  id: string;
  images: Image[];
  label?: string;
  name: string;
  popularity?: number;
  release_date?: string;
  release_date_precision?: string;
  restrictions?: Restrictions;
  total_tracks?: number;
  type?: string;
  uri?: string;
};

export type TrackProps = {
  image: Image[];
  name: string;
  duration?: number;
  order?: number;
  artists: string;
  id?: string;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleClick?: () => void;
  index?: number;
  uri?: string;
  audio_features?: AudioFeatures;
  popularity?: number;
};

export type SimplifiedTrackProps = {
  image: Image[];
  name: string;
  duration: number;
  order?: number;
  artists: string;
  id?: string;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleClick?: () => void;
  index?: number;
  uri?: string;
};

export type ArtistProps = {
  image: Image[];
  name: string;
  order?: number;
  artists?: string;
  id: string;
  handleAddToCart?: () => void;
  handleRemoveFromCart?: () => void;
  handleClick?: () => void;
  index?: number;
  uri?: string;
  genres: string;
};

export type PlaylistProps = {
  image: Image[];
  name: string;
  totalTracks: number | undefined;
  id: string;
};

export interface CustomError extends Error {
  response?: {
    status: number;
  };
}

export type valenceParams = {
  min_valence: number;
  target_valence: number;
  max_valence: number;
};

export type RecommendationSeed = {
  id: string;
  href: string;
  type: string;
  initialPoolSize: number;
  afterFilteringSize: number;
  afterRelinkingSize: number;
};

export type RecommendationsRequestRequiredArguments = {
  seed_artists?: string[];
  seed_genres?: string[];
  seed_tracks?: string[];
};
export type RecommendationsRequest = RecommendationsRequestRequiredArguments & {
  limit?: number;
  market?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
};

export type TrackWithAudioFeatures = Track & {
  audio_features?: AudioFeatures;
};

export type NewTrackWithAudioFeatures = {
  track: Track[];
  audioFeatures: AudioFeatures[];
};

export type RecommendationsResponse = {
  seeds: RecommendationSeed[];
  tracks: TrackWithAudioFeatures[];
};

export type AudioFeatures = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};

export type AudioFeaturesWithListOrder = AudioFeatures & {
  default_list_order?: string;
};
