import React from "react";
import Logo from "../Logo";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { Link } from "react-router-dom";
import placeholderImage from "@/styles/img/profilePlaceholder.jpg";

type AlbumHeaderProps = {
  profile: UserProfile | undefined;
};

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({ profile }) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-row">
          {!profile?.images[1] ? (
            <img
              src={placeholderImage}
              alt={profile?.display_name}
              className="w-56 h-56 ml-4 rounded-full opacity-80"
            />
          ) : (
            <img
              src={profile.images[1]?.url}
              alt={profile.display_name}
              className="w-56 h-56 ml-4 rounded-full"
            />
          )}
          <div className="flex flex-col">
            <h1 className="mt-24 ml-6 text-6xl font-bold text-white">Albums</h1>
            <h3 className="ml-20 text-lg text-white"> your saved albums</h3>
            <div className="flex flex-row ml-5 text-xs text-slate-100">
              <Link to={"/"}>
                <p>Profile</p>
              </Link>
              <p className="ml-2">/ Albums</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
