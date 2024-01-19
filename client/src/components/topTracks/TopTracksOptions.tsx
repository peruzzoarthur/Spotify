import { Track } from "@spotify/web-api-ts-sdk";
import { SelectOrderByTimeRange } from "../SelectOrderByTimeRange";
import { TimeRange } from "@/hooks/useTopArtists";

type TopTracksOptionsProps = {
  setActiveRange: React.Dispatch<
    React.SetStateAction<"short_term" | "medium_term" | "long_term">
  >;
  setTopTracks: React.Dispatch<React.SetStateAction<Track[]>>;
  activeRange: TimeRange["value"];
};
function TopTracksOptions({
  setActiveRange,
  activeRange,
  setTopTracks,
}: TopTracksOptionsProps) {
  const handleActiveRange = (timeRange: TimeRange["value"]) => {
    setTopTracks([]);
    setActiveRange(timeRange);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-20 bg-black bg-opacity-10">
      <SelectOrderByTimeRange
        handleOrderByTimeRange={handleActiveRange}
        activeRange={activeRange}
      />
    </div>
  );
}

export default TopTracksOptions;
