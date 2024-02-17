import React from "react";
import { Track } from "@spotify/web-api-ts-sdk";
import { TrackCard } from "../TrackCard";
import { ShowAllButton } from "../ShowAllButton";

type ProfileTopTracksSectionProps = {
  topTracks: Track[] | undefined;
};

export const ProfileTopTracksSection: React.FC<
  ProfileTopTracksSectionProps
> = ({ topTracks }: ProfileTopTracksSectionProps) => {
  return (
    <>
      <div className="flex flex-row items-start justify-between mt-6">
        <h2 className="justify-start ml-6 text-4xl text-left text-white lg:ml-12 sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl">
          Top Tracks
        </h2>
        <ShowAllButton
          className="mt-1 mr-6 bg-black lg:mt-4 lg:mr-12 hover:bg-opacity-60"
          url="/top-tracks"
        />
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 mt-8 ml-5 mr-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {topTracks?.map((track, index) => (
          <div key={index} className="mb-4 mr-4">
            <TrackCard
              artists={track.artists.map((a) => a.name).join(", ")}
              image={track.album.images}
              name={track.name}
              duration={track.duration_ms}
              popularity={track.popularity}
            />
          </div>
        ))}
      </div>
    </>
  );
};
