export interface Milestone {
  year: string;
  role: string;
  note: string;
  title: string;
  description: string;
  reflection: string;
  skills: string[];
}

export interface Project {
  name: string;
  category: string;
  year: string;
  summary: string;
  artwork: "orbit" | "forma" | "still";
  image?: string;
  description: string;
  detail: string;
  stack: string[];
  kind: string;
}

export interface PortfolioData {
  site: { title: string; description: string };
  profile: {
    name: string;
    role: string;
    email: string;
    availability: string;
    coordinates: string;
  };
  hero: { eyebrow: string; title: string; description: string };
  work: {
    eyebrow: string;
    aside: string;
    title: string;
    description: string;
    note: string;
    closingNote: string;
  };
  about: {
    eyebrow: string;
    aside: string;
    intro: string;
    title: string;
    paragraphs: string[];
    skills: string[];
    contactPrompt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    dialogEyebrow: string;
    dialogTitle: string;
    dialogDescription: string;
  };
  footer: { note: string };
  milestones: Milestone[];
  alternatives: { year: string; label: string; note: string }[];
  projects: Project[];
}

function record(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${path} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, path: string): string {
  if (typeof value !== "string") throw new Error(`${path} must be a string.`);
  return value;
}

function year(value: unknown, path: string): string {
  return typeof value === "number" && Number.isFinite(value)
    ? String(value)
    : text(value, path);
}

function fields<K extends string>(
  value: unknown,
  keys: readonly K[],
  path: string,
): Record<K, string> {
  const source = record(value, path);
  const result = {} as Record<K, string>;
  for (const key of keys) result[key] = text(source[key], `${path}.${key}`);
  return result;
}

function list<T>(
  value: unknown,
  path: string,
  parse: (value: unknown, path: string) => T,
): T[] {
  if (!Array.isArray(value)) throw new Error(`${path} must be an array.`);
  return value.map((item, index) => parse(item, `${path}[${index}]`));
}

export function parsePortfolio(value: unknown): PortfolioData {
  const root = record(value, "portfolio");
  const profile = fields(
    root.profile,
    ["name", "role", "email", "availability", "coordinates"],
    "profile",
  );
  if (!profile.name.trim()) throw new Error("profile.name must not be empty.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
    throw new Error("profile.email must be a valid email address.");
  const about = record(root.about, "about");
  return {
    site: fields(root.site, ["title", "description"], "site"),
    profile,
    hero: fields(root.hero, ["eyebrow", "title", "description"], "hero"),
    work: fields(
      root.work,
      ["eyebrow", "aside", "title", "description", "note", "closingNote"],
      "work",
    ),
    about: {
      ...fields(
        about,
        ["eyebrow", "aside", "intro", "title", "contactPrompt"],
        "about",
      ),
      paragraphs: list(about.paragraphs, "about.paragraphs", text),
      skills: list(about.skills, "about.skills", text),
    },
    contact: fields(
      root.contact,
      [
        "eyebrow",
        "title",
        "description",
        "dialogEyebrow",
        "dialogTitle",
        "dialogDescription",
      ],
      "contact",
    ),
    footer: fields(root.footer, ["note"], "footer"),
    milestones: list(root.milestones, "milestones", (value, path) => {
      const item = record(value, path);
      return {
        ...fields(
          item,
          ["role", "note", "title", "description", "reflection"],
          path,
        ),
        year: year(item.year, `${path}.year`),
        skills: list(item.skills, `${path}.skills`, text),
      };
    }),
    alternatives: list(
      root.alternatives ?? [],
      "alternatives",
      (value, path) => {
        const item = record(value, path);
        return {
          ...fields(item, ["label", "note"], path),
          year: year(item.year, `${path}.year`),
        };
      },
    ),
    projects: list(root.projects, "projects", (value, path) => {
      const item = record(value, path);
      const artwork = item.artwork ?? "orbit";
      if (artwork !== "orbit" && artwork !== "forma" && artwork !== "still")
        throw new Error(
          `${path}.artwork must be "orbit", "forma", or "still".`,
        );
      let image: string | undefined;
      if (item.image !== undefined && item.image !== "") {
        image = text(item.image, `${path}.image`);
        const url = new URL(image, "https://portfolio.invalid/");
        if (url.protocol !== "http:" && url.protocol !== "https:")
          throw new Error(
            `${path}.image must be a relative path or an HTTP(S) URL.`,
          );
      }
      return {
        ...fields(
          item,
          ["name", "category", "summary", "description", "detail", "kind"],
          path,
        ),
        year: year(item.year, `${path}.year`),
        artwork,
        image,
        stack: list(item.stack, `${path}.stack`, text),
      };
    }),
  };
}

export async function loadPortfolio(url: string): Promise<PortfolioData> {
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok)
    throw new Error(
      `portfolio.json could not be loaded (HTTP ${response.status}).`,
    );
  let value: unknown;
  try {
    value = await response.json();
  } catch {
    throw new Error(
      "portfolio.json contains invalid JSON. Check commas, quotes, and brackets.",
    );
  }
  return parsePortfolio(value);
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

/** Plain-text content with optional *emphasis* and explicit line breaks. */
export function formatText(value: string): string {
  return escapeHtml(value)
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/\r?\n/g, "<br>");
}
