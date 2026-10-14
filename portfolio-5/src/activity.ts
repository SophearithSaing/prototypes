import {
  activityStats,
  formatActivityDate,
  GITHUB_USERNAME,
  parseActivity,
  type ActivityDay,
} from "./activity-data";
import type { ActivityScene } from "./activity-scene";

export function initActivity(section: HTMLElement) {
  const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
    section.querySelector<T>(selector)!;
  const period = $<HTMLSelectElement>("#activity-period");
  const canvas = $<HTMLCanvasElement>("#activity-canvas");
  const viewport = $("#activity-viewport");
  const graph = $("#activity-graph");
  const state = $("#activity-state");
  const message = $("#activity-message");
  const retry = $<HTMLButtonElement>("#activity-retry");
  const status = $("#activity-status");
  const number = new Intl.NumberFormat("en");
  let scene: ActivityScene | undefined;
  let webglUnavailable = false;
  let controller: AbortController | undefined;
  let version = 0;
  let started = false;
  let disposed = false;

  for (
    let year = new Date().getFullYear();
    year >= new Date().getFullYear() - 4;
    year--
  ) {
    period.add(new Option(String(year), String(year)));
  }
  const profile = $<HTMLAnchorElement>("#activity-profile");
  profile.href = `https://github.com/${GITHUB_USERNAME}`;
  $("#activity-username").textContent = `@${GITHUB_USERNAME}`;

  function inspect(day: ActivityDay, keyboard: boolean, screenX: number) {
    $("#activity-day-count").textContent =
      `${number.format(day.count)} ${day.count === 1 ? "contribution" : "contributions"}`;
    $("#activity-day-date").textContent = formatActivityDate(day.date);
    if (keyboard) {
      viewport.scrollTo({
        left: screenX - viewport.clientWidth / 2,
        behavior: "instant",
      });
    }
  }

  async function showDays(days: ActivityDay[], request: number) {
    if (!scene && !webglUnavailable) {
      try {
        const { createActivityScene } = await import("./activity-scene");
        if (disposed || request !== version) return;
        scene = createActivityScene(canvas, inspect);
      } catch (error) {
        console.error("Unable to initialize the activity graph:", error);
        webglUnavailable = true;
      }
    }
    if (disposed || request !== version) return;
    const stats = activityStats(days);
    $("#activity-total").textContent = number.format(stats.total);
    $("#activity-active-days").textContent = number.format(stats.activeDays);
    $("#activity-streak").textContent = number.format(stats.longestStreak);
    $("#activity-best").textContent = number.format(stats.bestDay);
    const elapsed = days.filter((day) => !day.future);
    $("#activity-range").textContent = elapsed.length
      ? `${formatActivityDate(elapsed[0].date, true)} — ${formatActivityDate(elapsed[elapsed.length - 1].date, true)}`
      : "No activity in this period yet";
    $("#activity-day-count").textContent = stats.total
      ? "Every day tells a story"
      : "A fresh page";
    $("#activity-day-date").textContent = stats.total
      ? "Hover or tap a column to explore"
      : "No contributions in this period";
    $("#activity-table-body").replaceChildren(
      ...elapsed
        .slice()
        .reverse()
        .map((day) => {
          const row = document.createElement("tr");
          const date = document.createElement("th");
          date.scope = "row";
          date.textContent = formatActivityDate(day.date);
          const count = document.createElement("td");
          count.textContent = number.format(day.count);
          row.append(date, count);
          return row;
        }),
    );
    $("#activity-daily-list").hidden = false;
    scene?.setDays(days);
    graph.classList.add("has-data");
    graph.setAttribute("aria-busy", "false");
    graph.classList.remove("is-loading");
    state.hidden = !webglUnavailable;
    if (webglUnavailable) {
      message.textContent =
        "The 3D view needs WebGL. Explore your daily activity in the table below.";
      retry.hidden = true;
    }
    // Start with recent activity in view on narrower screens.
    viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
  }

  async function load() {
    started = true;
    controller?.abort();
    const requestController = new AbortController();
    controller = requestController;
    const signal = requestController.signal;
    const request = ++version;
    const selectedPeriod = period.value;
    const cacheKey = `career-circuit:github:${GITHUB_USERNAME}:${selectedPeriod}`;
    let cached: { days: ActivityDay[]; savedAt: string } | undefined;
    status.textContent = "Connecting to GitHub";
    status.classList.remove("is-saved");
    graph.setAttribute("aria-busy", "true");
    graph.classList.add("is-loading");
    graph.classList.remove("has-data");
    state.hidden = false;
    message.textContent = "Connecting the days…";
    retry.hidden = true;
    $("#activity-daily-list").hidden = true;
    $("#activity-range").textContent = "Loading activity";
    $("#activity-day-count").textContent = "Your next perspective";
    $("#activity-day-date").textContent = "Loading daily contributions";
    for (const id of [
      "#activity-total",
      "#activity-active-days",
      "#activity-streak",
      "#activity-best",
    ])
      $(id).textContent = "—";
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const entry = JSON.parse(stored);
        if (
          typeof entry.savedAt === "string" &&
          Number.isFinite(Date.parse(entry.savedAt))
        ) {
          cached = {
            days: parseActivity(entry.payload),
            savedAt: entry.savedAt,
          };
          await showDays(cached.days, request);
        }
      }
    } catch {
      // Storage is optional; a fresh response works without it.
    }
    if (disposed || request !== version) return;
    const timeout = window.setTimeout(() => requestController.abort(), 15000);
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${encodeURIComponent(selectedPeriod)}`,
        { signal },
      );
      if (!response.ok)
        throw new Error(`GitHub activity returned ${response.status}`);
      const payload: unknown = await response.json();
      const days = parseActivity(payload);
      if (disposed || request !== version) return;
      await showDays(days, request);
      if (disposed || request !== version) return;
      status.textContent = "Live GitHub activity";
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ savedAt: new Date().toISOString(), payload }),
        );
      } catch {
        // Restricted or full storage does not prevent the graph from working.
      }
    } catch {
      if (disposed || request !== version) return;
      graph.setAttribute("aria-busy", "false");
      graph.classList.remove("is-loading");
      status.classList.add("is-saved");
      if (cached) {
        status.textContent = `Saved activity · ${formatActivityDate(cached.savedAt.slice(0, 10), true)}`;
      } else {
        status.textContent = "Activity unavailable";
        message.textContent =
          "Couldn’t load GitHub activity. Try connecting again.";
        retry.hidden = false;
        state.hidden = false;
        $("#activity-range").textContent = "GitHub is currently unreachable";
        $("#activity-day-date").textContent =
          "Use Try again to reload your activity";
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const onChange = () => void load();
  period.addEventListener("change", onChange);
  retry.addEventListener("click", onChange);
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        observer.disconnect();
        void load();
      }
    },
    { rootMargin: "250px" },
  );
  observer.observe(section);

  return () => {
    disposed = true;
    controller?.abort();
    observer.disconnect();
    period.removeEventListener("change", onChange);
    retry.removeEventListener("click", onChange);
    scene?.dispose();
  };
}
