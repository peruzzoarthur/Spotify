import { createClient } from "redis";
import { Repository, Schema } from "redis-om";
// export const redis = new Redis({
//   host: "redis-19497.c308.sa-east-1-1.ec2.cloud.redislabs.com", // Replace with your Redis server host
//   port: 19497, // Replace with your Redis server port
//   // Optionally, add Redis authentication
//   password: "oTVlGCiGlaMQHeo80pLDlzM8UamYL5yU",
// });

export const redis = createClient({
  url: "redis://default:oTVlGCiGlaMQHeo80pLDlzM8UamYL5yU@redis-19497.c308.sa-east-1-1.ec2.cloud.redislabs.com:19497",
});

export const artistsByGenreSchema = new Schema("artistsByGenre", {
  genre: { type: "string" },
  artists: { type: "string[]" },
});


