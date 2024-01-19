import { HttpResponse, http } from "msw";

export const tokenHandler = [
  http.post("https://accounts.spotify.com/api/token", () => {
    console.log("any tokens?");
    return HttpResponse.json({
      access_token:
        "BQBGuxGClOybhE-vG8anNClZE2UlXdHJ0ZEVzBAlGNuz36Gd9dC_XTxyzoHj_4cLzlWDxgyivmoSwduKE2h5kZoUc9LW_ep1iR5EI-1n6ifUxb5oY_rJV9VguMLZVHZvTEZB62mlya0bDyjg5SID0ZEFteikUdmVdCVZ1iex-R4_iFie0YABZi8lvxejPSGBzld12s3WsjlTJ252tG-YfTSr2OFRrKm4ePoIsCTaEyu1vCV6WWCJoWw9inFKUtRxM3IySAIMZmEaXuUgJtSx",
      token_type: "Bearer",
      expires_in: 3600,
      refresh_token:
        "AQBLPU0lnQ1ZKMCOo5pEQn2ZGa1dKhIF5dCkBw5gQyfak0hAxV3PNPxdEfdasB-KWBeu4uzL_sQsQ9677wfDdEGgRu2uGfdKWaTg8uZXXYLnBUaS0a48R6xXZWEL4iMYy0M",
      scope:
        "playlist-read-private user-library-read playlist-modify-private playlist-modify-public user-read-email user-read-private user-top-read",
    });
  }),
];
