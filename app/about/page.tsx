import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { personalInfo, timeline } from "@/app/_lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";
import { SkillsetSection } from "./_components/skillset-section";
import { ValuesSection } from "./_components/values-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Farid Hakim — a Jakarta-based graphic designer with experience in brand identity, UI/UX, and editorial design.",
};

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
                className="rounded-full bg-[var(--color-orange-accent)] px-6 py-2.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-orange-accent)_40%,transparent)] hover:bg-[var(--color-orange-accent-dark)]"
              >
                View My Work
              </Link>
              <a
                href={`mailto:${personalInfo.email}`}
                id="about-email"
                className="rounded-full border border-[var(--color-border-btn)] px-6 py-2.5 font-heading text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
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
                  className="rounded-full border border-[var(--color-border-btn)] px-4 py-1.5 text-xs font-medium text-[var(--color-fg)] capitalize transition-all hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
                >
                  {key}
                </a>
              ))}
            </Reveal>
          </div>

          {/* Right: Avatar */}
          <Reveal direction="left" className="flex justify-center lg:justify-end lg:pr-4">
            <div className="relative h-80 w-64 md:h-96 md:w-72">
              {/* Decorative border offset */}
              <div className="absolute -right-4 -bottom-4 h-full w-full rounded-2xl border-2 border-[var(--color-orange-accent)]/30" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-bg-secondary)]">
                <Image
                  src="/projects/gambarproject/PhotoFarid.webp"
                  alt="Farid Hakim — Graphic Designer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
              {/* Location badge */}
              <div className="absolute -left-4 -top-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 shadow-lg">
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
        <div className="mb-20">
          <Reveal className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
              Experience
            </h2>
          </Reveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.1}>
          {timeline
            .filter((t) => t.type === "experience")
            .map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-heading text-base font-semibold text-[var(--color-fg)]">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-orange-accent)]">
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
        </div>

        {/* Values */}
        <ValuesSection />
      </div>
    </div>
  );
}
