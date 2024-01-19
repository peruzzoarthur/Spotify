import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  // await page.waitForTimeout(3000);

  // await page.addInitScript({
  //   path: "./tests/preload.ts",
  // });
});

test("liked songs functionality", async ({ page }) => {
  await page.goto("localhost:5173");
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Liked Songs" }).click();
  await expect(page.getByRole("img", { name: "MoCK3d" })).toBeVisible();
  await expect(page.locator("h1")).toContainText("Liked Songs");
  await expect(page.locator("h3")).toContainText("your liked songs 💚");
  await expect(page.getByRole("main")).toContainText("Profile");
  await expect(page.getByRole("main")).toContainText("/ Liked songs");
  await expect(
    page.getByRole("button", { name: "acousticness" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "danceability" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "energy" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "instrumentalness" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "liveness" })).toBeVisible();
  await expect(page.getByRole("button", { name: "loudness" })).toBeVisible();
  await expect(page.getByRole("button", { name: "speechiness" })).toBeVisible();
  await expect(page.getByRole("button", { name: "valence" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "King's Dead (with Kendrick" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Wow Freestyle (feat. Kendrick" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Rigamortus" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Turquoised - Tiny Room" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "SAY WHERE" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Null & Void" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Whats the World Mean to You" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Slightest Right" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Escalator (Demo Version)" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Black Lion" })).toBeVisible();
  await page.getByRole("button", { name: "Load More" }).click();
  await expect(page.getByRole("link", { name: "Uruguay" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Rio Arriba" })).toBeVisible();
  await expect(page.getByRole("link", { name: "La Calor" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Pasale" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Maria das Mercedes" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Água de Beber" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Moments" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Justo's Waltz" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Black Times - Radio Edit" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "T.I.B.W.F." })).toBeVisible();
  await page.getByRole("cell", { name: "1", exact: true }).click();
  await expect(page.locator("tbody")).toContainText("1");
  await expect(page.locator("tbody")).toContainText(
    "King's Dead (with Kendrick Lamar, Future & James Blake)"
  );
  await page.getByRole("button", { name: "danceability" }).click();
  await expect(page.locator("tbody")).toContainText("1");
  await expect(page.locator("tbody")).toContainText("SAY WHERE");
  await page.getByRole("button", { name: "loudness" }).click();
  await expect(page.locator("tbody")).toContainText("1");
  await expect(page.locator("tbody")).toContainText(
    "Wow Freestyle (feat. Kendrick Lamar)"
  );
  await page.getByRole("button", { name: "valence" }).click();
  await expect(page.locator("tbody")).toContainText("1");
  await expect(page.locator("tbody")).toContainText("Black Times - Radio Edit");
});
