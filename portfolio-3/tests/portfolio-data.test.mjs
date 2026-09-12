import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  parsePortfolio,
  loadPortfolio,
  escapeHtml,
  formatText,
} from "../src/portfolio-data.ts";
import { timelineLayout, extraTimelineHeight } from "../src/timeline-layout.ts";

const fixture = JSON.parse(
  await readFile(new URL("../public/portfolio.json", import.meta.url), "utf8"),
);

test("the editable JSON supplies the profile, experiences and projects", () => {
  const data = parsePortfolio(fixture);
  assert.equal(data.profile.name, fixture.profile.name);
  assert.equal(data.milestones.length, fixture.milestones.length);
  assert.equal(data.projects.length, fixture.projects.length);
  assert.deepEqual(data.about.skills, fixture.about.skills);
});

test("content counts and years can change without a code change", () => {
  for (const count of [0, 1, 3, 7, 12]) {
    const input = structuredClone(fixture);
    input.milestones = Array.from({ length: count }, (_, index) => ({
      ...fixture.milestones[0],
      year: 2010 + index,
    }));
    input.projects = [];
    const data = parsePortfolio(input);
    assert.equal(data.milestones.length, count);
    assert.equal(data.projects.length, 0);
    if (count)
      assert.equal(data.milestones.at(-1).year, String(2010 + count - 1));
    const layout = timelineLayout(count);
    assert.equal(layout.length, count);
    layout.forEach((anchor, index) => {
      assert.ok(Number.isFinite(anchor.x) && Number.isFinite(anchor.y));
      if (index) assert.ok(anchor.y < layout[index - 1].y);
    });
    if (count > 5) assert.ok(extraTimelineHeight(count) > 0);
  }
});

test("configuration errors identify the field that needs fixing", () => {
  const input = structuredClone(fixture);
  input.milestones[1].skills = "TypeScript";
  assert.throws(
    () => parsePortfolio(input),
    /milestones\[1\]\.skills must be an array/,
  );
  input.milestones[1].skills = [];
  input.profile.email = "invalid";
  assert.throws(() => parsePortfolio(input), /profile.email/);
  assert.throws(() => parsePortfolio(null), /portfolio must be an object/);
});

test("project images can be local or HTTP URLs; illustration names are checked", () => {
  const input = structuredClone(fixture);
  for (const image of [
    "images/work.jpg",
    "/images/work.jpg",
    "https://example.com/work.jpg",
  ]) {
    input.projects[0].image = image;
    assert.equal(parsePortfolio(input).projects[0].image, image);
  }
  input.projects[0].image = "javascript:alert(1)";
  assert.throws(() => parsePortfolio(input), /projects\[0\]\.image/);
  delete input.projects[0].image;
  input.projects[0].artwork = "unknown";
  assert.throws(() => parsePortfolio(input), /projects\[0\]\.artwork/);
});

test("editable content remains text, with only explicit emphasis and line breaks", () => {
  assert.equal(
    escapeHtml('Ada & "Co" <studio>'),
    "Ada &amp; &quot;Co&quot; &lt;studio&gt;",
  );
  assert.equal(
    formatText('A *new chapter*\n<img src=x onerror="alert(1)">'),
    "A <em>new chapter</em><br>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
  );
});

test("the loader requests current JSON rather than a bundled copy", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/preview/portfolio.json");
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify(fixture));
  });
  const data = await loadPortfolio("/preview/portfolio.json");
  assert.equal(data.profile.name, fixture.profile.name);
});

test("HTTP and JSON syntax failures are recoverable loading errors", async (t) => {
  const mock = t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("Missing", { status: 404 }),
  );
  await assert.rejects(loadPortfolio("/portfolio.json"), /HTTP 404/);
  mock.mock.mockImplementation(async () => new Response('{ "broken": }'));
  await assert.rejects(loadPortfolio("/portfolio.json"), /invalid JSON/);
});
