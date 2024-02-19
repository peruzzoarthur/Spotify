"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.ArtistSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
exports.ArtistSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    genres: zod_1.z.array(zod_1.z.string()),
    timestamp: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    discoveredBy: zod_1.z.string(),
});
exports.contract = c.router({
    artists: {
        createArtist: {
            method: "POST",
            path: "/artists",
            body: exports.ArtistSchema.omit({ id: true, createdAt: true, timestamp: true }),
            responses: {
                201: exports.ArtistSchema,
            },
        },
        getAllArtists: {
            method: "GET",
            path: "/artists",
            query: zod_1.z.object({
                total: zod_1.z.number().optional(),
            }),
            responses: {
                200: exports.ArtistSchema.array(),
            },
        },
        getOneArtist: {
            method: "GET",
            path: "/artists:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.string(),
            }),
            responses: {
                200: exports.ArtistSchema.array(),
                404: zod_1.z.object({
                    message: zod_1.z.string(), // check this error type...
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
}, { pathPrefix: "api", strictStatusCodes: true });
