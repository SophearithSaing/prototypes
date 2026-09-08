export type ZoneId = "stack" | "apis" | "microtasks" | "tasks";

export interface Frame {
  title: string;
  description: string;
  line: number | null;
  active: ZoneId | null;
  stack: string[];
  apis: string[];
  microtasks: string[];
  tasks: string[];
  logs: string[];
  transfer?: { from: ZoneId; to: ZoneId };
}

export interface Scenario {
  id: string;
  tab: string;
  title: string;
  subtitle: string;
  filename: string;
  runtime: "browser" | "node";
  code: string[];
  frames: Frame[];
  insight: string;
  question: string;
  answer: string;
  concepts: { title: string; description: string }[];
}

export const emptyFrame: Frame = {
  title: "A small script. A lot happening underneath.",
  description:
    "Press play and follow each task as it moves through the runtime. Or take it one step at a time. The highlighted line shows exactly what is executing.",
  line: null,
  active: null,
  stack: [],
  apis: [],
  microtasks: [],
  tasks: [],
  logs: [],
};

type Step = Pick<Frame, "title" | "description"> &
  Partial<Omit<Frame, "title" | "description">>;

// Each teaching step is an immutable snapshot; unchanged queues carry forward.
function frames(steps: Step[]): Frame[] {
  let previous = emptyFrame;
  return steps.map((step) => {
    const next = {
      ...previous,
      line: null,
      active: null,
      transfer: undefined,
      ...step,
    };
    previous = next;
    return next;
  });
}

export const scenarios: Scenario[] = [
  {
    id: "overview",
    tab: "The big picture",
    title: "A little async. A little surprise.",
    subtitle: "A timer, a promise, and two logs walk into a runtime.",
    filename: "hello-event-loop.js",
    runtime: "browser",
    code: [
      "console.log('Hello');",
      "",
      "setTimeout(() => {",
      "  console.log('Timer');",
      "}, 0);",
      "",
      "Promise.resolve().then(() => {",
      "  console.log('Promise');",
      "});",
      "",
      "console.log('World');",
    ],
    insight:
      "Zero delay does not mean right now. A timer waits for the stack to clear and for all microtasks to finish.",
    question: "Will the timer or the promise run first?",
    answer:
      "The promise. Its callback is a microtask, and microtasks drain before the next timer task. The output is Hello, World, Promise, Timer.",
    concepts: [
      {
        title: "One thing at a time",
        description:
          "JavaScript runs synchronous code on a single call stack. The current task always gets to finish.",
      },
      {
        title: "Not all queues are equal",
        description:
          "Promise callbacks are microtasks. They get their turn before the next timer or event task.",
      },
      {
        title: "Then, around we go",
        description:
          "The event loop takes the next ready task, runs it, and checks the microtask queue again.",
      },
    ],
    frames: frames([
      {
        title: "First, the familiar part.",
        description:
          "The script enters the call stack. Synchronous code runs immediately, so the first message is logged.",
        line: 1,
        active: "stack",
        stack: ["script", 'log("Hello")'],
        logs: ["Hello"],
      },
      {
        title: "A timer takes the scenic route.",
        description:
          "setTimeout asks the browser to track a timer. A delay of 0 makes the callback eligible soon; it does not run it on the current stack.",
        line: 3,
        active: "apis",
        stack: ["script", "setTimeout()"],
        apis: ["timer: 0 ms"],
        transfer: { from: "stack", to: "apis" },
      },
      {
        title: "Ready does not mean running.",
        description:
          "Once the timer is ready, its callback is queued as a task. The running script still owns the stack.",
        active: "tasks",
        stack: ["script"],
        apis: [],
        tasks: ["timer callback"],
        transfer: { from: "apis", to: "tasks" },
      },
      {
        title: "Promises have their own line.",
        description:
          "This promise is already resolved. Calling .then() queues its reaction as a microtask, even though the promise is ready now.",
        line: 7,
        active: "microtasks",
        microtasks: ["promise callback"],
        transfer: { from: "stack", to: "microtasks" },
      },
      {
        title: "The script gets the last word. For now.",
        description:
          "Synchronous work keeps going. World is logged before either of the queued callbacks can execute.",
        line: 11,
        active: "stack",
        stack: ["script", 'log("World")'],
        logs: ["Hello", "World"],
      },
      {
        title: "An empty stack opens the door.",
        description:
          "The script finishes and its stack frame is removed. At this microtask checkpoint, the runtime drains pending microtasks before choosing another task.",
        stack: [],
      },
      {
        title: "The microtask goes first.",
        description:
          "The promise reaction moves onto the stack. Even though the timer was queued first, its task does not take priority over microtasks.",
        line: 8,
        active: "stack",
        stack: ["promise callback"],
        microtasks: [],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "Promise, delivered.",
        description:
          "The promise callback logs its message and returns. The microtask queue is now empty.",
        line: 8,
        active: "stack",
        stack: [],
        logs: ["Hello", "World", "Promise"],
      },
      {
        title: "Now it is the timer's turn.",
        description:
          "With the microtask checkpoint complete, the event loop can select the timer task and run its callback.",
        line: 4,
        active: "stack",
        stack: ["timer callback"],
        tasks: [],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "A little order in all the async.",
        description:
          "The timer logs its message and the stack clears. Hello, World, Promise, Timer: synchronous code, then microtasks, then the next task.",
        line: 4,
        stack: [],
        logs: ["Hello", "World", "Promise", "Timer"],
      },
    ]),
  },
  {
    id: "microtasks",
    tab: "Micro vs. macro",
    title: "Small tasks. First in line.",
    subtitle: "See why one microtask can lead to another.",
    filename: "queue-priorities.js",
    runtime: "browser",
    code: [
      "setTimeout(() => console.log('timer'), 0);",
      "",
      "Promise.resolve().then(() => {",
      "  console.log('promise');",
      "  queueMicrotask(() => console.log('nested'));",
      "});",
      "",
      "queueMicrotask(() => console.log('microtask'));",
      "console.log('sync');",
    ],
    insight:
      "A microtask checkpoint drains the whole queue, including new microtasks added along the way. Too many can starve tasks and rendering.",
    question: "Does the nested microtask jump the queue?",
    answer:
      "No. Microtasks are first-in, first-out. The nested callback is added after the existing microtask, so the output is sync, promise, microtask, nested, timer.",
    concepts: [
      {
        title: 'Tasks, not really "macrotasks"',
        description:
          "The HTML standard calls them tasks. Timers, user interactions, and other sources can queue them.",
      },
      {
        title: "A queue within a turn",
        description:
          "Promise reactions and queueMicrotask callbacks share the microtask queue, in scheduling order.",
      },
      {
        title: "Drain it completely",
        description:
          "New microtasks join the end of the queue. The checkpoint continues until there are none left.",
      },
    ],
    frames: frames([
      {
        title: "First, register a timer.",
        description:
          "The script starts and asks the browser to schedule a zero-delay timer. Its callback cannot interrupt this script.",
        line: 1,
        active: "apis",
        stack: ["script"],
        apis: ["timer: 0 ms"],
        transfer: { from: "stack", to: "apis" },
      },
      {
        title: "A task waits its turn.",
        description:
          "The ready timer callback enters the task queue. We show it ready early to make the priority difference visible.",
        active: "tasks",
        apis: [],
        tasks: ["timer callback"],
        transfer: { from: "apis", to: "tasks" },
      },
      {
        title: "Queue a promise reaction.",
        description:
          "The resolved promise schedules its .then() callback in the microtask queue.",
        line: 3,
        active: "microtasks",
        microtasks: ["promise callback"],
        transfer: { from: "stack", to: "microtasks" },
      },
      {
        title: "Same queue, another entrance.",
        description:
          "queueMicrotask explicitly adds a callback to the same FIFO queue used by promise reactions.",
        line: 8,
        active: "microtasks",
        microtasks: ["promise callback", "microtask callback"],
      },
      {
        title: "Synchronous still means first.",
        description:
          "The final synchronous log runs before any queued work. The script then returns.",
        line: 9,
        active: "stack",
        stack: [],
        logs: ["sync"],
      },
      {
        title: "Begin the microtask checkpoint.",
        description:
          "The first microtask is the promise callback. It moves onto the stack and logs promise.",
        line: 4,
        active: "stack",
        stack: ["promise callback"],
        microtasks: ["microtask callback"],
        logs: ["sync", "promise"],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "One microtask makes another.",
        description:
          "The promise callback queues a nested microtask. New microtasks join the back, behind the callback already waiting.",
        line: 5,
        active: "microtasks",
        microtasks: ["microtask callback", "nested callback"],
      },
      {
        title: "First in, first out.",
        description:
          "The promise callback returns. The explicitly queued microtask runs next and logs microtask.",
        line: 8,
        active: "stack",
        stack: ["microtask callback"],
        microtasks: ["nested callback"],
        logs: ["sync", "promise", "microtask"],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "New work belongs to this checkpoint.",
        description:
          "The nested callback runs before the checkpoint ends. The event loop does not move on while microtasks are still pending.",
        line: 5,
        active: "stack",
        stack: ["nested callback"],
        microtasks: [],
        logs: ["sync", "promise", "microtask", "nested"],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "Finally, the next task.",
        description:
          "All microtasks have returned. The timer task now takes the stack and logs timer.",
        line: 1,
        active: "stack",
        stack: ["timer callback"],
        tasks: [],
        logs: ["sync", "promise", "microtask", "nested", "timer"],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "Empty queue. Clear head.",
        description:
          "Everything finishes. This is why recursive microtasks can delay timers and rendering: the runtime must finish the checkpoint first.",
        stack: [],
      },
    ]),
  },
  {
    id: "async",
    tab: "Async / await",
    title: "Pause a function. Not the world.",
    subtitle: "Discover what really happens at an await.",
    filename: "await-a-moment.js",
    runtime: "browser",
    code: [
      "console.log('start');",
      "",
      "async function getData() {",
      "  console.log('fetching');",
      "  await Promise.resolve('ready');",
      "  console.log('received');",
      "}",
      "",
      "getData();",
      "console.log('end');",
    ],
    insight:
      "An async function runs synchronously until its first await. Resuming after await is asynchronous, even for an already-fulfilled promise.",
    question: 'Does "received" appear before "end"?',
    answer:
      "No. await suspends getData, not the script. The script logs end first; getData resumes as a microtask and then logs received.",
    concepts: [
      {
        title: "Async starts synchronously",
        description:
          "Calling an async function puts it on the normal call stack. The async keyword does not create a thread.",
      },
      {
        title: "Await is a handoff",
        description:
          "The function suspends at await and returns control to its caller. Other synchronous code can continue.",
      },
      {
        title: "A promise brings it back",
        description:
          "When the awaited promise settles, the continuation is scheduled through promise microtask machinery.",
      },
    ],
    frames: frames([
      {
        title: "Start on familiar ground.",
        description: "The script starts synchronously and logs start.",
        line: 1,
        active: "stack",
        stack: ["script", 'log("start")'],
        logs: ["start"],
      },
      {
        title: "Async does not mean off-thread.",
        description:
          "Calling getData pushes its frame onto the same JavaScript stack. An async function runs normally until it reaches await.",
        line: 9,
        active: "stack",
        stack: ["script", "getData()"],
      },
      {
        title: "The first half runs right now.",
        description:
          "Inside getData, the first log runs synchronously. No scheduling boundary has been reached yet.",
        line: 4,
        active: "stack",
        logs: ["start", "fetching"],
      },
      {
        title: "Await hands control back.",
        description:
          "The promise is already fulfilled, but await still suspends getData. Its continuation is queued as a microtask and the caller regains control.",
        line: 5,
        active: "microtasks",
        stack: ["script"],
        microtasks: ["resume getData()"],
        transfer: { from: "stack", to: "microtasks" },
      },
      {
        title: "The world keeps moving.",
        description:
          "The outer script carries on without waiting for getData to resume. It logs end.",
        line: 10,
        active: "stack",
        stack: ["script", 'log("end")'],
        logs: ["start", "fetching", "end"],
      },
      {
        title: "Make room for the continuation.",
        description:
          "The script returns and the stack empties. The microtask checkpoint can now process the async continuation.",
        stack: [],
      },
      {
        title: "Pick up where we left off.",
        description:
          "getData resumes after the await. Its continuation is now running on the call stack, not in a background thread.",
        line: 6,
        active: "stack",
        stack: ["getData() resumed"],
        microtasks: [],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "Received, a little later.",
        description:
          "The resumed function logs received and returns, fulfilling the promise returned by getData.",
        line: 6,
        active: "stack",
        logs: ["start", "fetching", "end", "received"],
      },
      {
        title: "A pause, not a blockade.",
        description:
          "The stack clears. Async/await is structured promise-based control flow: synchronous before await, asynchronous after it.",
        stack: [],
      },
    ]),
  },
  {
    id: "events",
    tab: "Browser events",
    title: "A click has a journey, too.",
    subtitle: "Follow a user interaction from the browser to your code.",
    filename: "click-to-connect.js",
    runtime: "browser",
    code: [
      "button.addEventListener('click', () => {",
      "  console.log('click');",
      "  queueMicrotask(() => console.log('update'));",
      "});",
      "",
      "console.log('listening');",
      "// Then, a user clicks the button.",
    ],
    insight:
      "A user click is handled as a task. Microtasks scheduled by its handler run before the browser proceeds to a later task or rendering opportunity.",
    question: "Can a click interrupt running JavaScript?",
    answer:
      "Not on the same thread. A user interaction queues work, but the handler has to wait for the current task and its microtasks to finish.",
    concepts: [
      {
        title: "The browser is listening",
        description:
          "addEventListener registers a handler. Registration itself does not execute that handler.",
      },
      {
        title: "Interactions become tasks",
        description:
          "A real user click is delivered through the user-interaction task source when the thread can process it.",
      },
      {
        title: "Updates before the next turn",
        description:
          "Microtasks finish at checkpoints. Rendering may happen afterward when the browser has a rendering opportunity.",
      },
    ],
    frames: frames([
      {
        title: "Set up a listener.",
        description:
          "The script registers a click handler with the browser. In this example, button refers to an existing DOM button.",
        line: 1,
        active: "apis",
        stack: ["script", "addEventListener()"],
        apis: ["click listener"],
        transfer: { from: "stack", to: "apis" },
      },
      {
        title: "Registration is not execution.",
        description:
          "The click handler has not run. The script simply logs listening and continues.",
        line: 6,
        active: "stack",
        stack: ["script"],
        logs: ["listening"],
      },
      {
        title: "Ready when you are.",
        description:
          "The script finishes. The registered listener remains in the browser, waiting for an interaction.",
        stack: [],
      },
      {
        title: "Let's simulate a real click.",
        description:
          "Our teaching simulation now introduces a user click. The browser queues an event-dispatch task; no JavaScript handler has run yet.",
        line: 7,
        active: "tasks",
        tasks: ["click event"],
        transfer: { from: "apis", to: "tasks" },
      },
      {
        title: "Your handler gets the stack.",
        description:
          "The event loop selects the interaction task. Event dispatch invokes the registered callback, which logs click.",
        line: 2,
        active: "stack",
        stack: ["click handler"],
        tasks: [],
        logs: ["listening", "click"],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "A tiny follow-up.",
        description:
          "The handler queues a microtask for an update. It will run at the following checkpoint, not immediately inside queueMicrotask.",
        line: 3,
        active: "microtasks",
        microtasks: ["update callback"],
        transfer: { from: "stack", to: "microtasks" },
      },
      {
        title: "The handler returns.",
        description:
          "After event handling returns and the JavaScript stack clears, pending microtasks can run.",
        stack: [],
      },
      {
        title: "Finish the update.",
        description:
          "The update microtask moves onto the stack and logs update, before a subsequent task or rendering opportunity.",
        line: 3,
        active: "stack",
        stack: ["update callback"],
        microtasks: [],
        logs: ["listening", "click", "update"],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "Back to listening.",
        description:
          "The work is complete, but the listener stays registered. The browser can render when appropriate and wait for the next interaction.",
        stack: [],
      },
    ]),
  },
  {
    id: "node",
    tab: "Node.js / libuv",
    title: "Same language. Different engine room.",
    subtitle: "Follow an I/O callback through Node's event-loop phases.",
    filename: "inside-the-loop.mjs",
    runtime: "node",
    code: [
      "import { readFile } from 'node:fs';",
      "",
      "readFile('notes.txt', () => {",
      "  console.log('file ready');",
      "  setTimeout(() => console.log('timer'), 0);",
      "  setImmediate(() => console.log('immediate'));",
      "  process.nextTick(() => console.log('next tick'));",
      "});",
    ],
    insight:
      "Inside an I/O callback, setImmediate runs in the check phase before the timer. At top level, that relative order is not guaranteed.",
    question: "Is process.nextTick a libuv phase?",
    answer:
      "No. Node processes the nextTick queue at callback boundaries, before promise microtasks. Here it runs before the check-phase setImmediate callback and the timer.",
    concepts: [
      {
        title: "More than a single queue",
        description:
          "libuv coordinates timers, I/O polling, check callbacks, and other phases. This view groups phase callbacks for clarity.",
      },
      {
        title: "Not all I/O uses a thread",
        description:
          "File operations typically use the libuv worker pool; network I/O usually uses operating-system readiness notifications.",
      },
      {
        title: "Next tick is a special case",
        description:
          "The nextTick queue is separate from promise microtasks and is not an event-loop phase. Recursive nextTicks can starve I/O.",
      },
    ],
    frames: frames([
      {
        title: "Hand file work to the host.",
        description:
          "readFile requests asynchronous file I/O through Node. File-system work typically uses libuv's worker pool rather than the JavaScript thread.",
        line: 3,
        active: "apis",
        stack: ["module", "readFile()"],
        apis: ["read notes.txt"],
        transfer: { from: "stack", to: "apis" },
      },
      {
        title: "JavaScript is free to continue.",
        description:
          "The top-level module returns while the file operation proceeds. The main JavaScript thread is not blocked waiting for the file.",
        stack: [],
      },
      {
        title: "I/O completion is ready.",
        description:
          "The completed read makes its callback available to the poll phase. Phase callbacks are grouped in this simplified visual queue.",
        active: "tasks",
        apis: [],
        tasks: ["poll: file callback"],
        transfer: { from: "apis", to: "tasks" },
      },
      {
        title: "Inside the poll callback.",
        description:
          "Node invokes the file callback, which logs file ready. This I/O-callback context is important for the ordering that follows.",
        line: 4,
        active: "stack",
        stack: ["file callback"],
        tasks: [],
        logs: ["file ready"],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "Register a timer.",
        description:
          "setTimeout schedules a timer for a future timers pass. In Node, delays below 1 millisecond are normalized to 1 millisecond.",
        line: 5,
        active: "apis",
        apis: ["timer: 1 ms"],
        transfer: { from: "stack", to: "apis" },
      },
      {
        title: "Schedule the check phase.",
        description:
          "setImmediate queues a callback for the check phase, which follows poll. It does not run in the current callback.",
        line: 6,
        active: "tasks",
        tasks: ["check: immediate"],
        transfer: { from: "stack", to: "tasks" },
      },
      {
        title: "Next tick has a separate queue.",
        description:
          "process.nextTick queues a Node-specific callback. This is not a promise microtask and not a libuv phase.",
        line: 7,
        active: "microtasks",
        microtasks: ["nextTick callback"],
        transfer: { from: "stack", to: "microtasks" },
      },
      {
        title: "The I/O callback returns.",
        description:
          "At this callback boundary, Node drains nextTick callbacks before promise microtasks and before advancing to the next libuv phase.",
        stack: [],
      },
      {
        title: "Next tick means before moving on.",
        description:
          "The nextTick callback logs next tick. It executes on the main JavaScript stack just like any other callback.",
        line: 7,
        active: "stack",
        stack: ["nextTick callback"],
        microtasks: [],
        logs: ["file ready", "next tick"],
        transfer: { from: "microtasks", to: "stack" },
      },
      {
        title: "Check comes after poll.",
        description:
          "After the nextTick callback returns, the check phase runs setImmediate. Scheduling from inside I/O gives it priority over the timer here.",
        line: 6,
        active: "stack",
        stack: ["immediate callback"],
        tasks: [],
        logs: ["file ready", "next tick", "immediate"],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "The timer becomes eligible.",
        description:
          "The immediate callback returns. Once its threshold is reached, the timer is eligible for a timers pass. This view groups it with phase callbacks.",
        active: "tasks",
        stack: [],
        apis: [],
        tasks: ["timers: callback"],
        transfer: { from: "apis", to: "tasks" },
      },
      {
        title: "And finally, the timer.",
        description:
          "The timers pass invokes the callback and logs timer. This ordering is specific to scheduling inside the I/O callback in this example.",
        line: 5,
        active: "stack",
        stack: ["timer callback"],
        tasks: [],
        logs: ["file ready", "next tick", "immediate", "timer"],
        transfer: { from: "tasks", to: "stack" },
      },
      {
        title: "An engine room with a rhythm.",
        description:
          "All scheduled work is finished. Node can exit when no referenced handles or requests remain. Real programs repeat these phases as more work arrives.",
        stack: [],
      },
    ]),
  },
];

export const zoneDetails: Record<
  ZoneId,
  { title: string; description: string; color: string }
> = {
  stack: {
    title: "Call stack",
    description:
      "The place where JavaScript actually runs. Function calls push a frame; returns pop it off. One frame executes at a time, last in, first out.",
    color: "#a5c88b",
  },
  apis: {
    title: "Web APIs",
    description:
      "The browser handles timers, network requests, and event listeners outside the JavaScript call stack. When work is ready, it schedules a callback.",
    color: "#c0b1dc",
  },
  microtasks: {
    title: "Microtask queue",
    description:
      "Promise reactions and queueMicrotask callbacks wait here. At a checkpoint, the entire queue drains in order, including newly added microtasks.",
    color: "#e5c67b",
  },
  tasks: {
    title: "Task queue",
    description:
      "Ready timer and event callbacks wait to become a task. The event loop selects another task after the current task and its microtask checkpoint finish.",
    color: "#a5c9df",
  },
};

export function getZoneDetails(zone: ZoneId, runtime: Scenario["runtime"]) {
  if (runtime === "node") {
    if (zone === "apis")
      return {
        ...zoneDetails.apis,
        title: "libuv / OS",
        description:
          "Node delegates I/O to libuv and the operating system. File operations usually use the worker pool; network operations generally use OS readiness notifications.",
      };
    if (zone === "microtasks")
      return {
        ...zoneDetails.microtasks,
        title: "NextTick queue",
        description:
          "A Node-specific queue, separate from promise microtasks. At the I/O callback boundary shown here, Node drains it before promise microtasks and before the next libuv phase.",
      };
    if (zone === "tasks")
      return {
        ...zoneDetails.tasks,
        title: "Phase callbacks",
        description:
          "A simplified view of callbacks from distinct libuv phases. Poll handles I/O, check runs setImmediate, and timers handles eligible setTimeout callbacks. This is not one FIFO queue.",
      };
  }
  return zoneDetails[zone];
}
