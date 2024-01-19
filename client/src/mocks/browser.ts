import { setupWorker } from "msw/browser";
import { tracksHandlers } from "./handlers/tracksHandlers";
import { playlistHandlers } from "./handlers/playlistHandlers";
import { albumHandlers } from "./handlers/albumHandlers";
import { searchHandlers } from "./handlers/searchHandlers";
import { likeSongsHandlers } from "./handlers/likedSongsHandlers";
// import { tokenHandler } from "./handlers/tokenHandler";
import { meHandlers } from "./handlers/meHandlers";
import { audioFeaturesHandlers } from "./handlers/audioFeaturesHandlers";
import { recHandlers } from "./handlers/recHandlers";

export const worker = setupWorker(
  ...playlistHandlers,
  // ...tokenHandler,
  ...albumHandlers,
  ...searchHandlers,
  ...likeSongsHandlers,
  ...meHandlers,
  ...tracksHandlers,
  ...audioFeaturesHandlers,
  ...recHandlers
);
