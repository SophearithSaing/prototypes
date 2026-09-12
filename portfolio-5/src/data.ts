export interface BoardItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  color: string;
  position: [number, number];
  year?: string;
  lines?: string[];
}

export const milestones: BoardItem[] = [
  {
    id: "2019",
    year: "2019",
    title: "Junior Developer",
    lines: ["Junior", "Developer"],
    eyebrow: "01 / The first connection",
    description:
      "Where curiosity became a career. Turning designs into interfaces, asking better questions, and discovering the joy of shipping something real.",
    tags: ["Frontend", "React", "Learning by building"],
    color: "#00e5ed",
    position: [-4.7, 0.05],
  },
  {
    id: "2020",
    year: "2020",
    title: "Software Engineer",
    lines: ["Software", "Engineer"],
    eyebrow: "02 / Finding my footing",
    description:
      "Connecting the frontend to the bigger picture. Building reliable, type-safe applications and taking ideas all the way from a sketch to production.",
    tags: ["TypeScript", "Full stack", "Product thinking"],
    color: "#20f0e9",
    position: [-1.55, 0.8],
  },
  {
    id: "2022",
    year: "2022",
    title: "Senior Engineer",
    lines: ["Senior", "Engineer"],
    eyebrow: "03 / Seeing the system",
    description:
      "From individual features to connected systems. Designing services that scale, mentoring a growing team, and making complex problems feel simple.",
    tags: ["Node.js", "System design", "Mentorship"],
    color: "#a0ed59",
    position: [1.9, 1.35],
  },
  {
    id: "2024",
    year: "2024",
    title: "Lead Engineer",
    lines: ["Lead", "Engineer"],
    eyebrow: "04 / Building what’s next",
    description:
      "Bringing people, platforms, and possibilities together. Leading with curiosity and crafting ambitious digital experiences with a team that cares.",
    tags: ["Technical leadership", "Creative development", "CI/CD"],
    color: "#b2f267",
    position: [5.7, 1.75],
  },
];

export const skills: BoardItem[] = [
  {
    id: "react",
    title: "React",
    eyebrow: "Toolkit / Interfaces",
    description:
      "Thoughtful, component-driven interfaces. Bringing together accessible interactions, predictable state, and the little details that make a product feel right.",
    tags: ["React", "Next.js", "Accessibility"],
    color: "#00dce7",
    position: [-4.05, -2.15],
  },
  {
    id: "typescript",
    title: "TypeScript",
    eyebrow: "Toolkit / Reliability",
    description:
      "A little more intention, a lot more confidence. Using expressive types to make large codebases easier to navigate, collaborate on, and evolve.",
    tags: ["Type safety", "Developer experience", "Architecture"],
    color: "#22d8de",
    position: [-1.55, -2.7],
  },
  {
    id: "node",
    title: "Node.js",
    eyebrow: "Toolkit / Backends",
    description:
      "The engine behind the interface. Building efficient APIs, event-driven services, and dependable integrations that keep everything connected.",
    tags: ["APIs", "Event-driven systems", "PostgreSQL"],
    color: "#8be652",
    position: [1.9, -2.15],
  },
  {
    id: "system",
    title: "System Design",
    eyebrow: "Toolkit / The bigger picture",
    description:
      "Designing for the next chapter. Finding the right balance between simplicity, resilience, and scale — with clear boundaries and room to grow.",
    tags: ["Distributed systems", "Scalability", "Observability"],
    color: "#13dbe1",
    position: [0.4, -4.35],
  },
  {
    id: "three",
    title: "Three.js",
    eyebrow: "Toolkit / A new dimension",
    description:
      "Making the browser a little more unexpected. Creating real-time 3D experiences with expressive materials, light, motion, and playful interaction.",
    tags: ["WebGL", "Creative coding", "Interaction"],
    color: "#6ae7ab",
    position: [5.45, -0.7],
  },
  {
    id: "cicd",
    title: "CI/CD",
    eyebrow: "Toolkit / From idea to production",
    description:
      "Making great work easier to ship. Thoughtful automation, trustworthy checks, and repeatable deployments that let a team move with confidence.",
    tags: ["GitHub Actions", "Docker", "Delivery"],
    color: "#9bec5a",
    position: [5.3, -2.9],
  },
];

export const boardItems = [...milestones, ...skills];
