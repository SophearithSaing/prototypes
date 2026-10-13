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
    id: "2021",
    year: "2021",
    title: "Web Developer",
    lines: ["Web", "Developer"],
    eyebrow: "01 / The first connection",
    description:
      "Building websites with PHP and JS. The start of my journey in web development.",
    tags: ["PHP", "JS"],
    color: "#00e5ed",
    position: [-4.7, 0.05],
  },
  {
    id: "2022",
    year: "2022",
    title: "Frontend Developer",
    lines: ["Frontend", "Developer"],
    eyebrow: "02 / Finding my footing",
    description:
      "Moving into frontend development with Magento, working on the interfaces behind e-commerce experiences.",
    tags: ["Magento"],
    color: "#20f0e9",
    position: [-1.55, 0.8],
  },
  {
    id: "2023",
    year: "2023",
    title: "Frontend Developer",
    lines: ["Frontend", "Developer"],
    eyebrow: "03 / Seeing the system",
    description:
      "Continuing in frontend development with Angular and Node, connecting application interfaces with backend services.",
    tags: ["Angular", "Node"],
    color: "#a0ed59",
    position: [1.9, 1.35],
  },
  {
    id: "2025",
    year: "2025",
    title: "Lead Node.js Developer",
    lines: ["Lead Node.js", "Developer"],
    eyebrow: "04 / Building what’s next",
    description:
      "Stepping into a Lead Node.js Developer role, working with Nest.js and Hyperleder Fabric.",
    tags: ["Nest.js", "Hyperleder Fabric"],
    color: "#b2f267",
    position: [5.7, 1.75],
  },
];

export const skills: BoardItem[] = [
  {
    id: "php",
    title: "PHP",
    eyebrow: "Toolkit / Server-side development",
    description:
      "Server-side web development with PHP, working alongside JS in my 2021 Web Developer role.",
    tags: ["2021", "Web Developer"],
    color: "#22d8de",
    position: [-5.7, -2.15],
  },
  {
    id: "js",
    title: "JS",
    eyebrow: "Toolkit / Web interactions",
    description:
      "Browser interactions with JS, part of the foundation of my web development work in 2021.",
    tags: ["2021", "Web Developer"],
    color: "#20e2df",
    position: [-3.7, -2.15],
  },
  {
    id: "magento",
    title: "Magento",
    eyebrow: "Toolkit / E-commerce",
    description:
      "Frontend development for Magento storefronts, the focus of my Frontend Developer role in 2022.",
    tags: ["2022", "Frontend Developer"],
    color: "#20f0e9",
    position: [-1.25, -2.7],
  },
  {
    id: "angular",
    title: "Angular",
    eyebrow: "Toolkit / Interfaces",
    description:
      "Application interfaces with Angular, part of my Frontend Developer toolkit in 2023 alongside Node.",
    tags: ["2023", "Frontend Developer"],
    color: "#a0ed59",
    position: [1.9, -1.5],
  },
  {
    id: "node",
    title: "Node",
    eyebrow: "Toolkit / Backends",
    description:
      "Server-side JavaScript with Node, connecting backend services to my frontend work in 2023.",
    tags: ["2023", "Frontend Developer"],
    color: "#8be652",
    position: [1.9, -3.7],
  },
  {
    id: "nest",
    title: "Nest.js",
    eyebrow: "Toolkit / Node.js applications",
    description:
      "Backend applications with Nest.js, part of my Lead Node.js Developer toolkit in 2025.",
    tags: ["2025", "Lead Node.js Developer"],
    color: "#6ae7ab",
    position: [5.3, -0.7],
  },
  {
    id: "hyperleder-fabric",
    title: "Hyperleder Fabric",
    lines: ["Hyperleder", "Fabric"],
    eyebrow: "Toolkit / Blockchain",
    description:
      "Working with Hyperleder Fabric alongside Nest.js in my Lead Node.js Developer role in 2025.",
    tags: ["2025", "Lead Node.js Developer"],
    color: "#9bec5a",
    position: [5.3, -3.0],
  },
];

export const boardItems = [...milestones, ...skills];
