import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, timeline } from "@/app/_lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";
import { SkillsetSection } from "./_components/skillset-section";
import { Target, Layers, Crosshair, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Farid Hakim — a Jakarta-based graphic designer with experience in brand identity, UI/UX, and editorial design.",
};

const values = [
  {
    icon: <Target />,
    title: "Purpose",
    desc: "Every design starts with a purpose. It should solve problems, communicate clearly, and create lasting value.",
  },
  {
    icon: <Layers />,
    title: "Process",
    desc: "Good work begins with understanding the problem. Research, strategy, and planning always come before design.",
  },
  {
    icon: <Crosshair />,
    title: "Detail",
    desc: "Small details make a big difference. I value consistency in every element, from typography and spacing to the final experience.",
  },
  {
    icon: <TrendingUp />,
    title: "Growth",
    desc: "Learning is part of my process. I continuously improve my creative and technical skills to build better digital experiences.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-portfolio">
        {/* Hero section */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <div>
            <Reveal>
              <h1 className="font-heading text-5xl font-bold text-[var(--color-fg)] md:text-6xl">
                Hi, I&rsquo;m Farid
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 space-y-4">
              <p className="text-[var(--color-fg-muted)] leading-relaxed">
                {personalInfo.bio}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                id="about-view-work"
                className="rounded-full bg-[var(--color-lime-accent)] px-6 py-2.5 font-heading text-sm font-semibold text-[var(--color-ink-950)] transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-lime-accent)_40%,transparent)] hover:bg-[var(--color-lime-accent-dark)]"
              >
                View My Work
              </Link>
              <a
                href={`mailto:${personalInfo.email}`}
                id="about-email"
                className="rounded-full border border-[var(--color-border)] px-6 py-2.5 font-heading text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-lime-accent)] hover:text-[var(--color-lime-accent)]"
              >
                Say Hello
              </a>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              {Object.entries(personalInfo.socials).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  id={`about-social-${key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-medium text-[var(--color-fg-muted)] capitalize transition-all hover:border-[var(--color-lime-accent)]/50 hover:text-[var(--color-fg)]"
                >
                  {key}
                </a>
              ))}
            </Reveal>
          </div>

          {/* Right: Avatar */}
          <Reveal direction="left" className="flex justify-center lg:justify-end">
            <div className="relative h-80 w-64 md:h-96 md:w-72">
              {/* Decorative border offset */}
              <div className="absolute -right-4 -bottom-4 h-full w-full rounded-2xl border-2 border-[var(--color-lime-accent)]/30" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-bg-secondary)]">
                <Image
                  src="/projects/gambarproject/FotoFaridHakim.webp"
                  alt="Farid Hakim — Graphic Designer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
              {/* Location badge */}
              <div className="absolute -left-4 -top-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 shadow-lg">
                <p className="text-xs text-[var(--color-fg-subtle)]">Based in</p>
                <p className="font-heading text-sm font-semibold text-[var(--color-fg)]">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Skillset Section */}
        <SkillsetSection />

        {/* Timeline */}
        <Reveal className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
            WORK HISTORY
          </p>
          <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)]">
            Experience
          </h2>
        </Reveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.1}>
          {timeline
            .filter((t) => t.type === "experience")
            .map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-heading text-base font-semibold text-[var(--color-fg)]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-lime-accent)]">
                        {item.place}
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-fg-subtle)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
        </StaggerContainer>

        {/* Values */}
        <div className="mt-24 pt-12 border-t border-[var(--color-border)]">
          <Reveal className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
              What I Believe In
            </p>
            <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)]">
              My Design Values
            </h2>
          </Reveal>

          <StaggerContainer
            className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 h-full hover:border-[var(--color-lime-accent)]/30 transition-colors">
                  <span className="mb-3 block text-xl text-[var(--color-lime-accent)]">
                    {v.icon}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-[var(--color-fg)] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
