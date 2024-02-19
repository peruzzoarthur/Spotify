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
          {allGenresData?.map((g) => (
            <Carousel
              opts={{
                align: "center",
              }}
              className="w-1/2 max-w-sm"
            >
              <p className="text-white">{g.name}</p>

              <CarouselContent>
                {g.artists?.map((a, index) => (
                  <CarouselItem key={index} className="md:basis-96 lg:basis-96">
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
