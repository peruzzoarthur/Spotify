import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // await page.waitForTimeout(3000);

  // await page.addInitScript({
  //   path: "./tests/preload.ts",
  // });
});
test("test", async ({ page }) => {
  // await page.goto("http://localhost:5173/");
  // await page.addInitScript({
  //   path: "/dev-arthur/Projects/spotify/SpotifyAPI_v3/client/tests/preload.js",
  // });

  await page.goto("http://localhost:5173/album/6Sts4Yh7KsDFwq2yTWrGGV");
  await page.waitForTimeout(3000);

  await expect(page.getByRole("heading")).toContainText(
    "The Black Saint And The Sinner Lady"
  );
  await expect(
    page.getByRole("button", { name: "Spotify Logo" })
  ).toBeVisible();
  await expect(page.getByRole("heading")).toContainText(
    "The Black Saint And The Sinner Lady"
  );

  await expect(page.locator(".w-6").first()).toBeVisible();
  await expect(page.getByRole("main")).toContainText("Charles Mingus •");
  await expect(page.getByRole("main")).toContainText(
    "Charles Mingus • 1963 • 4 tracks, 39 min 25 sec"
  );
  await expect(page.getByRole("main")).toContainText(
    "Profile/ Albums/ The Black Saint And The Sinner Lady"
  );
  await expect(page.locator("thead")).toContainText("#");
  await expect(page.locator("thead")).toContainText("Track");
  await expect(page.locator("thead")).toContainText("Popularity");
  await expect(page.locator("thead")).toContainText("Artists");
  await expect(page.locator("thead")).toContainText("danceability");
  await expect(page.locator("thead")).toContainText("energy");
  await expect(page.locator("thead")).toContainText("loudness");
  await expect(page.locator("thead")).toContainText("speechiness");
  await expect(page.locator("thead")).toContainText("acousticness");
  await expect(page.locator("thead")).toContainText("instrumentalness");
  await expect(page.locator("thead")).toContainText("liveness");
  await expect(page.locator("thead")).toContainText("valence");
  await expect(page.locator("thead")).toContainText("⏱️");
  await expect(page.locator("tbody")).toContainText("1");
  await expect(page.locator("tbody")).toContainText("2");
  await expect(page.locator("tbody")).toContainText("3");
  await expect(page.locator("tbody")).toContainText("4");
  await expect(page.locator("tbody")).toContainText("Track A- Solo Dancer");
  await expect(page.locator("tbody")).toContainText(
    "Track B- Duete Solo Dancers"
  );
  await expect(page.locator("tbody")).toContainText("Track C-Group Dancers");
  await expect(page.locator("tbody")).toContainText(
    "Medley: Mode D-Trio and Group Dancers/Mode E- Single solos and Group Dance/ModeF-Group and Solo Dance"
  );
  await expect(
    page.getByRole("link", { name: "Track A- Solo Dancer" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Track B- Duete Solo Dancers" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Track C-Group Dancers" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Medley: Mode D-Trio and Group" })
  ).toBeVisible();
  await expect(page.locator("tbody")).toContainText("🔥");
  await expect(page.getByTitle("42")).toBeVisible();
  await expect(page.locator("tbody")).toContainText("🔥");
  await expect(page.locator("tbody")).toContainText("💃");
  await expect(page.locator("tbody")).toContainText("⚡");
  await expect(page.locator("tbody")).toContainText("🔊");
  await expect(page.locator("tbody")).toContainText("🗣️");
  await expect(page.locator("tbody")).toContainText("🎻");
  await expect(page.locator("tbody")).toContainText("🎷");
  await expect(page.locator("tbody")).toContainText("🎤");
  await expect(page.locator("tbody")).toContainText("😊");
  await expect(page.getByTitle("42").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.177").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.622").locator("span")).toBeVisible();
  await expect(page.getByTitle("-8.565").locator("span")).toBeVisible();
  await page.getByTitle("0.058").locator("span").click();
  await page.getByTitle("0.0253").locator("span").click();
  await expect(page.getByTitle("0.058").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.0253").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.0000355").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.0419").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.431").locator("span")).toBeVisible();
  await expect(page.getByRole("cell", { name: ":38" })).toBeVisible();
  await expect(page.locator("tbody")).toContainText("6:38");
  await expect(page.locator("tbody")).toContainText("6:45");
  await expect(page.locator("tbody")).toContainText("7:22");
  await expect(page.locator("tbody")).toContainText("18:39");
  await page.getByTitle("38", { exact: true }).locator("span").click();
  await expect(page.getByTitle("0.23").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.572").locator("span")).toBeVisible();
  await expect(page.getByTitle("-8.746").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.0494").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.258").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.00000381").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.163").locator("span")).toBeVisible();
  await expect(page.getByTitle("0.252").locator("span")).toBeVisible();
});
