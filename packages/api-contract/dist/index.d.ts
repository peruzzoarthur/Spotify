import { z } from "zod";
export declare const ArtistSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    genres: z.ZodArray<z.ZodString, "many">;
    timestamp: z.ZodString;
    createdAt: z.ZodString;
    discoveredBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    genres: string[];
    timestamp: string;
    createdAt: string;
    discoveredBy: string;
}, {
    id: string;
    name: string;
    genres: string[];
    timestamp: string;
    createdAt: string;
    discoveredBy: string;
}>;
export type Artist = z.infer<typeof ArtistSchema>;
export declare const contract: {
    artists: {
        createArtist: {
            responses: {
                201: z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    genres: z.ZodArray<z.ZodString, "many">;
                    timestamp: z.ZodString;
                    createdAt: z.ZodString;
                    discoveredBy: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }>;
            };
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodString;
                name: z.ZodString;
                genres: z.ZodArray<z.ZodString, "many">;
                timestamp: z.ZodString;
                createdAt: z.ZodString;
                discoveredBy: z.ZodString;
            }, "id" | "timestamp" | "createdAt">, "strip", z.ZodTypeAny, {
                name: string;
                genres: string[];
                discoveredBy: string;
            }, {
                name: string;
                genres: string[];
                discoveredBy: string;
            }>;
            path: "api/artists";
            strictStatusCodes: true;
        };
        getAllArtists: {
            query: z.ZodObject<{
                total: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                total?: number | undefined;
            }, {
                total?: number | undefined;
            }>;
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    genres: z.ZodArray<z.ZodString, "many">;
                    timestamp: z.ZodString;
                    createdAt: z.ZodString;
                    discoveredBy: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }>, "many">;
            };
            method: "GET";
            path: "api/artists";
            strictStatusCodes: true;
        };
        getOneArtist: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    genres: z.ZodArray<z.ZodString, "many">;
                    timestamp: z.ZodString;
                    createdAt: z.ZodString;
                    discoveredBy: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }, {
                    id: string;
                    name: string;
                    genres: string[];
                    timestamp: string;
                    createdAt: string;
                    discoveredBy: string;
                }>, "many">;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            method: "GET";
            path: "api/artists:id";
            strictStatusCodes: true;
        };
    };
};
