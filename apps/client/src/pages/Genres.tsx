import { ArtistCardWithAddButtonImageUrl } from "@/components/ArtistCard";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetGenres } from "@/hooks/useGetGenres";
import { useSdk } from "@/hooks/useSdk";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Genres = () => {
  const sdk: SpotifyApi = useSdk();

  const { allGenresData } = useGetGenres({ sdk });

  return (
    <>
      <AnalogBackground>
        <div className="w-9/12">
          {allGenresData?.map((g, index) => (
            <div key={index}>
              <p className="text-white">{g.name}</p>

              <Carousel
                opts={{
                  align: "center",
                }}
                className="w-full max-w-sm"
              >
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      {g.artists?.map((a) => (
                        <ArtistCardWithAddButtonImageUrl
                          imageUrl={a.imageUrl}
                          name={a.name}
                          id={a.spotifyId}
                        />
                      ))}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ))}
        </div>
      </AnalogBackground>
    </>
  );
};
