import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export const GenresHeader: React.FC = () => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-col">
          <div className="w-3/4">
            <h1 className="mt-12 ml-6 text-6xl font-bold text-white">
              Genres and its artists
            </h1>
            <h3 className="ml-8 text-lg text-white "> a collection. </h3>
          </div>
          <div className="flex flex-row mt-2 ml-8 text-xs text-slate-100">
            <Link to={"/"}>
              <p>Profile</p>
            </Link>
            <p className="ml-2">/ Genres</p>
          </div>
        </div>
      </div>
    </>
  );
};
