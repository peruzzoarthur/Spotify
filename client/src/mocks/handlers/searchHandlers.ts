import { HttpResponse, http } from "msw";
import {
  searchBobMarleyMock,
  searchQueryBobMarleyMock,
  searchQueryTheDoorsMock,
  searchTheDoorsMock,
} from "../mockedResponses/search";
// import { excludeItemFromArray } from "@/utils/excludeItemFromArray";

export const searchHandlers = [
  http.get("https://api.spotify.com/v1/search", ({ request }) => {
    const url = new URL(request.url);
    const searchInput = url.search.toLocaleLowerCase();
    console.log(searchInput);
    console.log("Searching...");
    if (searchInput === "?q=the+doors&type=artist%2calbum%2ctrack&limit=5") {
      console.log("the doors");
      return HttpResponse.json(JSON.parse(searchQueryTheDoorsMock));
    } else if (
      searchInput === "?q=bob+marley&type=artist%2calbum%2ctrack&limit=5"
    ) {
      console.log("bob");
      return HttpResponse.json(JSON.parse(searchQueryBobMarleyMock));
    } else {
      return;
    }
  }),

  http.get(
    "https://api.spotify.com/v1/artists",

    ({ request }) => {
      const url = new URL(request.url);
      const searchInput = url.search.toLocaleLowerCase();
      console.log(searchInput);
      console.log("Searching Artists...");
      if (
        searchInput ===
        "?ids=22wz7m8sxp5thdruny3gxt%2c36qjpde2go2kgarlehcdtp%2c4ngfozcl9ml67xzm0xzivc%2c3ft0q1e2a8wz3mboompmi9%2c4y2caf3w4wz81gixwjbxrf"
      ) {
        return HttpResponse.json({
          artists: JSON.parse(searchTheDoorsMock).artists,
        });
      } else if (
        searchInput ===
        "?ids=2qsynagsdaqzj3u9hgdzjd%2c6bh2lormtpjy3x9dyrghvj%2c2vawvc8sucfkrxejdok7ee%2c1tsg4aumsmt1tcq2nhpov9%2c6lspz3xk0tmspfu70fkqny"
      ) {
        return HttpResponse.json({
          artists: JSON.parse(searchBobMarleyMock).artists,
        });
      } else {
        console.log("Searching with Spotify API");
        return;
      }
    }
  ),

  http.get("https://api.spotify.com/v1/albums", ({ request }) => {
    const url = new URL(request.url);
    const searchInput = url.search.toLocaleLowerCase();
    if (
      searchInput ===
      "?ids=1jwmehn3ggal6isoylfwbn%2c1yzir5finfolzpgksvpliy%2c6v5ivmmy1ivwtbfnqoifsf%2c7ikutic9uwuvngygptqnhs%2c6aflokpjjff652jevcsozx"
    ) {
      console.log("Artists Mocked response...");
      return HttpResponse.json({
        albums: JSON.parse(searchTheDoorsMock).albums,
      });
    } else if (
      searchInput ===
      "?ids=4jkeipwuutjlx9usnydhzn%2c2mbbv0ad6b4ydhmzlzay7s%2c4efdm5bjlaf1xx3snjutfe%2c09df7muzbqwbdygve0t30r%2c321q9p7pelvzcfawxml7vx"
    ) {
      console.log("Albums Mocked response...");
      return HttpResponse.json({
        albums: JSON.parse(searchBobMarleyMock).albums,
      });
    } else {
      console.log(searchInput);
      console.log("Searching with Spotify API");
      return;
    }
  }),
];
