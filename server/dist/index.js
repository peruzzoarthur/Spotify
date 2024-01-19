"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/local.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("./lib/redis");
var cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const USER_NAME = "username";
const PORT = 3000;
// const REDIS_PORT = 6379;
app.post("/saveArtistsByGenre", async (req, res) => {
    try {
        const { genre, artists } = await req.body; // Assuming your request body contains genre and artists array
        console.log(req.body);
        // Store artists under the specified genre in Redis as a set
        await redis_1.redis.sadd(`genre:${genre}`, ...artists);
        res.status(200).json({ message: "Artists saved successfully." });
    }
    catch (error) {
        console.error("Error saving artists:", error);
        res.status(500).json({ error: "An error occurred while saving artists." });
    }
});
// Example endpoint to retrieve artists by genre from Redis
app.get("/getArtistsByGenre/:genre", async (req, res) => {
    try {
        const { genre } = req.params;
        // Retrieve artists belonging to the specified genre from Redis
        const artists = await redis_1.redis.smembers(`genre:${genre}`);
        res.status(200).json({ artists });
    }
    catch (error) {
        console.error("Error retrieving artists:", error);
        res
            .status(500)
            .json({ error: "An error occurred while retrieving artists." });
    }
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
