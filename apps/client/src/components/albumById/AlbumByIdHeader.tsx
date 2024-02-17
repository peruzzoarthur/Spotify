import React from "react";
import Logo from "../Logo";
import { Album } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import { formatTimeHoursMinutesSeconds } from "@/utils/format";

type AlbumByIdHeaderProps = {
  albumData: Album;
  artistPicture: string | undefined;
};

export const AlbumByIdHeader: React.FC<AlbumByIdHeaderProps> = ({
  albumData,
  artistPicture,
}) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-30">
        <Logo />
        <div className="flex flex-row">
          <Link to={albumData.uri}>
            <img
              src={albumData.images[0].url}
              className="ml-4 rounded-sm w-72 h-72"
            />
          </Link>
          <div className="flex flex-col items-start justify-center h-full mt-16 mb-2 ml-6">
            <h1 className="mt-16 ml-3 text-6xl text-white">{albumData.name}</h1>
            <div>
              <div className="flex flex-col mt-2 ml-4 text-lg text-white"></div>
            </div>

            <div className="flex flex-row mt-2 ml-4 text-xs text-white">
              {artistPicture && (
                <img
                  src={artistPicture}
                  className="w-6 h-6 mr-1 rounded-full"
                />
              )}
              <div className="flex flex-row mt-1 mr-2">
                {albumData.artists.map((a, index) => (
                  <Link
                    className="flex flex-row mr-1"
                    key={index}
                    to={`/artist/${a.id}`}
                  >
                    <p> {a.name} • </p>
                  </Link>
                ))}
                {albumData.release_date.split("-")[0]} •{" "}
                {albumData.total_tracks} tracks,{" "}
                {formatTimeHoursMinutesSeconds(
                  albumData.tracks.items
                    .map((t) => t.duration_ms)
                    .reduce((acc, cv) => acc + cv, 0)
                )}
              </div>
            </div>
            <div className="flex flex-row mt-4 ml-5 text-xs text-slate-100">
              <Link to={"/"}>
                <p>Profile</p>
              </Link>
              <Link to={"/albums/"}>
                <p className="ml-2">/ Albums</p>
              </Link>
              <p className="ml-2">/ {albumData.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
