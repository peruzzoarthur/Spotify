import React from "react";
import Logo from "../Logo";
import placeholderImage from "@/styles/img/profilePlaceholder.jpg";

type ProfileHeaderProps = {
  image: string | undefined;
  name: string | undefined;
  followers: number | undefined;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  image,
  // followers,
}) => {
  return (
    <>
      <div className="flex flex-col pt-2 pb-2 bg-black bg-opacity-10">
        <Logo />
        <div className="flex flex-row">
          {!image ? (
            <img
              src={placeholderImage}
              alt={name}
              className="ml-4 rounded-full opacity-80 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 xl:w-56 xl:h-56"
            />
          ) : (
            <img
              src={image}
              alt={name}
              className="w-32 h-32 ml-4 rounded-full opacity-80 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-56 lg:h-56 xl:w-56 xl:h-56"
            />
          )}

          <h1 className="mt-16 ml-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-6xl sm:text-4xl ">
            {name}
          </h1>
          <div>
            {/* <div className="mt-2 ml-4 text-2xl text-white">{followers}</div> */}
          </div>
        </div>
        <div className="flex items-start justify-end flex-1"> </div>
      </div>
    </>
  );
};
