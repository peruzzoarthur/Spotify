import { ArtistCardWithAddButtonImageUrl } from "@/components/ArtistCard";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetGenres } from "@/hooks/useGetGenres";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container, ContainerDark } from "@/components/Container";
import { useCreateProgress } from "@/hooks/useCreateProgress";
import { CreateProgress } from "@/components/Progress";
import { GenresHeader } from "@/components/genres/GenresHeader";
import { MyContextMenu } from "@/components/ContextMenu";

export const Genres = () => {
  const { progress } = useCreateProgress({ delay: 800 });
  const { isFetching, filteredGenresData } = useGetGenres();

  console.log(filteredGenresData);
  return (
    <>
      <AnalogBackground>
        <GenresHeader />
        {isFetching && !filteredGenresData && (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        )}

        {filteredGenresData && (
          <ContainerDark className=" bg-opacity-15">
            {filteredGenresData?.map((g, index) => (
              <Container className="w-full mb-0.5 ml-1 mr-1 bg-black">
                <Carousel
                  opts={{
                    align: "center",
                  }}
                  className="w-3/4 sm:w-96 md:w-96 lg:w-640 xl:w-960 2xl:w-1280"
                  key={index}
                >
                  <p className="text-xl text-white" key={index}>
                    {g.name}
                  </p>

                  <CarouselContent className="">
                    {g.artists?.map((a, index) => (
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
              </Container>
            ))}
          </ContainerDark>
        )}
      </AnalogBackground>
    </>
  );
};
