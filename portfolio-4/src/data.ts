export const milestones = [
  {
    year: "2019",
    role: "Junior Developer",
    company: "Studio North",
    period: "2019 - 2020",
    label: "The first commit.",
    description:
      "Turned a lifelong curiosity for how things work into a career building for the web. A small studio, a big learning curve, and a lot of late-night lightbulb moments.",
    highlights: [
      "Built accessible, responsive websites for 12 independent brands.",
      "Found my footing in JavaScript, React, and collaborative development.",
    ],
    stack: ["JavaScript", "React", "CSS", "Git"],
    color: "#00c8ff",
  },
  {
    year: "2020",
    role: "Software Engineer",
    company: "Orbit Digital",
    period: "2020 - 2022",
    label: "Connecting the dots.",
    description:
      "Moved beyond the interface and into the whole system. Built product experiences from database to browser, working closely with designers and a wonderfully ambitious team.",
    highlights: [
      "Shipped a full-stack collaboration platform used by 8,000+ people.",
      "Introduced TypeScript and a shared component library across three products.",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    color: "#00e3ef",
  },
  {
    year: "2022",
    role: "Senior Engineer",
    company: "Nova Labs",
    period: "2022 - 2024",
    label: "Thinking in systems.",
    description:
      "Bigger problems. More interesting possibilities. Led the technical direction of a real-time analytics product while helping a growing engineering team do its best work.",
    highlights: [
      "Redesigned the data pipeline to process 2M+ events per day.",
      "Cut deployment time by 70% and mentored four early-career engineers.",
    ],
    stack: ["System design", "Node.js", "AWS", "CI/CD"],
    color: "#56f3a0",
  },
  {
    year: "2024",
    role: "Lead Engineer",
    company: "Vertex Studio",
    period: "2024 - PRESENT",
    label: "Building what comes next.",
    description:
      "Bringing thoughtful engineering and creative ambition together. Today, I lead a small team building expressive, high-performance digital products at the intersection of design and technology.",
    highlights: [
      "Lead architecture and delivery for a six-person product team.",
      "Explore spatial interfaces, creative coding, and a more human web.",
    ],
    stack: ["Three.js", "React", "System design", "Leadership"],
    color: "#b7ee44",
  },
];

export type Milestone = (typeof milestones)[number];
export type SkillName =
  "React" | "TypeScript" | "Node.js" | "System design" | "Three.js" | "CI/CD";

export const skills: {
  name: SkillName;
  category: string;
  description: string;
  tools: string;
  color: string;
}[] = [
  {
    name: "React",
    category: "Frontend",
    description: "Interfaces that feel effortless. Components built to last.",
    tools: "Next.js / React Query / Zustand",
    color: "#00dcf0",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description:
      "A little more intention. A lot fewer surprises in production.",
    tools: "Type safety / Zod / Shared contracts",
    color: "#00c8ef",
  },
  {
    name: "Three.js",
    category: "Frontend",
    description: "Making the browser a canvas for something unexpected.",
    tools: "WebGL / GLSL / React Three Fiber",
    color: "#b7ee44",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Fast, reliable services that quietly do the heavy lifting.",
    tools: "REST & GraphQL / PostgreSQL / Redis",
    color: "#9ee648",
  },
  {
    name: "System design",
    category: "Backend",
    description:
      "Seeing the whole picture. Keeping the important parts simple.",
    tools: "Event-driven / Distributed systems",
    color: "#71ed77",
  },
  {
    name: "CI/CD",
    category: "Infrastructure",
    description: "From a good idea to a great release, without the friction.",
    tools: "GitHub Actions / Docker / AWS",
    color: "#b7ee44",
  },
];

export const projects = [
  {
    name: "Nexus",
    category: "DEVELOPER EXPERIENCE",
    number: "01",
    description:
      "A calmer command center for your entire development workflow.",
    longDescription:
      "Nexus connects deployments, pull requests, and service health in one focused workspace. Built for small engineering teams who want less context switching and more time to make things.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    color: "#00dfef",
    className: "nexus",
    results: [
      "A unified view of 12 connected development services.",
      "Real-time deployment updates with server-sent events.",
      "Keyboard-first navigation and a fully accessible component system.",
    ],
  },
  {
    name: "Pulse",
    category: "REAL-TIME ANALYTICS",
    number: "02",
    description:
      "Turning millions of events into a story you can actually use.",
    longDescription:
      "An analytics platform that makes complex product data feel approachable. Pulse combines a high-throughput event pipeline with a fast, thoughtfully designed dashboard for product teams.",
    stack: ["React", "Node.js", "Redis"],
    color: "#a394ff",
    className: "pulse",
    results: [
      "Processes more than two million events per day.",
      "Interactive charts with sub-second filtering.",
      "A scalable, event-driven architecture with live data streaming.",
    ],
  },
  {
    name: "Form & Field",
    category: "CREATIVE DEVELOPMENT",
    number: "03",
    description:
      "An immersive digital home for a different kind of design studio.",
    longDescription:
      "An editorial portfolio that lets the work breathe. Custom WebGL compositions and carefully considered transitions bring a landscape architecture studio's projects to life without getting in the way.",
    stack: ["Three.js", "React", "GSAP"],
    color: "#b7ee44",
    className: "form-field",
    results: [
      "Custom real-time WebGL landscape with adaptive quality.",
      "A 98 Lighthouse performance score on the production build.",
      "Responsive, reduced-motion-friendly interactions throughout.",
    ],
  },
];

export type Project = (typeof projects)[number];
