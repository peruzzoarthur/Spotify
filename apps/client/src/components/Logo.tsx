import logo from "../styles/img/spotify-icons-logos/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/utils/logout";

function Logo() {
  return (
    <div className="flex flex-col items-center justify-end pt-2 mr-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <img
            className="transition-all duration-700 rounded-full w-14 h-14 lg:w-20 lg:h-20 min-h-14 min-w-14 hover:scale-125"
            src={logo}
            alt="Spotify Logo"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-white bg-black w-300 bg-opacity-60">
          <DropdownMenuSeparator />
          <Link to={`/search`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black focus:bg-black focus:bg-opacity-60 hover:bg-opacity-60">
              Search
            </DropdownMenuItem>
          </Link>
          <Link to={`/`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black focus:bg-black focus:bg-opacity-60 hover:bg-opacity-60">
              Profile
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-artists`}>
            <DropdownMenuItem className="text-lg cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              {" "}
              Artists
            </DropdownMenuItem>
          </Link>
          <Link to={`/albums`}>
            <DropdownMenuItem className="text-lg cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              {" "}
              Albums
            </DropdownMenuItem>
          </Link>
          <Link to={`/top-tracks`}>
            <DropdownMenuItem className="text-xl cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              {" "}
              Tracks
            </DropdownMenuItem>
          </Link>

          <Link to={`/playlists`}>
            <DropdownMenuItem className="text-xl cursor-pointer font-extralight hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              {" "}
              Playlists
            </DropdownMenuItem>
          </Link>
          <Link to={`/liked-songs`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              Liked Songs
            </DropdownMenuItem>
          </Link>
          <Link to={`/recommendation`}>
            <DropdownMenuItem className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60">
              Recommendations List
            </DropdownMenuItem>
          </Link>
          <Link to={`/`}>
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-xl cursor-pointer hover:bg-black hover:bg-opacity-60 focus:bg-black focus:bg-opacity-60"
            >
              Logout
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Logo;
