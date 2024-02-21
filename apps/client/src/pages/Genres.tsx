// import { ArtistCardWithAddButtonImageUrl } from "@/components/ArtistCard";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { MyContextMenu } from "@/components/ContextMenu";
import { AnalogBackground } from "@/components/background/analogBackground";
import { useGetGenres } from "@/hooks/useGetGenres";
import { Container } from "@/components/Container";
import { useCreateProgress } from "@/hooks/useCreateProgress";
import { CreateProgress } from "@/components/Progress";
import { GenresHeader } from "@/components/genres/GenresHeader";
import { ArtistsCarousel } from "@/components/MyCarousel";

export const Genres = () => {
  const { isFetching, filteredGenresData } = useGetGenres();
  const { progress } = useCreateProgress({
    // initialProgress: 13,
    // finalProgress: 66,
    delay: 11,
  });

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
          <div>
            {filteredGenresData?.map((g, index) => (
              <ArtistsCarousel genre={g} key={index} />
            ))}
          </div>
        )}
      </AnalogBackground>
    </>
  );
};
