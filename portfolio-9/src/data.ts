export interface Career {
  year: string;
  role: string;
  shortRole: string;
  chapter: string;
  description: string;
  summary: string;
  skills: string[];
  color: string;
  position: [number, number];
}

export const mobileCareerPositions: [number, number][] = [
  [0.14, 0.854],
  [0.405, 0.761],
  [0.67, 0.664],
  [0.846, 0.55],
];

export const careers: Career[] = [
  {
    year: "2021",
    role: "Web Developer",
    shortRole: "Web Developer",
    chapter: "The foundations",
    description:
      "Where the journey began. Bringing ideas to life on the web with WordPress, PHP, and JavaScript — one website, one challenge, one new possibility at a time.",
    summary: "A first line of code.\nA world of possibilities.",
    skills: ["WordPress", "PHP", "JavaScript"],
    color: "#00e5ff",
    position: [0.108, 0.832],
  },
  {
    year: "2022",
    role: "Frontend Developer",
    shortRole: "Frontend Developer",
    chapter: "Building experiences",
    description:
      "Moving deeper into frontend development. Working with Magento to connect thoughtful interfaces with the complexity of commerce, and turn browsing into an experience.",
    summary: "Crafting interfaces.\nConnecting commerce.",
    skills: ["Magento"],
    color: "#03f6e2",
    position: [0.372, 0.669],
  },
  {
    year: "2023",
    role: "Frontend Developer",
    shortRole: "Frontend Developer",
    chapter: "Expanding the horizon",
    description:
      "Connecting the frontend to what powers it. Building with Angular and Node.js, bringing a broader perspective to applications and the systems behind them.",
    summary: "Beyond the interface.\nInto the bigger picture.",
    skills: ["Angular", "Node.js"],
    color: "#36ffcc",
    position: [0.608, 0.548],
  },
  {
    year: "2025",
    role: "Lead Node.js Developer",
    shortRole: "Lead Node.js Developer",
    chapter: "Building what’s next",
    description:
      "A new chapter in technical leadership. Working with NestJS and Hyperledger Fabric to build backend services and explore the possibilities of distributed systems.",
    summary: "Leading with purpose.\nBuilding what’s next.",
    skills: ["NestJS", "Hyperledger Fabric"],
    color: "#ffce72",
    position: [0.883, 0.225],
  },
];

export interface Technology {
  id: string;
  name: string;
  caption: string;
  description: string;
  icon: string;
  stage: number;
  color: string;
  position: [number, number];
  branch: [number, number][];
}

export const technologies: Technology[] = [
  {
    id: "wordpress",
    name: "WordPress & PHP",
    caption: "Where ideas became\nwebsites.",
    description:
      "The foundation of my web development journey: creating websites with WordPress, extending them with PHP, and learning how the web works from the inside out.",
    icon: "wordpress",
    stage: 0,
    color: "#04d5ef",
    position: [0.285, 0.543],
    branch: [
      [0.208, 0.775],
      [0.31, 0.713],
      [0.31, 0.648],
      [0.285, 0.618],
      [0.285, 0.573],
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    caption: "A more interactive\nweb.",
    description:
      "Adding interaction and possibility to the web. JavaScript became the common thread from my first websites to the applications and backend services that followed.",
    icon: "javascript",
    stage: 0,
    color: "#efcc62",
    position: [0.411, 0.438],
    branch: [
      [0.436, 0.66],
      [0.464, 0.628],
      [0.464, 0.574],
      [0.411, 0.531],
      [0.411, 0.468],
    ],
  },
  {
    id: "magento",
    name: "Magento",
    caption: "Thoughtful storefronts.\nReal-world commerce.",
    description:
      "A focus on commerce and the customer experience. Working with Magento brought together frontend development, storefront interfaces, and the practical needs of online shopping.",
    icon: "magento",
    stage: 1,
    color: "#00dcea",
    position: [0.397, 0.818],
    branch: [
      [0.372, 0.674],
      [0.372, 0.73],
      [0.339, 0.768],
      [0.339, 0.818],
      [0.375, 0.84],
    ],
  },
  {
    id: "angular",
    name: "Angular",
    caption: "Bringing structure\nto the frontend.",
    description:
      "Building application interfaces with Angular. A move toward component-driven development, connected experiences, and a more structured approach to frontend architecture.",
    icon: "angular",
    stage: 2,
    color: "#a0f278",
    position: [0.557, 0.342],
    branch: [
      [0.608, 0.542],
      [0.608, 0.486],
      [0.589, 0.46],
      [0.589, 0.415],
      [0.557, 0.388],
      [0.557, 0.371],
    ],
  },
  {
    id: "node",
    name: "Node.js",
    caption: "Beyond the browser.\nBehind the experience.",
    description:
      "Taking JavaScript beyond the browser. Node.js connected my frontend experience with backend development and became the focus of the next chapter in my career.",
    icon: "node",
    stage: 2,
    color: "#50edab",
    position: [0.683, 0.7],
    branch: [
      [0.658, 0.522],
      [0.69, 0.558],
      [0.735, 0.598],
      [0.735, 0.651],
      [0.683, 0.695],
    ],
  },
  {
    id: "nestjs",
    name: "NestJS",
    caption: "A foundation for\nscalable systems.",
    description:
      "Building backend services with NestJS and Node.js. Bringing structure to server-side development through modular architecture and a framework designed for growing applications.",
    icon: "nest",
    stage: 3,
    color: "#00dff2",
    position: [0.711, 0.319],
    branch: [
      [0.787, 0.395],
      [0.756, 0.407],
      [0.756, 0.38],
      [0.711, 0.368],
      [0.711, 0.345],
    ],
  },
  {
    id: "hyperledger",
    name: "Hyperledger Fabric",
    caption: "New connections.\nDistributed possibilities.",
    description:
      "Exploring distributed systems with Hyperledger Fabric. Working with permissioned blockchain technology as part of a new chapter in backend development and technical leadership.",
    icon: "fabric",
    stage: 3,
    color: "#61ebaa",
    position: [0.82, 0.543],
    branch: [
      [0.802, 0.382],
      [0.802, 0.454],
      [0.82, 0.483],
      [0.82, 0.514],
    ],
  },
];
