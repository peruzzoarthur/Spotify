"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/local.js
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const USER_NAME = "username";
const PORT = 3000;
// const REDIS_PORT = 6379;
const redis = new ioredis_1.default({ host: "localhost", port: 6379 });
// Cache middleware
function cache(req, res, next) {
    const username = req.params[USER_NAME];
    redis.get(username, (err, data) => {
        if (err)
            throw err;
        if (data !== null) {
            console.log("This data is already cached");
            res.send(formatOutput(username, Number(data)));
        }
        else {
            console.log("This data is not cached");
            next();
        }
    });
}
app.post("/saveArtistsByGenre", async (req, res) => {
    try {
        const { genre, artists } = req.body; // Assuming your request body contains genre and artists array
        console.log(req.body);
        // Store artists under the specified genre in Redis as a set
        await redis.sadd(`genre:${genre}`, ...artists);
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
        const artists = await redis.smembers(`genre:${genre}`);
        res.status(200).json({ artists });
    }
    catch (error) {
        console.error("Error retrieving artists:", error);
        res
            .status(500)
            .json({ error: "An error occurred while retrieving artists." });
    }
});
app.get(`/repos/:${USER_NAME}`, cache, getRepos);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
function formatOutput(username, numOfRepos) {
    return `${username} has ${numOfRepos} repos`;
}
// Request data from github
async function getRepos(req, res) {
    try {
        const username = req.params[USER_NAME];
        const response = (await fetch(`https://api.github.com/users/${username}`)).json();
        const { public_repos } = await response;
        // Cache data to Redis
        redis.set(username, public_repos);
        res.send(formatOutput(username, public_repos));
    }
    catch (err) {
        console.error(err);
        res.status(500);
    }
}
