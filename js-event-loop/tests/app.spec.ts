import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { scenarios } from "../src/scenarios";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("loads the runtime diagram without errors or horizontal overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await expect(
    page.getByRole("heading", { name: "JavaScript, in motion." }),
  ).toBeVisible();
  await expect(page.locator(".scene-viewport canvas")).toBeVisible();
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-renderer",
    "webgl",
  );
  await expect(page.locator(".diagram-zone")).toHaveCount(4);
  await expect(page.locator(".diagram-connection")).toHaveCount(5);
  await expect(page.locator(".scene-viewport canvas")).toHaveCSS(
    "pointer-events",
    "none",
  );
  await expect(
    page.getByRole("button", { name: "Reset camera view" }),
  ).toHaveCount(0);
  await expect(page.locator(".scene-fallback")).toHaveCount(0);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath("playground.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

for (const scenario of scenarios) {
  test(`${scenario.tab} steps through the full example`, async ({
    page,
  }, testInfo) => {
    await page.getByRole("tab", { name: scenario.tab, exact: true }).click();
    await expect(
      page.getByRole("heading", { name: scenario.title }),
    ).toBeVisible();
    for (let index = 0; index < scenario.frames.length; index++) {
      await page.getByRole("button", { name: "Step", exact: true }).click();
      await expect(page.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        String(index + 1),
      );
      for (const zone of ["stack", "apis", "microtasks", "tasks"] as const) {
        await expect(
          page.locator(`.zone-${zone} .diagram-item code`),
        ).toHaveText(scenario.frames[index][zone]);
      }
      await expect(page.locator(".scene-viewport")).toHaveAttribute(
        "data-moving",
        "false",
      );
      if (scenario.id === "overview" && index === 4)
        await page.screenshot({
          path: testInfo.outputPath("in-motion.png"),
          fullPage: true,
        });
    }
    await expect(page.locator(".console-line > span:nth-child(2)")).toHaveText(
      scenario.frames.at(-1)!.logs,
    );
    await expect(
      page.getByRole("button", { name: "Step", exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Replay simulation" }),
    ).toBeVisible();
    if (scenario.id === "overview")
      await page.screenshot({
        path: testInfo.outputPath("completed.png"),
        fullPage: true,
      });
    await page
      .getByRole("button", { name: "Reset simulation", exact: true })
      .click();
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    await expect(page.locator(".console-line")).toHaveCount(0);
    await page.getByRole("button", { name: "Run simulation" }).click();
    await expect(
      page.getByRole("button", { name: "Pause simulation" }),
    ).toBeVisible();
  });
}

test("play, pause, speed, and concept switching stay in sync", async ({
  page,
}) => {
  await page.getByLabel("Playback speed").selectOption("2");
  await page.getByRole("button", { name: "Run simulation" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.getByRole("button", { name: "Pause simulation" }).click();
  const pausedAt = await page
    .getByRole("progressbar")
    .getAttribute("aria-valuenow");
  await page.waitForTimeout(1100);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    pausedAt!,
  );
  await page.getByRole("button", { name: "Resume simulation" }).click();
  await page.getByRole("tab", { name: "Async / await", exact: true }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await expect(
    page.getByRole("button", { name: "Run simulation" }),
  ).toBeVisible();
  await expect(page.locator(".console-line")).toHaveCount(0);
});

test("components, prediction, field guide, and expanded view are interactive", async ({
  page,
}) => {
  await page.getByRole("button", { name: /^Call stack:/ }).click();
  await expect(
    page.getByRole("region", { name: "About Call stack" }),
  ).toContainText("last in, first out");
  await page
    .getByRole("button", { name: "Close component explanation" })
    .click();
  await page
    .getByRole("button", { name: "Will the timer or the promise run first?" })
    .click();
  await expect(page.locator(".answer-panel")).toContainText("The promise.");
  await page.getByRole("button", { name: "Hide answer" }).click();
  await page.getByRole("button", { name: "Field guide" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Expand runtime" }).click();
  await expect(page.locator(".runtime-expanded")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".runtime-expanded")).toHaveCount(0);
});

test("copies source and clears only existing console messages", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy code" }).click();
  await expect(page.getByRole("button", { name: "Code copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    scenarios[0].code.join("\n"),
  );
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await expect(page.locator(".console-line")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear console" }).click();
  await expect(page.locator(".console-line")).toHaveCount(0);
  for (let index = 0; index < 4; index++)
    await page.getByRole("button", { name: "Step", exact: true }).click();
  await expect(page.locator(".console-line > span:nth-child(2)")).toHaveText([
    "World",
  ]);
});

test("supports keyboard playback and accessible concept tabs", async ({
  page,
}) => {
  await page.locator("body").click({ position: { x: 2, y: 2 } });
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  );
  await page.keyboard.press("r");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await page.getByRole("tab", { name: "The big picture", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Micro vs. macro", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Micro vs. macro", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
});

test("keeps simulations usable without WebGL", async ({ page }) => {
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
  await page.reload();
  await expect(page.locator(".scene-fallback")).toBeVisible();
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await expect(page.locator(".zone-stack .diagram-items")).toContainText(
    "Hello",
  );
  await expect(page.locator(".console-line > span:nth-child(2)")).toHaveText([
    "Hello",
  ]);
});

test("has no automated accessibility violations in the playground or guide", async ({
  page,
}) => {
  for (const view of ["playground", "guide"]) {
    if (view === "guide")
      await page.getByRole("button", { name: "Field guide" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});

test("automatically finishes and can replay without carrying over output", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.getByLabel("Playback speed").selectOption("2");
  await page.getByRole("button", { name: "Run simulation" }).click();
  for (let index = 1; index < scenarios[0].frames.length; index++) {
    await page.clock.runFor(900);
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      String(index + 1),
    );
  }
  await expect(
    page.getByRole("button", { name: "Replay simulation" }),
  ).toBeVisible();
  await expect(page.locator(".console-line > span:nth-child(2)")).toHaveText([
    "Hello",
    "World",
    "Promise",
    "Timer",
  ]);
  await page.getByRole("button", { name: "Replay simulation" }).click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "1",
  );
  await expect(page.locator(".console-line > span:nth-child(2)")).toHaveText([
    "Hello",
  ]);
});

test("resizes cleanly from small phones to wide desktops", async ({ page }) => {
  for (const width of [360, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 960 });
    await expect(
      page.getByRole("button", { name: "Run simulation" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("moves a 3D task along an arrow without moving the diagram", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  const position = () =>
    page.locator(".zone-stack").evaluate((element) => {
      const node = element as HTMLElement;
      return {
        x: node.offsetLeft,
        y: node.offsetTop,
        width: node.offsetWidth,
        height: node.offsetHeight,
      };
    });
  const originalBounds = await position();
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page.clock.runFor(450);
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "true",
  );
  await expect(
    page.locator('.diagram-connection[data-route="stack-apis"]'),
  ).toHaveClass(/connection-active/);
  await expect(page.locator(".zone-apis .diagram-items")).toHaveCSS(
    "opacity",
    "0",
  );
  expect(await position()).toEqual(originalBounds);
  await page.screenshot({
    path: testInfo.outputPath("3d-transfer.png"),
    fullPage: true,
  });
  await page.clock.runFor(700);
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "false",
  );
  await expect(page.locator(".zone-apis .diagram-item")).toBeVisible();
  await expect(page.locator(".zone-apis .diagram-items")).toHaveCSS(
    "opacity",
    "0",
  );
  await page.getByLabel("Playback speed").selectOption("2");
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page.clock.runFor(650);
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "false",
  );
  await expect(page.locator(".zone-tasks .diagram-items")).toHaveCSS(
    "opacity",
    "0",
  );
});

test("renders containers and resting blocks in WebGL, not HTML cards", async ({
  page,
}, testInfo) => {
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page.getByRole("button", { name: "Expand runtime" }).click();
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-renderer",
    "webgl",
  );
  await expect(page.locator(".zone-stack .diagram-items")).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator(".zone-stack")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const canvas = page.locator(".scene-viewport canvas");
  expect(
    await canvas.evaluate((element) => {
      const context = (element as HTMLCanvasElement).getContext("webgl2")!;
      return context.getParameter(context.CURRENT_PROGRAM) !== null;
    }),
  ).toBe(true);
  const before = await canvas.screenshot({
    path: testInfo.outputPath("before-hiding-html.png"),
    scale: "css",
  });
  await page.addStyleTag({
    content: ".diagram-board { visibility: hidden !important; }",
  });
  const after = await canvas.screenshot({
    path: testInfo.outputPath("all-3d-runtime.png"),
    scale: "css",
  });
  expect(after.equals(before)).toBe(true);
});

test("pauses transfers and clears an in-flight block on reset", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:01Z"));
  await page.getByRole("button", { name: "Run simulation" }).click();
  await page.clock.runFor(1900);
  await page.getByRole("button", { name: "Pause simulation" }).click();
  await page.clock.runFor(2000);
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "true",
  );
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.getByRole("button", { name: "Resume simulation" }).click();
  await page.clock.runFor(1200);
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "false",
  );
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "true",
  );
  await page
    .getByRole("button", { name: "Reset simulation", exact: true })
    .click();
  await expect(page.locator(".scene-viewport")).toHaveAttribute(
    "data-moving",
    "false",
  );
  await expect(page.locator(".diagram-item")).toHaveCount(0);
});

test("restores readable queues if WebGL is lost during a transfer", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await page
    .locator(".scene-viewport canvas")
    .dispatchEvent("webglcontextlost");
  await expect(page.locator(".scene-fallback")).toBeVisible();
  await expect(page.locator(".zone-apis .diagram-item")).toBeVisible();
  await expect(page.locator(".zone-apis .diagram-item")).toHaveCSS(
    "opacity",
    "1",
  );
  await page.getByRole("button", { name: "Step", exact: true }).click();
  await expect(page.locator(".zone-tasks .diagram-item")).toBeVisible();
  await expect(page.locator(".zone-tasks .diagram-item")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".zone-tasks .diagram-item")).toContainText(
    "timer callback",
  );
});
