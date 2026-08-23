export type Position3D = readonly [number, number, number]

export type Milestone = {
  id: string
  year: string
  role: string
  company: string
  summary: string
  position: Position3D
  current?: boolean
}

export type Skill = {
  id: string
  name: string
  mark: string
  category: 'frontend' | 'backend' | 'platform'
  level: string
  summary: string
  milestoneId: Milestone['id']
  position: Position3D
}

export type ResumeItem = Milestone | Skill

export const profile = {
  initials: 'AR',
  name: 'Alex Rivera',
  title: 'Software Engineer',
  eyebrow: 'Three.js powered resume',
  headlinePrefix: 'My',
  headlineLead: 'career.',
  headlineAccent: 'Visualized.',
  introduction:
    'An interactive 3D map of my journey, skills, and growth - built with code and designed for exploration.',
  email: 'hello@alexrivera.dev',
  resumeUrl: '#resume',
} as const

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

export const milestones: Milestone[] = [
  {
    id: 'junior',
    year: '2019',
    role: 'Junior Developer',
    company: 'Northstar Studio',
    summary: 'Built accessible interfaces and learned to ship dependable product work.',
    position: [-4.9, -1.15, 0.56],
  },
  {
    id: 'software',
    year: '2020',
    role: 'Software Engineer',
    company: 'Fieldwork Labs',
    summary: 'Owned full-stack features and introduced a typed frontend platform.',
    position: [-1.75, 0.05, 0.56],
  },
  {
    id: 'senior',
    year: '2022',
    role: 'Senior Engineer',
    company: 'Orbit Systems',
    summary: 'Led platform architecture and mentored engineers across product teams.',
    position: [1.45, 0.7, 0.56],
  },
  {
    id: 'lead',
    year: '2024',
    role: 'Lead Engineer',
    company: 'Signal Works',
    summary: 'Guides technical direction for resilient, high-impact web products.',
    position: [4.75, 1.62, 0.56],
    current: true,
  },
]

export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    mark: 'RE',
    category: 'frontend',
    level: 'Advanced',
    summary: 'Composable interfaces, accessibility, and modern application architecture.',
    milestoneId: 'junior',
    position: [-3.7, -2.65, 0.65],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    mark: 'TS',
    category: 'frontend',
    level: 'Advanced',
    summary: 'Strong domain models and safe APIs across frontend and backend systems.',
    milestoneId: 'software',
    position: [-1.05, -2.38, 0.65],
  },
  {
    id: 'system-design',
    name: 'System Design',
    mark: 'SD',
    category: 'platform',
    level: 'Advanced',
    summary: 'Scalable service boundaries, data flows, and pragmatic tradeoffs.',
    milestoneId: 'software',
    position: [1.15, -2.75, 0.65],
  },
  {
    id: 'node',
    name: 'Node.js',
    mark: 'JS',
    category: 'backend',
    level: 'Advanced',
    summary: 'Production APIs, asynchronous workflows, and service observability.',
    milestoneId: 'senior',
    position: [2.05, -1.35, 0.65],
  },
  {
    id: 'three',
    name: 'Three.js',
    mark: '3D',
    category: 'frontend',
    level: 'Proficient',
    summary: 'Interactive WebGL scenes, custom geometry, and expressive motion.',
    milestoneId: 'lead',
    position: [4.4, -0.1, 0.65],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    mark: 'CI',
    category: 'platform',
    level: 'Advanced',
    summary: 'Fast, observable delivery pipelines with reliable quality gates.',
    milestoneId: 'lead',
    position: [5.15, -1.75, 0.65],
  },
]

export const projects = [
  { name: 'Atlas Platform', href: '#project-atlas' },
  { name: 'Signal Console', href: '#project-signal' },
] as const

export const githubPulse = {
  profileUrl: 'https://github.com/alexrivera?tab=overview',
  handle: '@alexrivera',
  totalContributions: 842,
  currentStreak: 18,
  activity: [0, 2, 4, 1, 0, 3, 6, 2, 1, 5, 3, 0, 4, 7, 2, 5, 1, 3, 6, 4, 0, 2, 7, 5, 3, 1, 4, 6],
} as const

export function validateResumeData() {
  const milestoneIds = new Set(milestones.map(({ id }) => id))
  const itemIds = [...milestones, ...skills].map(({ id }) => id)
  const idsAreUnique = new Set(itemIds).size === itemIds.length
  const linksAreValid = skills.every(({ milestoneId }) => milestoneIds.has(milestoneId))

  if (!idsAreUnique || !linksAreValid || milestones.length === 0) {
    throw new Error('Resume data is incomplete or contains invalid relationships.')
  }
}
