import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type ContextMenuProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  uri?: string;
};

export const MyContextMenu: React.FC<ContextMenuProps> = ({
  children,
  id,
  uri,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex ">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 text-white bg-black bg-opacity-30">
        <Link to={`/artist/${id}`}>
          <ContextMenuItem
            className=" hover:bg-white hover:bg-opacity-10"
            inset
            style={{ cursor: "pointer" }}
          >
            Go to artist page
          </ContextMenuItem>
        </Link>
        <Link to={`${uri}`}>
          <ContextMenuItem
            className=" hover:bg-white hover:bg-opacity-10"
            inset
            style={{ cursor: "pointer" }}
          >
            Open with Spotify App
          </ContextMenuItem>
        </Link>
        <Link to={`https://open.spotify.com/artist/${id}`}>
          <ContextMenuItem
            className=" hover:bg-white hover:bg-opacity-10"
            inset
            style={{ cursor: "pointer" }}
          >
            Open on Spotify Web
          </ContextMenuItem>
        </Link>
      </ContextMenuContent>
    </ContextMenu>
  );
};
