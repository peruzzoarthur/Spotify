import React from "react";
import { TimeRange } from "../pages/TopArtists";

type SelectOrderByTimeRangeProps = {
  handleOrderByTimeRange: (timeRange: TimeRange["value"]) => void;
  activeRange: TimeRange["value"];
};

export const SelectOrderByTimeRange: React.FC<SelectOrderByTimeRangeProps> = ({
  handleOrderByTimeRange,
  activeRange,
}: SelectOrderByTimeRangeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as TimeRange["value"];
    handleOrderByTimeRange(selectedValue);
  };
  return (
    <div>
      <label className="text-xl text-white ">Select Time Range: </label>
      <select
        className="w-auto text-center text-white bg-black bg-opacity-20 h-7 rounded-xl"
        onChange={handleChange}
        value={activeRange}
      >
        <option value="short_term">4 Weeks</option>
        <option value="medium_term">6 Months</option>
        <option value="long_term">Lifetime</option>
      </select>
    </div>
  );
};
