import { describe, expect, it } from "vitest";
import { runInNewContext } from "node:vm";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { emptyFrame, getZoneDetails, scenarios } from "./scenarios";
import type { ZoneId } from "./scenarios";

const expected: Record<string, string[]> = {
  overview: ["Hello", "World", "Promise", "Timer"],
  microtasks: ["sync", "promise", "microtask", "nested", "timer"],
  async: ["start", "fetching", "end", "received"],
  events: ["listening", "click", "update"],
  node: ["file ready", "next tick", "immediate", "timer"],
};

describe("teaching simulations", () => {
  it("has unique, addressable scenarios", () => {
    expect(new Set(scenarios.map((scenario) => scenario.id)).size).toBe(
      scenarios.length,
    );
    expect(scenarios).toHaveLength(5);
  });

  it.each(scenarios)(
    "$id has valid, complete execution snapshots",
    (scenario) => {
      const last = scenario.frames.at(-1)!;
      expect(last.logs).toEqual(expected[scenario.id]);
      expect(last.stack).toEqual([]);
      expect(last.microtasks).toEqual([]);
      expect(last.tasks).toEqual([]);
      expect(last.apis).toEqual(
        scenario.id === "events" ? ["click listener"] : [],
      );
      let previousLogs: string[] = [];
      for (const frame of scenario.frames) {
        expect(frame.title).toBeTruthy();
        expect(frame.description).toBeTruthy();
        if (frame.line !== null) {
          expect(frame.line).toBeGreaterThan(0);
          expect(frame.line).toBeLessThanOrEqual(scenario.code.length);
        }
        expect(frame.logs.slice(0, previousLogs.length)).toEqual(previousLogs);
        for (const zone of [
          "stack",
          "apis",
          "microtasks",
          "tasks",
        ] as ZoneId[]) {
          expect(new Set(frame[zone]).size).toBe(frame[zone].length);
        }
        previousLogs = frame.logs;
      }
      expect(emptyFrame.logs).toEqual([]);
      expect(emptyFrame.stack).toEqual([]);
    },
  );

  it.each(scenarios.filter((scenario) => scenario.runtime === "browser"))(
    "$id matches actual JavaScript execution order",
    async (scenario) => {
      const logs: string[] = [];
      const timers: (() => void)[] = [];
      let clickHandler: (() => void) | undefined;
      runInNewContext(scenario.code.join("\n"), {
        console: { log: (value: string) => logs.push(value) },
        setTimeout: (callback: () => void) => timers.push(callback),
        queueMicrotask,
        button: {
          addEventListener: (_name: string, callback: () => void) => {
            clickHandler = callback;
          },
        },
      });
      // Let native promise jobs finish before selecting another simulated host task.
      await new Promise<void>((resolve) => setImmediate(resolve));
      if (clickHandler) {
        clickHandler();
        await new Promise<void>((resolve) => setImmediate(resolve));
      }
      for (const timer of timers) {
        timer();
        await new Promise<void>((resolve) => setImmediate(resolve));
      }
      expect(logs).toEqual(expected[scenario.id]);
    },
  );

  it("matches actual Node I/O-callback ordering", async () => {
    const scenario = scenarios.find((item) => item.id === "node")!;
    const code = scenario.code
      .join("\n")
      .replace("'notes.txt'", "'package.json'");
    const { stdout, stderr } = await promisify(execFile)(process.execPath, [
      "--input-type=module",
      "--eval",
      code,
    ]);
    expect(stderr).toBe("");
    expect(stdout.trim().split("\n")).toEqual(expected.node);
  });

  it("distinguishes Node nextTicks from browser microtasks", () => {
    expect(getZoneDetails("microtasks", "node").title).toBe("NextTick queue");
    expect(getZoneDetails("microtasks", "browser").title).toBe(
      "Microtask queue",
    );
    expect(getZoneDetails("tasks", "node").description).toContain(
      "not one FIFO queue",
    );
  });
});
