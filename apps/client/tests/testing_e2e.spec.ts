import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  // await page.waitForTimeout(3000);

  // await page.addInitScript({
  //   path: "./tests/preload.ts",
  // });
});

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Search" }).click();
  await page.getByPlaceholder("Search here for albums,").click();
  await page.getByPlaceholder("Search here for albums,").fill("the doors");
  await page.getByPlaceholder("Search here for albums,").press("Enter");
  await page.locator("div:nth-child(2) > .inline-flex").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^People Are StrangeThe DoorsAdd$/ })
    .getByRole("button")
    .click();

  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Liked Songs" }).click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.locator("html").click();
  await page
    .getByRole("row", { name: "8 Slightest Right Slightest" })
    .getByRole("button")
    .click();
  await page
    .getByRole("row", { name: "8 Slightest Right Slightest" })
    .getByRole("button")
    .click();
  await page.getByText("Click to close message.").click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Playlists" }).click();
  await page.getByRole("link", { name: "Cold amaranth defeated" }).click();
  await page
    .getByRole("row", { name: "15 I Know You Know I Know You" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "danceability" }).click();
  await expect(page.locator("tbody")).toContainText("Identité");
  await expect(page.locator("tbody")).toContainText("1");

  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Tracks" }).click();
  await page.getByRole("button", { name: "Add" }).nth(2).click();
  await page.getByRole("button", { name: "Add" }).nth(3).click();
  await page.getByText("Click to close message.").click();
  await page.getByRole("button", { name: "Spotify Logo" }).click();
  await page.getByRole("link", { name: "Recommendations List" }).click();
  await expect(page.getByRole("link", { name: "The Doors" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "People Are Strange" })
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Slightest RightMakaya McCraven$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^I Know You KnowEsperanza Spalding$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "PIRANHA" })).toBeVisible();
  await page.getByRole("button", { name: "Filters" }).click();

  await expect(page.getByText("Filters0.5💃0.5⚡-30🔊0.5🗣️0.")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5💃$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page.locator("span").filter({ hasText: "-" }).getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5🎻$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5🎤$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5⚡$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5🗣️$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5🎷$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^0\.5😊$/ })
      .getByRole("slider")
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Refresh Recommended Tracks" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Stranglehold" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Satellite of Love" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "I Know You Know" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Goodbye Pork Pie Hat" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "My Wild Love" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Bounce, Pts. I + II" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Distraction" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Slightest Right" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "When the Levee Breaks -" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Stand By Me - Remastered" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Crazy Race" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get It On" })).toBeVisible();
  await expect(page.getByRole("link", { name: "In My Room" })).toBeVisible();
  await expect(page.getByRole("link", { name: "A Wish" })).toBeVisible();
  await expect(page.getByRole("link", { name: "QUASIMODO" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Farm to Table (feat. Vic" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Laugh To Keep From Crying" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "C.A.U.T.I.O.N" })).toBeVisible();
  await expect(page.getByRole("link", { name: "PACE" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Export as Cool Playlist" })
  ).toBeVisible();
});
