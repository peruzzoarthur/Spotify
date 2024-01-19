// import { MaxInt, Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
// import React from "react";

// interface PlaylistOptionsProps {
//   setPageSize: React.Dispatch<React.SetStateAction<MaxInt<50>>>;
//   playlistData: Page<SimplifiedPlaylist> | undefined;
// }

// export const PlaylistsOptions:React.FC<PlaylistOptionsProps>  = ({ setPageSize, playlistData }) => {
//   const handlePageSizeChange = (size: MaxInt<50>) => {
//     setPageSize(size);
//   };
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-20 bg-purple-900 bg-opacity-20">
//       <PlaylistsSelectPageSize
//         handlePageSizeChange={handlePageSizeChange}
//         playlistData={playlistData}
//       />
//     </div>
//   );
// }
