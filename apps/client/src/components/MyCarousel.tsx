import { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { MyContextMenu } from "./ContextMenu";
import { ArtistCardWithAddButtonImageUrl } from "./ArtistCard";
import { Genre } from "@/hooks/useGetGenres";
import { ContainerDark } from "./Container";

type MyCarouselProps = {
  children?: ReactNode;
  className?: string;
  genre?: Genre;
};

export const ArtistsCarousel: React.FC<MyCarouselProps> = ({ genre }) => {
  return (
    <ContainerDark className="bg-opacity-15 mt-0.5">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-3/4 pr-2 sm:w-96 md:w-96 lg:w-640 xl:w-960 2xl:w-1280"
      >
        <p className="mt-2 text-2xl text-white ">{genre?.name}</p>

        <CarouselContent className="">
          {genre?.artists?.map((a, index) => (
            <CarouselItem
              key={index}
              className="basis-80 sm:basis-72 md:basis-72 lg:basis-72 xl:basis-72 2xl:basis-72"
            >
              <MyContextMenu id={a.spotifyId} uri={a.spotifyUri}>
                <ArtistCardWithAddButtonImageUrl
                  imageUrl={a.imageUrl}
                  name={a.name}
                  id={a.spotifyId}
                  key={index + 1}
                />
              </MyContextMenu>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </ContainerDark>
  );
};
