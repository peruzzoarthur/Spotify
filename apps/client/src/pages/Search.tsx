"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AnalogBackground } from "@/components/background/analogBackground";
import { Container } from "@/components/Container";
import { useSdk } from "@/hooks/useSdk";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import Logo from "@/components/Logo";
import { SearchArtistsSection } from "@/components/search/SearchArtistsSection";
import { SearchAlbumsSection } from "@/components/search/SearchAlbumsSection";
import { SearchTracksSection } from "@/components/search/SearchTracksSection";
import { CreateProgress } from "@/components/Progress";
import { useCreateProgress } from "@/hooks/useCreateProgress";

const FormSchema = z.object({
  Search: z.string(),
});

export function Search() {
  const sdk = useSdk();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [newSearch, setNewSearch] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>("not-a-valid-string");

  // FORM CFG

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Search: "",
    },
  });

  const { progress } = useCreateProgress({
    // initialProgress: 13,
    // finalProgress: 66,
    delay: 1000,
    conditional: newSearch,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setSearchInput(data.Search);
    setFirstRender(false);
    setNewSearch(true);
  }

  const { data, isFetching } = useSearch({
    searchInput,
    sdk,
    firstRender,
    setNewSearch,
  });

  return (
    <>
      <AnalogBackground>
        <Logo />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Container className="flex-row mb-2 bg-white bg-opacity-0">
              <FormField
                control={form.control}
                name="Search"
                render={({ field }) => (
                  <FormItem className="relative flex flex-row h-10 mt-4 bg-black rounded-lg rounded-r-none w-640 bg-opacity-70">
                    <FormControl>
                      <Input
                        className="rounded-r-none"
                        placeholder="Search here for albums, artists, playlists and tracks"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-10 mt-4 bg-black rounded-l-none bg-opacity-60"
              >
                Submit
              </Button>
            </Container>
          </form>
        </Form>
        {isFetching && !firstRender && newSearch ? (
          <>
            <Container className="flex items-center justify-center bg-white bg-opacity-0 h-200">
              {CreateProgress({ progress })}
            </Container>
          </>
        ) : (
          <>
            <Container className="bg-black bg-opacity-30">
              {data && !firstRender && (
                <SearchArtistsSection artists={data.artists} />
              )}
            </Container>

            <Container className="bg-black bg-opacity-40">
              {data && !firstRender && (
                <SearchAlbumsSection albums={data.albums} />
              )}
            </Container>

            <Container className="bg-black bg-opacity-50">
              {data && !firstRender && (
                <SearchTracksSection tracks={data.tracks} />
              )}
            </Container>
          </>
        )}
      </AnalogBackground>
    </>
  );
}
