// ============================================================
// Static Data Layer — Farid Hakim Portfolio
// ============================================================

export type ContentBlock =
  | { type: "text"; heading: string; body: string }
  | { type: "gallery"; layout: "two-square" | "portrait-single" | "featured-plus-two"; images: string[] };

export interface Project {
  slug: string;
  title: string;
  category: "Brand Identity" | "UI/UX Design" | "Print Design" | "Logo Design" | "Marketing Design" | string | string[];
  year: string;
  client: string;
  description: string;
  longDescription: string;
  tools: string[];
  coverImage: string;
  images: string[];
  featured: boolean;
  color: string; // accent color for the project card
  galleryLayout?: "square-grid";
  contentBlocks?: ContentBlock[];
  /** Overrides the "Client" label in the sidebar when provided. */
  programLabel?: string;
  /** When provided, replaces the Tools Used section with Backend/Frontend tech stacks. */
  techStack?: { backend: string[]; frontend: string[] };
  /** Live demo URL — shown as a button on the project detail page (Web Dev / Front-End projects). */
  liveDemo?: string;
  /** GitHub repository URL — shown as a button on the project detail page (Web Dev / Front-End projects). */
  githubRepo?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0–100
  }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  description: string;
  type: "education" | "experience";
}

// ============================================================
// PROJECTS
// ============================================================
export const projects: Project[] = [
  {
    slug: "tracker.io",
    title: "Expense Tracker Web",
    category: "Web Development",
    year: "2026",
    client: "Coding Camp 2026 2.0 Powered by DBS Foundation",
    description:
      "Designed the visual identity for SMB Fest Spectro 2024 by combining Indonesian cultural elements with storytelling to create a consistent and engaging event branding.",
    longDescription:
      "Tracker.io is a full-stack web application built to help people take control of their personal finances, tracking income and expenses in real time, organizing spending in a way that actually reflects their lifestyle, and turning raw numbers into visual patterns they can act on.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Canva"],
    coverImage: "/projects/gambarproject/TRACKERIO/Thumbnailtracker.webp",
    images: [
      "/projects/gambarproject/TRACKERIO/expansetrackerio1.webp",
      "/projects/gambarproject/TRACKERIO/expansetrackeriobaru2.webp",
      "/projects/gambarproject/TRACKERIO/expansetrackerio3.webp",
      "/projects/gambarproject/TRACKERIO/expansetrackeriobaru4.webp",
      "/projects/gambarproject/TRACKERIO/expansetrackerio5.webp",
      "/projects/gambarproject/TRACKERIO/expansetrackeriobaru6.webp",
    ],
    featured: true,
    color: "#0ea5e9", // Brand Identity (Sky-500)
    galleryLayout: "square-grid",
    programLabel: "Program",
    liveDemo: "https://tracker-io-three.vercel.app",
    githubRepo: "https://github.com/faridhkm19/Tracker.io.git",
    techStack: {
      backend: ["Node.js", "Express", "MySQL", "JWT", "bcrypt"],
      frontend: ["Vanilla Javascript", "HTML5", "CSS3", "Chart JS"],
    },
    contentBlocks: [
      {
        type: "text",
        heading: "About this project",
        body: "Tracker.io is a full-stack web application built to help people take control of their personal finances, tracking income and expenses in real time, organizing spending in a way that actually reflects their lifestyle, and turning raw numbers into visual patterns they can act on.",
      },
      {
        type: "gallery",
        layout: "two-square",
        images: [
          "/projects/gambarproject/TRACKERIO/expansetrackerio1.webp",
          "/projects/gambarproject/TRACKERIO/expansetrackeriobaru2.webp",
        ],
      },
      {
        type: "text",
        heading: "The Problem",
        body: "Managing personal finances is easy to plan but hard to sustain. Many people, students and young professionals especially, start out tracking their spending in a notebook or a spreadsheet, only to abandon it a few weeks in, or skip tracking altogether. Without a clear, ongoing record, it becomes difficult to see where money actually goes each month, let alone make informed decisions about saving or cutting back. Tracker.io was built to close that gap: a tool simple enough to use consistently, yet structured enough to turn scattered transactions into a clear picture of one's financial habits.",
      },
      {
        type: "gallery",
        layout: "portrait-single",
        images: [
          "/projects/gambarproject/TRACKERIO/expansetrackerio3.webp",
        ],
      },
      {
        type: "text",
        heading: "Key Features",
        body: "Tracker.io keeps every account private and secure through JWT-based authentication, ensuring one user's transactions and categories are never visible to another. Users can also define their own custom categories, rather than choosing from generic labels, so their records reflect how they actually spend. Finding a specific transaction is simple too, thanks to combined filters by date range, category, and keyword search. On top of that, an interactive dashboard visualizes the data through a category distribution chart and a monthly income-versus-expense trend, giving users a quick, at-a-glance read on their spending patterns over time.",
      },
      {
        type: "gallery",
        layout: "featured-plus-two",
        images: [
          "/projects/gambarproject/TRACKERIO/expansetrackeriobaru4.webp",
          "/projects/gambarproject/TRACKERIO/expansetrackerio5.webp",
          "/projects/gambarproject/TRACKERIO/expansetrackeriobaru6.webp",
        ],
      },
    ],
  },
  {
    slug: "smb-fest-spectro-2024",
    title: "SMB Fest Spectro 2024",
    category: "Brand Identity",
    year: "2024",
    client: "SMK Sumbangsih Multimedia",
    description:
      "Designed the visual identity for SMB Fest Spectro 2024 by combining Indonesian cultural elements with storytelling to create a consistent and engaging event branding.",
    longDescription:
      "SMB Fest Spectro 2024 is an annual creative festival organized by SMK Sumbangsih Multimedia. The event was built around the theme 'Exploring the Diversity of Wonderland Indonesia,' celebrating Indonesia's rich cultural heritage through a fictional storytelling approach. Inspired by the perspective of extraterrestrial explorers discovering the beauty of Indonesia, the visual identity was designed to spark curiosity, encourage exploration, and present cultural diversity in a fresh and engaging way. As part of the creative team, I contributed from the concept development stage through the execution of the visual identity. My responsibilities included brainstorming the event theme, developing the art direction, creating custom illustrations, and designing promotional materials across both print and digital platforms. By maintaining a consistent visual language throughout the campaign, the project demonstrates my approach to combining storytelling, branding, and illustration into a cohesive design system that communicates both information and experience.",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Canva"],
    coverImage: "/projects/gambarproject/SMBFest/thumbnail.webp",
    images: [
      "/projects/gambarproject/SMBFest/gambar1.webp",
      "/projects/gambarproject/SMBFest/gambar2.webp",
      "/projects/gambarproject/SMBFest/gambar3.webp",
      "/projects/gambarproject/SMBFest/gambar4.webp",
      "/projects/gambarproject/SMBFest/gambar5.webp",
      "/projects/gambarproject/SMBFest/gambar6.webp",
      "/projects/gambarproject/SMBFest/gambar7.webp",
    ],
    featured: true,
    color: "#0ea5e9", // Brand Identity (Sky-500)
    galleryLayout: "square-grid",
  },
  {
    slug: "ppdb-smk-sumbangsih",
    title: "PPDB SMK Sumbangsih",
    category: ["Marketing Design", "Print Design"],
    year: "2024",
    client: "SMK Sumbangsih Multimedia",
    description:
      "Designed a promotional campaign for SMK Sumbangsih Multimedia's student admission program, creating a consistent visual identity across print and digital media.",
    longDescription:
      "PPDB SMK Sumbangsih Multimedia is a promotional campaign created to support the school's student admission program for the 2024/2025 academic year. The project was designed to introduce SMK Sumbangsih Multimedia to prospective students and parents through a clear, attractive, and consistent visual identity across both digital and print media. The campaign included a wide range of promotional materials such as posters, brochures, roll banners, social media content, banners, and other supporting assets, ensuring that every communication delivered the same message and visual experience. The main objective was to present the school's programs, facilities, and learning environment in a way that was informative and visually engaging. To achieve this, I developed a clean and modern design style using a structured layout, bold typography, and a vibrant color palette that reflects the school's identity. Throughout the project, I focused on creating a consistent visual system that could easily adapt to different media while maintaining strong brand recognition.",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    coverImage: "/projects/gambarproject/PPDBsmb/PPDB Thumbnail.webp",
    images: [
      "/projects/gambarproject/PPDBsmb/PPDBSmb1.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb2.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb3.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb4.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb5.webp",
    ],
    featured: true,
    color: "#06b6d4", // Using existing color or you can adjust if preferred
    galleryLayout: "square-grid",
  },
  {
    slug: "sasil-hijab",
    title: "Sasil Hijab",
    category: "Logo Design",
    year: "2025",
    client: "Sasil Hijab",
    description:
      "Art direction and layout design for a quarterly sustainability-focused lifestyle magazine.",
    longDescription:
      "Verdure Magazine publishes quarterly content about sustainable living, design, and culture. I was responsible for art direction across two issues — establishing a editorial visual language that balances elegant typography with bold photography. Each spread was designed to feel distinct while maintaining cohesion across the publication.",
    tools: ["Adobe Ilustrator", "Figma"],
    coverImage: "/projects/gambarproject/SASILHijab/ThumbnailSasil.webp",
    images: [
      "/projects/gambarproject/SASILHijab/SasilHijab2.webp",
      "/projects/gambarproject/SASILHijab/SasilHijab3.webp",
      "/projects/gambarproject/SASILHijab/SasilHijab4.webp",
      "/projects/gambarproject/SASILHijab/SasilHijab5.webp"
    ],
    featured: false,
    color: "#0d9488", // Print Design (Teal-600)
    galleryLayout: "square-grid"
  },
  {
    slug: "burger-in",
    title: "Burger IN",
    category: "Logo Design",
    year: "2023",
    client: "Burger IN",
    description:
      "Character design and world-building illustration set for an indie mobile RPG game.",
    longDescription:
      "Kairos Games commissioned a set of 12 character illustrations and 6 environmental pieces for their upcoming mobile RPG. I developed a unique art style that blends Southeast Asian cultural motifs with contemporary fantasy aesthetics. Each character was designed with multiple expressions and action poses for in-game use.",
    tools: ["Adobe Ilustrator, Figma"],
    coverImage: "/projects/gambarproject/BURGERIN/ThumbnailBurgerIN.webp",
    images: [
      "/projects/gambarproject/BURGERIN/burgerin2.webp",
      "/projects/gambarproject/BURGERIN/burgerin3.webp",
      "/projects/gambarproject/BURGERIN/burgerin.webp",
      "/projects/gambarproject/BURGERIN/burgerin5.webp"
    ],
    featured: false,
    color: "#0284c7", // Logo Design (Sky-600)
  },
  {
    slug: "pulse-brand",
    title: "Pulse — Fitness Brand",
    category: "Brand Identity",
    year: "2024",
    client: "Pulse Fitness",
    description:
      "Dynamic brand identity for a boutique fitness studio targeting urban professionals.",
    longDescription:
      "Pulse Fitness needed branding that embodied energy, movement, and modern fitness culture. I created a bold logotype with kinetic visual language, an energetic color system, and a full suite of branded touchpoints from apparel to digital assets. The brand has since been applied across 3 studio locations.",
    tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop"],
    coverImage: "/images/projects/pulse-cover.jpg",
    images: [
      "/images/projects/pulse-1.jpg",
      "/images/projects/pulse-2.jpg",
    ],
    featured: false,
    color: "#0ea5e9", // Brand Identity (Sky-500)
  },
  {
    slug: "atlas-dashboard",
    title: "Atlas — Analytics Dashboard",
    category: "UI/UX Design",
    year: "2023",
    client: "Atlas Analytics",
    description:
      "Data visualization and dashboard design for a B2B analytics platform serving 10k+ users.",
    longDescription:
      "Atlas Analytics required a complete redesign of their core dashboard product to improve data clarity and reduce cognitive load. I led the UX research phase, identified key pain points, and designed a modular dashboard system with customizable widgets, improved data hierarchy, and an accessible color system for data visualization.",
    tools: ["Figma", "Framer", "Adobe Illustrator"],
    coverImage: "/images/projects/atlas-cover.jpg",
    images: [
      "/images/projects/atlas-1.jpg",
      "/images/projects/atlas-2.jpg",
    ],
    featured: false,
    color: "#06b6d4", // UI/UX Design (Cyan-500)
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aisyah Ramadhani",
    role: "Founder & CEO",
    company: "Nova Tech",
    avatar: "/images/avatars/aisyah.jpg",
    quote:
      "Farid delivered a brand identity that exceeded our expectations. His ability to translate abstract ideas into a cohesive visual system is remarkable. The final result positioned us perfectly for our Series A pitch.",
  },
  {
    id: "t2",
    name: "Budi Santoso",
    role: "Product Manager",
    company: "Muse Audio",
    avatar: "/images/avatars/budi.jpg",
    quote:
      "Working with Farid on Muse's UI was a seamless experience. He brought both creative vision and practical thinking — every design decision was purposeful. Our user satisfaction score improved by 40% post-launch.",
  },
  {
    id: "t3",
    name: "Clara Wijaya",
    role: "Editor in Chief",
    company: "Verdure Magazine",
    avatar: "/images/avatars/clara.jpg",
    quote:
      "Farid's editorial layouts brought a new life to Verdure. He understood our voice immediately and translated it into visual language that our readers fell in love with. He is meticulous, creative, and a true collaborator.",
  },
];

// ============================================================
// SKILLS
// ============================================================
export const skillGroups: SkillGroup[] = [
  {
    category: "Design Tools",
    icon: "🎨",
    skills: [
      { name: "Figma", level: 95 },
      { name: "Adobe Illustrator", level: 90 },
      { name: "Adobe Photoshop", level: 88 },
      { name: "Canva", level: 85 },
      { name: "Affinity Designer", level: 80 },
    ],
  },
  {
    category: "Soft Skills",
    icon: "💡",
    skills: [
      { name: "Creative Direction", level: 88 },
      { name: "Client Communication", level: 90 },
      { name: "Project Management", level: 82 },
      { name: "Design Strategy", level: 85 },
    ],
  },
];

export const creativeProcess = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Deep-dive research into the client's business, audience, and competitive landscape to build a strategic foundation.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "Translate research insights into a clear creative brief and design direction that solves the right problem.",
  },
  {
    step: "03",
    title: "Exploration",
    description:
      "Rapid ideation across multiple concepts — sketches, mood boards, and rough compositions to find the strongest direction.",
  },
  {
    step: "04",
    title: "Refinement",
    description:
      "Develop the chosen concept into polished, production-ready design with meticulous attention to detail.",
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "Structured handoff with organized files, style guides, and documentation for seamless implementation.",
  },
];

// ============================================================
// TIMELINE (About page)
// ============================================================
export const timeline: TimelineItem[] = [
  {
    year: "2026 – Present",
    title: "Resika App",
    place: "Team Training Project",
    description:
      "Built a Flutter-based waste management app with reusable UI components, end-to-end user flows, and location-based services for a seamless experience.",
    type: "experience",
  },
  {
    year: "2026",
    title: "Coding Camp 2026 2.0 Powered by DBS Foundation",
    place: "Dicoding & DBS Foundation",
    description:
      "Built responsive websites and React-based applications while applying JavaScript, CRUD operations, Web Storage API, and component-based development.",
    type: "experience",
  },

  {
    year: "2026",
    title: "CompeteMate Bootcamp 2026 UI/UX Design",
    place: "GDGoC Universitas Gunadarma",
    description:
      "Designed a user-centered digital product through wireframing, prototyping, and UI design while collaborating with a team, earning the 1st Best Team award.",
    type: "experience",
  },
  {
    year: "2026",
    title: "HelloCation ID",
    place: "Volunteer Batch 10",
    description:
      "Led the graphic design team in producing 50+ digital assets while coordinating content production and cross-functional collaboration for social media.",
    type: "experience",
  },
];

// ============================================================
// PERSONAL INFO
// ============================================================
export const personalInfo = {
  name: "Farid Hakim",
  role: "Web Developer & Graphic Designer",
  tagline: "Crafting visual identities that speak louder than words.",
  bio: "I'm an Information Systems student passionate about developing web and mobile applications that combine functionality with a seamless user experience. I enjoy exploring new technologies, solving problems, and turning ideas into digital solutions through a structured development process. My experience has allowed me to strengthen both my technical and collaborative skills while working on individual and team-based projects. With a background in graphic design, I also bring an eye for clarity and consistency when creating user interfaces",
  location: "Jakarta, Indonesia",
  email: "faridhkm19@gmail.com",
  availableForWork: true,
  socials: {
    github: "",
    linkedin: "https://linkedin.com/in/faridhakim19",
    instagram: "https://instagram.com/faridhkimm",
  },
};
