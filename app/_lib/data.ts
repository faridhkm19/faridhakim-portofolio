// ============================================================
// Static Data Layer — Farid Hakim Portfolio
// ============================================================

export type ContentBlock =
  | { type: "text"; heading: string; body?: string }
  | { type: "gallery"; layout: "two-square" | "portrait-single" | "featured-plus-two" | "asymmetric-two-col" | "landscape-single" | "two-by-two-grid"; images: string[] }
  | { type: "process-timeline"; phases: { name: string; badge: string; startCol: number; endCol: number }[] };

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
  /** Download installer URL — shown as a button on the project detail page (Desktop Application projects). */
  downloadInstaller?: string;
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
    slug: "sakala-pos-inventory",
    title: "Sakala POS & Inventory",
    category: "Desktop Application",
    year: "2026",
    client: "Seleksi Calon Asisten LePKom Universitas Gunadarma",
    description:
      "Sakala POS & Inventory is a desktop application that helps small businesses manage their sales and inventory.",
    longDescription:
      "Seduh Sakala POS is a desktop-based Point of Sale and inventory management system built specifically for a small-to-medium coffee shop. The system handles everything from cashier transactions and automatic stock deductions to role-based access control and sales reporting, all connected to a centralized MySQL database that multiple cashier computers can access simultaneously over a local network. It started as a personal project to solve a very real gap I noticed in how small coffee shops operate: sales and stock management were completely disconnected, and this project was my attempt to build something that actually fixes that.",
    tools: ["Electron", "Node.js", "MySQL", "Java"],
    coverImage: "/projects/gambarproject/SAKALAPOS/sakalaposthumbnail.webp",
    images: [
      "/projects/gambarproject/SAKALAPOS/sakalapos1.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos2.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos3.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos4.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos5.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos6.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos7.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos8.webp",
      "/projects/gambarproject/SAKALAPOS/sakalapos9.webp",
    ],
    featured: true,
    color: "#0ea5e9",
    programLabel: "Program",
    downloadInstaller: "https://github.com/faridhkm19/sakala_pos/releases/download/v1.0.0/Sakala.POS-1.0.0.exe",
    githubRepo: "https://github.com/faridhkm19/sakala_pos",
    techStack: {
      backend: ["Java 17+", "JDBC", "MySQL 8.0", "HikariCP", "jbcrypt", "Apache Maven"],
      frontend: ["JavaFX 21", "FXML", "JavaFX CSS"],
    },
    contentBlocks: [
      {
        type: "text",
        heading: "About this project",
        body: "Seduh Sakala POS is a desktop-based Point of Sale and inventory management system built specifically for a small-to-medium coffee shop. The system handles everything from cashier transactions and automatic stock deductions to role-based access control and sales reporting, all connected to a centralized MySQL database that multiple cashier computers can access simultaneously over a local network. It started as a personal project to solve a very real gap I noticed in how small coffee shops operate: sales and stock management were completely disconnected, and this project was my attempt to build something that actually fixes that.",
      },
      {
        type: "gallery",
        layout: "featured-plus-two",
        images: [
          "/projects/gambarproject/SAKALAPOS/sakalapos5.webp",
          "/projects/gambarproject/SAKALAPOS/sakalapos2.webp",
          "/projects/gambarproject/SAKALAPOS/sakalapos6.webp",
        ],
      },
      {
        type: "text",
        heading: "The Problem",
        body: "Small coffee shops like Seduh Sakala typically record sales on a simple POS while managing ingredient stock separately, either on paper or in a spreadsheet. This disconnect creates a chain of problems: stock is only counted at the end of the day or when a barista reaches for an ingredient and finds it empty mid-rush, cashier staff and owners share the same access level with no separation of permissions, running two cashier stations means two separate records with no single source of truth, and without structured transaction data there is no reliable way to know which menu items drive revenue or how sales trend over time.",
      },
      {
        type: "gallery",
        layout: "landscape-single",
        images: [
          "/projects/gambarproject/SAKALAPOS/sakalapos8.webp",
        ],
      },
      {
        type: "gallery",
        layout: "landscape-single",
        images: [
          "/projects/gambarproject/SAKALAPOS/sakalapos9.webp",
        ],
      },
      {
        type: "text",
        heading: "Key Features",
        body: "Cashiers work from a real-time grid transaction screen with automatic receipt generation. Every sale triggers recipe-based stock deductions across all required ingredients inside a single atomic transaction, with a full rollback if anything fails. Low-stock ingredients are visually flagged in the inventory table, and admins receive a warning dialog on login. The system enforces role-based access at the service layer: admins handle menus, ingredients, staff, and reports, while cashiers are limited to transactions and their own daily summary. Multiple cashier stations connect to a centralized MySQL server over LAN using HikariCP connection pooling, and the app ships as a self-contained Windows installer with the Java runtime bundled in.",
      },
      {
        type: "gallery",
        layout: "landscape-single",
        images: [
          "/projects/gambarproject/SAKALAPOS/sakalapos7.webp",
        ],
      },
    ],
  },
  {
    slug: "ui-ux-resika",
    title: "UI/UX Resika",
    category: ["UI/UX Design"],
    year: "2026",
    client: "CompeteMate Bootcamp 2026 UI/UX Design",
    description:
      "Designed a promotional campaign for SMK Sumbangsih Multimedia's student admission program, creating a consistent visual identity across print and digital media.",
    longDescription:
      "Resika App is a mobile application that connects households with waste bank operators to make managing household waste simpler and more transparent. Instead of relying on manual coordination with little visibility, users can request a waste pickup, track it in real time, and earn coins by reporting recycled items, which can later be exchanged for vouchers. As the UI/UX Designer on this project, I worked with the team from early research through to a high fidelity interactive prototype covering the full core flow, from requesting and tracking a pickup to reporting recycled items and redeeming coins.",
    tools: ["Figma", "Adobe Illustrator", "Canva"],
    coverImage: "/projects/gambarproject/UIUXRESIKA/TamplateUIUXResika.webp",
    images: [
      "/projects/gambarproject/PPDBsmb/PPDBSmb1.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb2.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb3.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb4.webp",
      "/projects/gambarproject/PPDBsmb/PPDBSmb5.webp",
    ],
    featured: true,
    color: "#06b6d4",
    galleryLayout: "square-grid",
    programLabel: "Program",
    contentBlocks: [
      {
        type: "text",
        heading: "About this project",
        body: "Resika App is a mobile application designed to connect households with waste bank operators and make household waste management more accessible, transparent, and rewarding. The app allows users to request waste pickups, track the collection process, report recyclable items, and earn coins that can be exchanged for vouchers. As the UI/UX Designer, I contributed throughout the design process, from initial research and problem identification to creating a high fidelity interactive prototype covering the core user journey, including requesting and tracking waste pickups, reporting recycled items, and redeeming rewards.",
      },
      {
        type: "gallery",
        layout: "asymmetric-two-col",
        images: [
          "/projects/gambarproject/UIUXRESIKA/UIUXResika1.webp",
          "/projects/gambarproject/UIUXRESIKA/UIUXResika2.webp",
        ],
      },
      {
        type: "text",
        heading: "The Problem",
        body: "Household waste management in Indonesia still relies heavily on manual coordination between residents and waste banks, making the process less accessible and transparent. Early research showed that users often had limited visibility into the status of their waste pickups and lacked clear incentives to sort and recycle their waste. These challenges highlighted three key needs that shaped Resika App: simpler coordination between users and waste banks, transparent tracking throughout the collection process, and a reward system that provides tangible value for users who actively participate in recycling.",
      },
      {
        type: "gallery",
        layout: "landscape-single",
        images: [
          "/projects/gambarproject/UIUXRESIKA/UIUXResika3.webp",
        ],
      },
      {
        type: "gallery",
        layout: "two-by-two-grid",
        images: [
          "/projects/gambarproject/UIUXRESIKA/UIUXResika4.webp",
          "/projects/gambarproject/UIUXRESIKA/UIUXResika5.webp",
          "/projects/gambarproject/UIUXRESIKA/UIUXResika6.webp",
          "/projects/gambarproject/UIUXRESIKA/UIUXResika7.webp",
        ],
      },
      {
        type: "text",
        heading: "Design Process",
      },
      {
        type: "process-timeline",
        phases: [
          { name: "Research",             badge: "2 weeks", startCol: 1, endCol: 2 },
          { name: "Ideation",             badge: "3 weeks", startCol: 1, endCol: 3 },
          { name: "Wireframes",           badge: "2 weeks", startCol: 3, endCol: 4 },
          { name: "UI Design & Hi-Fi",             badge: "3 weeks", startCol: 4, endCol: 6 },
          { name: "Prototype & Testing",  badge: "3 weeks", startCol: 6, endCol: 8 },
        ],
      },
    ],
  },
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
    githubRepo: "https://github.com/faridhkm19/Tracker.io",
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
    featured: false,
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
    featured: false,
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
      "A modern combination mark logo for SASIL HIJAB, featuring an elegant pashmina silhouette integrated with a clean wordmark.",
    longDescription:
      "The SASIL HIJAB logo perfectly balances modern minimalist aesthetics with a strong brand identity. Designed as a versatile combination mark, it elegantly integrates a clean serif wordmark with a sophisticated mascot. This mascot features a continuous line-art silhouette of a woman wearing a pashmina that cleverly forms the letter 'S' within an arched frame. This thoughtful approach captures the graceful essence of the brand while ensuring high legibility. Beyond simply following current design trends, this highly adaptable logo provides a stylish and recognizable presence that translates seamlessly across digital platforms, social media, and print materials.",
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
    year: "2022",
    client: "Burger IN",
    description:
      "A creative lettermark logo for Burger IN, featuring rotated initials seamlessly integrated into a burger bun silhouette.",
    longDescription:
      "Designed in 2022 as an early foundational project, the Burger IN logo explores a clever lettermark concept that blends typography with illustration. The design takes the brand's initials, 'IN', rotates them 90 degrees, and seamlessly integrates them into the silhouette of a burger bun. This creative visual play not only forms a unique and striking representation of a burger but also demonstrates a smart, minimalist approach to visual identity, capturing the essence of the brand in a single memorable icon.",
    tools: ["Adobe Illustrator", "Figma"],
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
    slug: "atlas-dashboard",
    title: "Project 8",
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
    name: "",
    role: "",
    company: "",
    avatar: "/images/avatars/aisyah.jpg",
    quote:
      "",
  },
  {
    id: "t2",
    name: "",
    role: "",
    company: "",
    avatar: "/images/avatars/budi.jpg",
    quote:
      "",
  },
  {
    id: "t3",
    name: "",
    role: "",
    company: "",
    avatar: "/images/avatars/clara.jpg",
    quote:
      "",
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
