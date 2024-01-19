import { Playlist } from "@spotify/web-api-ts-sdk";
import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { formatTimeHoursMinutesSeconds } from "@/utils/format";
import placeholderImage from "@/styles/img/profilePlaceholder.jpg";

interface PlaylistByIdHeaderProps {
  playlistData: Playlist;
  profilePicture: string | undefined | null;
}

export const PlaylistByIdHeader: React.FC<PlaylistByIdHeaderProps> = ({
  playlistData,
  profilePicture,
}) => {
  return (
    <div className="flex flex-col bg-black bg-opacity-30 ">
      <Logo />

      <div className="flex flex-row">
        <img
          src={playlistData.images[0].url}
          className="ml-4 rounded-sm w-72 h-72"
        />
        <div className="flex flex-col items-start justify-center h-full mt-20 ml-6">
          <h1 className="mt-16 ml-3 text-6xl text-white">
            {playlistData.name}
          </h1>
          <div>
            <div className="mt-2 ml-4 text-sm text-white">
              {playlistData.description}
            </div>

            <div className="flex flex-row mt-2 ml-4 text-xs text-white">
              {!profilePicture ? (
                <img
                  src={placeholderImage}
                  className="w-6 h-6 mr-1 rounded-full"
                />
              ) : (
                <img
                  src={profilePicture}
                  className="w-6 h-6 mr-1 rounded-full"
                />
              )}
              <p className="mt-1">
                {playlistData.owner.id} • {playlistData.tracks.total} tracks,{" "}
                {formatTimeHoursMinutesSeconds(
                  playlistData.tracks.items
                    .map((t) => t.track.duration_ms)
                    .reduce((acc, cv) => acc + cv, 0)
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-row mt-4 mb-4 ml-5 text-xs text-slate-100">
            <Link to={"/profile"}>
              <p className="mr-2">Profile</p>
            </Link>

            <Link to={"/playlists"}>
              <p>/ Playlists</p>
            </Link>
            <p className="ml-2">/ {playlistData.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
