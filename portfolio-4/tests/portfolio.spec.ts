import { test, expect } from "@playwright/test";

test("desktop map and portfolio interactions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".career-scene canvas")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "My career.Visualized.",
  );
  await page.screenshot({ path: "test-results/desktop.png" });

  await page.getByRole("button", { name: "Explore 2022:" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Thinking in systems." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Explore 2022:" }),
  ).toBeFocused();

  const paths = page.getByRole("button", {
    name: "POSSIBLE PATHS",
    exact: true,
  });
  await paths.click();
  await expect(paths).toHaveAttribute("aria-pressed", "false");
  await paths.click();
  await expect(paths).toHaveAttribute("aria-pressed", "true");

  const firstMilestone = page.locator(".milestone-0");
  const initialPosition = await firstMilestone.evaluate(
    (element) => element.style.left,
  );
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect
    .poll(() => firstMilestone.evaluate((element) => element.style.left))
    .not.toBe(initialPosition);
  await page.getByRole("button", { name: "Reset map view" }).click();
  await expect
    .poll(() => firstMilestone.evaluate((element) => element.style.left))
    .toBe(initialPosition);

  await page.mouse.move(790, 695);
  await page.mouse.down();
  await page.mouse.move(880, 650, { steps: 8 });
  await page.mouse.up();
  await expect
    .poll(() => firstMilestone.evaluate((element) => element.style.left))
    .not.toBe(initialPosition);
  await page.getByRole("button", { name: "Reset map view" }).click();

  await page
    .getByRole("button", { name: "Explore my TypeScript skills" })
    .click();
  await expect(page.locator(".skill-highlighted")).toContainText("TypeScript");
  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect(page.locator(".skill-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".skill-card")).toHaveCount(6);

  await page.getByRole("button", { name: "View Nexus case study" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Nexus" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close details" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View Nexus case study" }),
  ).toBeFocused();

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "EMAIL COPIED" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "hello@alexrivera.dev",
  );
  await page
    .getByRole("link", { name: "Alex Rivera, home", exact: true })
    .click();
  await page.screenshot({ path: "test-results/full-page.png", fullPage: true });
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("mobile layout and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".career-scene canvas")).toBeVisible();
  await page.screenshot({ path: "test-results/mobile.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Experience" })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("heading", {
      name: "Not a straight line. A meaningful one.",
    }),
  ).toBeInViewport();
  await page.locator(".experience-row").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Building what comes next." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close details" }).click();
  await expect(page.locator(".experience-row").first()).toBeFocused();
  await page
    .getByRole("link", { name: "Alex Rivera, home", exact: true })
    .click();
  await page.screenshot({
    path: "test-results/mobile-full.png",
    fullPage: true,
  });
});

test("tablet layout stays within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 834, height: 1112 });
  await page.goto("/");
  await expect(page.locator(".career-scene canvas")).toBeVisible();
  await page.screenshot({ path: "test-results/tablet.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Explore 2019:" }).click();
  await expect(
    page.getByRole("heading", { name: "The first commit." }),
  ).toBeVisible();
});

test("career details remain usable without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".scene-fallback")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByText("3D is unavailable on this device.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Explore 2020:" }).click();
  await expect(
    page.getByRole("heading", { name: "Connecting the dots." }),
  ).toBeVisible();
});

test("touch devices can explore milestones and navigate", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await page.getByRole("button", { name: "Explore 2022:" }).tap();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close details" }).tap();
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .tap();
  await expect(page.getByLabel("Your name")).toBeInViewport();
  await context.close();
});

test("contact form validates and composes an email", async ({ page }) => {
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: "LET'S START A CONVERSATION" })
    .click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Jamie Chen");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("jamie@example.com");
  await page
    .getByLabel("What's on your mind?")
    .fill("I'd love to talk about a creative development project.");
  await page
    .getByRole("button", { name: "LET'S START A CONVERSATION" })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Your draft is ready" }),
  ).toBeVisible();
});
