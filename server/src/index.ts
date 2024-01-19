// src/local.js
import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import { artistsByGenreSchema, redis } from "./lib/redis";
import { createClient } from "redis";
import { Repository, EntityId } from "redis-om";
var cors = require("cors");

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

// create list with all genres

app.post("/listGenres", async (req: Request, res: Response) => {
  try {
    const { genres }: { genres: string[] } = await req.body;
    redis.on("error", (err) => console.log("Redis Client Error", err));
    await redis.connect();
    const genreList = await redis.lPush("genres-list", genres);
    console.log(genreList);
    await redis.quit();

    res.status(200).json({ message: "Added genre to list" });
  } catch (error) {
    console.error("TeSTinG ErroRs Are FinE??", error);
    res.status(500).json({ error: "Another error" });
  }
});

// app.post("/saveArtistsByGenre", async (req: Request, res: Response) => {
//   try {
//     redis.on("error", (err) => console.log("Redis Client Error", err));
//     await redis.connect();

//     const { genres }: { genres: string[] } = await req.body;
//     console.log(req.body);

//     await redis.lInsert("genres", "BEFORE", "BEFORE");
//     await redis.quit();
//     res.status(200).json({ message: "Artists saved successfully." });
//   } catch (error) {
//     console.error("Error saving artists:", error);
//     res.status(500).json({ error: "An error occurred while saving artists." });
//   }
// });

app.get("/test/", async (req: Request, res: Response) => {
  try {
    redis.on("error", (err) => console.log("Redis Client Error", err));
    await redis.connect();
    const aString = await redis.ping();
    console.log(aString);
    await redis.quit();

    res.status(200).json({ message: "Message in a bottle." });
  } catch (error) {
    console.error("TeSTinG ErroRs Are FinE??", error);
    res.status(500).json({ error: "Another error" });
  }
});
app.get("/json-test/", async (req: Request, res: Response) => {
  try {
    redis.on("error", (err) => console.log("Redis Client Error", err));
    await redis.connect();
    const item = {
      genre: "absurdness genre",
      artists: ["the abs", "the abissians", "the underworld dogs"],
    };

    const artistsByGenreRepo = new Repository(artistsByGenreSchema, redis);

    const index = await artistsByGenreRepo.createIndex();
    console.log(index);
    const artistByGenre = await artistsByGenreRepo.save(item);
    const id = artistByGenre[EntityId];
    console.log(id);

    if (id) {
      const data = await artistsByGenreRepo.fetch(id);

      console.log(data);
    }
    await redis.quit();

    res.status(200).json({ message: "Message in a bottl3." });
  } catch (error) {
    console.error("TeSTinG ErroRs Are FinE??", error);
    res.status(500).json({ error: "Another error" });
  }
});

// Example endpoint to retrieve artists by genre from Redis
app.get("/getArtistsByGenre/:genre", async (req: Request, res: Response) => {
  try {
    redis.on("error", (err) => console.log("Redis Client Error", err));
    await redis.connect();
    const { genre } = req.params;

    // Retrieve artists belonging to the specified genre from Redis
    const artists = await redis.sMembers(`genre:${genre}`);
    const artistSS = await redis.json.GET(`${genre}`);
    console.log(artistSS);
    await redis.quit();

    res.status(200).json({ artists });
  } catch (error) {
    console.error("Error retrieving artists:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving artists." });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
