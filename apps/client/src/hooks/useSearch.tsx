import {
  Album,
  Artist,
  ItemTypes,
  SpotifyApi,
  Track,
} from "@spotify/web-api-ts-sdk";
import { useQuery } from "@tanstack/react-query";

type useSearchProps = {
  searchInput: string | undefined;
  sdk: SpotifyApi;
  firstRender: boolean;
  setNewSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SearchingReturnedObject = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
export const useSearch = ({
  searchInput,
  sdk,
  firstRender,
  setNewSearch,
}: useSearchProps) => {
  // function filterTracksById(trackArray: Track[], idArray: string[]) {
  //   return trackArray.filter((track) => idArray.includes(track.id.toString()));
  // }
  const types: ItemTypes[] = ["artist", "album", "track"];
  const { data, isFetching } = useQuery<SearchingReturnedObject | undefined>({
    queryKey: ["search", searchInput, types, firstRender],
    queryFn: async () => {
      if (searchInput === undefined || firstRender === true) {
        return { albums: [], artists: [], tracks: [] };
      }
      const search = await sdk.search(searchInput, types, undefined, 5);

      if (!search.artists || !search.albums || !search.tracks) {
        throw new Error("Failed searching");
      }
      const artistIds = search.artists.items.map((a) => a.id);
      const artists = await sdk.artists.get(artistIds);

      const albumsIds = search.albums.items.map((ab) => ab.id);
      const albums = await sdk.albums.get(albumsIds);

      const tracksIds = search.tracks.items.map((t) => t.id);
      const tracks = await sdk.tracks.get(tracksIds);
      // const tracks = filterTracksById(fetchTracks, tracksIds);

      setNewSearch(false);

      return { artists, albums, tracks };
    },
    enabled: !!sdk,
  });

  return { data, isFetching };
};
