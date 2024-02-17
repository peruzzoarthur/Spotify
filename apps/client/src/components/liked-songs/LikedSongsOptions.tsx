import { TrackWithAudioFeatures } from "@/types";
import React from "react";

interface LikedSongsOptionsProps {
  handlePageSizeChange: (size: number) => void;
  tracks: TrackWithAudioFeatures[];
}

export const LikedSongsOptions: React.FC<LikedSongsOptionsProps> = ({
  handlePageSizeChange,
  tracks,
}) => {
  return (
    <div>
      <label className="mr-1 text-xl text-black">Select Page Size: </label>
      <select
        className="w-12 h-7 bg-slate-900 bg-opacity-60 text-slate-100 text-end rounded-2xl"
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
        <option value={tracks.length}>All Tracks</option>
      </select>
    </div>
  );
};
