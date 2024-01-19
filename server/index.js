//aa
const express = require("express");
const Redis = require("ioredis");

const app = express();
const PORT = process.env.PORT || 3001; // Define your desired port number

// Connect to Redis
const redis = new Redis({
  host: "redis-19497.c308.sa-east-1-1.ec2.cloud.redislabs.com", // Replace with your Redis server host
  port: 19497, // Replace with your Redis server port
  // Optionally, add Redis authentication
  password: "oTVlGCiGlaMQHeo80pLDlzM8UamYL5yU",
});

// Example endpoint to save artists by genre in Redis
app.post("/saveArtistsByGenre", async (req, res) => {
  try {
    const { genre, artists } = req.body; // Assuming your request body contains genre and artists array

    // Store artists under the specified genre in Redis as a set
    await redis.sadd(`genre:${genre}`, ...artists);

    res.status(200).json({ message: "Artists saved successfully." });
  } catch (error) {
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
  } catch (error) {
    console.error("Error retrieving artists:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving artists." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
