import React from "react";
import Logo from "../Logo";

export const RecommendationHeader: React.FC = () => {
  return (
    <div className="flex flex-col bg-black bg-opacity-30 h-320">
      <Logo />
      <div className="flex flex-col items-start justify-end h-full mb-24 ml-4">
        <h1 className="ml-3 text-6xl text-white">Get Recommendations Tracks</h1>
        <div>
          <div className="mt-2 ml-4 text-2xl text-white">
            Discover new music
          </div>
        </div>
      </div>
    </div>
  );
};
