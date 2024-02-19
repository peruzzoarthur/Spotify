import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  genres: z.array(z.string()),
  timestamp: z.string(),
  createdAt: z.string(),
  discoveredBy: z.string(),
});

export type Artist = z.infer<typeof ArtistSchema>;

export const contract = c.router(
  {
    artists: {
      createArtist: {
        method: "POST",
        path: "/artists",
        body: ArtistSchema.omit({ id: true, createdAt: true, timestamp: true }),
        responses: {
          201: ArtistSchema,
        },
      },
      getAllArtists: {
        method: "GET",
        path: "/artists",
        query: z.object({
          total: z.number().optional(),
        }),
        responses: {
          200: ArtistSchema.array(),
        },
      },
      getOneArtist: {
        method: "GET",
        path: "/artists:id",
        pathParams: z.object({
          id: z.coerce.string(),
        }),
        responses: {
          200: ArtistSchema.array(),
          404: z.object({
            message: z.string(), // check this error type...
          }),
        },
      },

      //   update: {
      //     method: "PATCH",
      //     path: "/artists:id",
      //     pathParams: z.object({
      //       id: z.coerce.string(),
      //     }),
      //     body: ArtistSchema.omit({
      //       id: true,
      //       createdAt: true,
      //       timestamp: true,
      //     }).partial(),
      //     responses: {
      //       200: ArtistSchema,
      //       404: z.object({
      //         message: z.string(), // check this error type...
      //       }),
      //     },
      //   },

      //   remove: {
      //     method: "PATCH",
      //     path: "/artists:id",
      //     pathParams: z.object({
      //       id: z.coerce.string(),
      //     }),
      //     body: z.any(),
      //     responses: {
      //       200: ArtistSchema,
      //       404: z.object({
      //         message: z.string(), // check this error type...
      //       }),
      //     },
      //   },
      // },
      // genres: {}, // implement later
    },
  },
  { pathPrefix: "api", strictStatusCodes: true }
);
