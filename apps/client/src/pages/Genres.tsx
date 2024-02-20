import { ArtistCardWithAddButtonImageUrl } from "@/components/ArtistCard";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetGenres } from "@/hooks/useGetGenres";
// import { useSdk } from "@/hooks/useSdk";
// import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContainerDark } from "@/components/Container";

export const Genres = () => {
  const { allGenresData } = useGetGenres();

  return (
    <>
      <AnalogBackground>
        <ContainerDark>
          {allGenresData?.map((g, index) => (
            <Carousel
              opts={{
                align: "center",
              }}
              className="w-3/4 sm:w-96 md:w-96 lg:w-640 xl:w-960 2xl:w-1280"
            >
              <p className="text-white" key={index}>
                {g.name}
              </p>

              <CarouselContent className="">
                {g.artists?.map((a, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-80 sm:basis-72 md:basis-72 lg:basis-72 xl:basis-72 2xl:basis-72"
                  >
                    <ArtistCardWithAddButtonImageUrl
                      imageUrl={a.imageUrl}
                      name={a.name}
                      id={a.spotifyId}
                      key={index}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ))}
        </ContainerDark>
      </AnalogBackground>
    </>
  );
};
