export const careers = [
  {
    year: "2021",
    role: "Web Developer",
    chapter: "The foundation",
    note: "Where it all started.",
    description:
      "The first chapter: building for the web with WordPress, PHP, and JavaScript. Turning curiosity into working websites, one line at a time.",
    technologies: ["WordPress", "PHP", "JavaScript"],
    position: [0.12, 0.81],
    mobilePosition: [0.12, 0.87],
  },
  {
    year: "2022",
    role: "Frontend Developer",
    chapter: "A new dimension",
    note: "Crafting commerce experiences.",
    description:
      "A move into frontend development with Magento. Bringing together code and customer experience in the world of e-commerce.",
    technologies: ["Magento"],
    position: [0.365, 0.635],
    mobilePosition: [0.37, 0.715],
  },
  {
    year: "2023",
    role: "Frontend Developer",
    chapter: "Connecting the dots",
    note: "Beyond the interface.",
    description:
      "Expanding the toolkit with Angular and Node.js. Connecting frontend interfaces with the backend, and seeing the bigger picture.",
    technologies: ["Angular", "Node.js"],
    position: [0.615, 0.485],
    mobilePosition: [0.59, 0.555],
  },
  {
    year: "2025",
    role: "Lead Node.js Developer",
    chapter: "Building what’s next",
    note: "New challenges. Greater impact.",
    description:
      "Stepping into a lead Node.js developer role. Working with Nest.js and Hyperledger Fabric to build the next chapter in backend development.",
    technologies: ["Nest.js", "Hyperledger Fabric"],
    position: [0.84, 0.215],
    mobilePosition: [0.81, 0.37],
  },
];

export const technologies = [
  {
    name: "WordPress",
    icon: "wordpress",
    note: "The first building blocks.",
    color: "#32cce8",
    position: [0.225, 0.58],
    origin: [0.195, 0.765],
    career: 0,
  },
  {
    name: "PHP / JavaScript",
    icon: "code",
    note: "Making the web come alive.",
    color: "#f6cb73",
    position: [0.385, 0.415],
    origin: [0.43, 0.62],
    career: 0,
  },
  {
    name: "Magento",
    icon: "magento",
    note: "Commerce, thoughtfully built.",
    color: "#ed9474",
    position: [0.405, 0.815],
    origin: [0.46, 0.61],
    career: 1,
  },
  {
    name: "Angular",
    icon: "angular",
    note: "Interfaces with intention.",
    color: "#de82a8",
    position: [0.555, 0.345],
    origin: [0.595, 0.495],
    career: 2,
  },
  {
    name: "Node.js",
    icon: "node",
    note: "A world beyond the browser.",
    color: "#a8ed7b",
    position: [0.7, 0.635],
    origin: [0.695, 0.432],
    career: 2,
  },
  {
    name: "Nest.js",
    icon: "nest",
    note: "Architecture that scales.",
    color: "#36e2d6",
    position: [0.725, 0.26],
    origin: [0.793, 0.345],
    career: 3,
  },
  {
    name: "Hyperledger Fabric",
    icon: "fabric",
    note: "Engineering a connected future.",
    color: "#b1ccec",
    position: [0.855, 0.455],
    origin: [0.838, 0.277],
    career: 3,
  },
];

export const icons = {
  wordpress: '<span class="letter-icon wp-icon">W</span>',
  code: '<span class="letter-icon">JS</span>',
  magento:
    '<svg viewBox="0 0 32 34"><path d="m16 2 12 7v15l-5 3V12l-7-4-7 4v15l-5-3V9Z"/><path d="M13 13v16l3 2 3-2V13"/></svg>',
  angular:
    '<svg viewBox="0 0 32 34"><path d="m16 2 13 5-2 19-11 6L5 26 3 7Z"/><path d="m9 25 7-17 7 17M12 19h8"/></svg>',
  node: '<svg viewBox="0 0 32 34"><path d="m16 2 13 7v16l-13 7-13-7V9Z"/><path d="M13 12v10c0 4-6 3-6 0m17-8c-1-3-8-3-8 1s8 2 8 6-7 4-8 1"/></svg>',
  nest: '<svg viewBox="0 0 32 34"><path d="m16 3 13 7-13 7L3 10Zm-12 14 12 7 12-7M4 24l12 7 12-7"/></svg>',
  fabric:
    '<svg viewBox="0 0 32 34"><path d="m16 3 12 7v14l-12 7L4 24V10Zm0 0v14m12-7-12 7-12-7m12 7v14"/><path d="m10 7 12 7v7l-6 4-6-4V14l12-7" opacity=".55"/></svg>',
};
