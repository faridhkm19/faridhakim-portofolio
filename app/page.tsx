"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ViewTransition } from "react";
import { featuredProjects, personalInfo } from "@/app/_lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";
import { isContactPageEnabled } from "@/app/_lib/config";

// ============================================================
// Hero Section
// ============================================================
function Hero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden pb-0 pt-24 md:pt-32 -mt-16"
      aria-label="Hero"
    >
      {/* ── Arch photo + Name stack (photo → name → subtitles) ── */}
      <div className="relative flex w-full flex-col items-center">
        {/* Arch frame wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
          style={{ width: "min(320px, 72vw)" }}
        >
          {/* Arch/Oval frame */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "50% / 40%",
              aspectRatio: "3 / 4",
              WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
              maskImage: "linear-gradient(to bottom, black 45%, transparent 95%)",
            }}
          >
            <Image
              src="/projects/gambarproject/PhotoFarid.webp"
              alt="Farid Hakim — Web Developer & Graphic Designer"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 72vw, 320px"
            />

            {/* Gradient overlay — blends photo into name below */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 35%, var(--color-bg) 95%)",
              }}
              aria-hidden
            />
          </div>

          {/* ── Floating CTA — right side of arch ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.9 }}
            className="absolute -right-5 bottom-[30%] z-20 md:-right-10"
          >
            <Link
              href="/projects"
              id="hero-cta-projects"
              className="flex items-center gap-2 rounded-full bg-[var(--color-orange-accent)] px-5 py-2.5 font-heading text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[var(--color-orange-accent-dark)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-orange-accent)_45%,transparent)] whitespace-nowrap"
            >
              View My Work
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Name — overlaps arch bottom, stacked two lines ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 -mt-20 px-4 text-center"
        >
          <h1
            className="font-heading font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 11vw, 6.5rem)" }}
          >
            {/* "Farid" — blends with dark photo area above via mix-blend-mode */}
            <span
              className="block"
              style={{
                color: "var(--color-fg)",
                mixBlendMode: "difference",
                WebkitTextFillColor: "unset",
              }}
            >
              Farid
            </span>
            {/* "Hakim" — sits below photo, full page color */}
            <span
              className="block text-[var(--color-fg)]"
            >
              Hakim
            </span>
          </h1>
        </motion.div>

        {/* ── Subtitle lines ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-0 mt-3 flex flex-col items-center gap-1.5 pb-14 text-center"
        >
          <span className="font-heading text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">
            WEB DEVELOPER & DESIGNER
          </span>
          <div className="flex flex-col items-center gap-2 mt-4 text-[var(--color-fg-subtle)]">
            <span className="text-[10px] uppercase tracking-widest font-heading">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// CountUp — animated number counter triggered on scroll-into-view
// ============================================================
function CountUp({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // amount: 0.8 ensures the user has scrolled down enough to see it before it starts
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, target, duration, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

// ============================================================
// Stats Section — counter number effect, no divider line
// ============================================================
function StatsRow() {
  const stats = [
    { target: 10, suffix: "+", label: "Projects Completed" },
    { target: 1, suffix: "+", label: "Years Experience" },
    { target: 90, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className="pb-10 pt-0">
      <div className="container-portfolio">
        <div className="flex flex-wrap items-center justify-center gap-10 pt-8 sm:gap-20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-heading text-3xl font-bold text-[var(--color-fg)]">
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={0.5}
                />
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-subtle)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Featured Projects Section
// ============================================================
function FeaturedProjects() {
  return (
    <section className="pt-10 md:pt-12 pb-12 md:pb-12">
      <div className="container-portfolio">
        {/* Section header */}
        <Reveal className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-4xl font-bold text-[var(--color-fg)] md:text-5xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            id="home-view-all-projects"
            className="hidden text-sm font-medium text-[var(--color-fg-muted)] underline-orange hover:text-[var(--color-fg)] sm:block"
          >
            View all →
          </Link>
        </Reveal>

        {/* Projects grid */}
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                id={`home-project-${project.slug}`}
                className="group block overflow-hidden rounded-lg border-[3px] border-[var(--color-border)] bg-[var(--color-bg-card)] transition-colors duration-300 hover:border-[var(--color-orange-accent)] hover:bg-[var(--color-orange-accent)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--color-ink-950)]/0 transition-all duration-300 group-hover:bg-[var(--color-ink-950)]/50 flex items-center justify-center">
                    <span className="translate-y-4 rounded-full bg-[var(--color-orange-accent)] px-5 py-2 font-heading text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View Project →
                    </span>
                  </div>
                </div>

                {/* Meta area — gray bg default, orange accent on hover */}
                <div className="flex items-center justify-between gap-2 px-2 py-1 bg-[var(--color-bg-card)] transition-colors duration-300 group-hover:bg-[var(--color-orange-accent)]">
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm font-bold leading-tight text-[var(--color-fg)] transition-colors duration-300 group-hover:text-white truncate">
                      {project.title}
                    </h3>
                    <span className="block -mt-0.2 text-[11px] text-[var(--color-fg-muted)] transition-colors duration-300 group-hover:text-white">
                      {Array.isArray(project.category) ? project.category[0] : project.category}
                    </span>
                  </div>
                  <span className="flex-shrink-0 text-[11px] text-[var(--color-fg-muted)] transition-colors duration-300 group-hover:text-white">
                    {project.year}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-8 sm:hidden">
          <Link
            href="/projects"
            className="block w-full rounded-full border border-[var(--color-border-btn)] py-3 text-center text-sm font-medium text-[var(--color-fg-muted)] hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)] transition-colors"
          >
            View all projects →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Services / Disciplines Marquee
// ============================================================
const disciplinesBack = [
  "Logo Design",
  "UI/UX Design",
  "Brand Identity",
  "Marketing Design",
];

const disciplinesFront = [
  "Web Development",
  "Database Management",
  "Front-End Development",
  "Mobile App Development",
  "Desktop Application",
];

// Repeat items enough times to guarantee seamless loop at any viewport width
const REPEAT = 6;

function DisciplinesMarquee() {
  const backItems = Array.from({ length: REPEAT }, () => disciplinesBack).flat();
  const frontItems = Array.from({ length: REPEAT }, () => disciplinesFront).flat();

  return (
    <section
      aria-label="Services and disciplines"
      className="py-4 md:py-8"
      style={{ overflow: "hidden" }}
    >
      <div className="disciplines-marquee-wrapper">

        {/* ── Lapisan BELAKANG — putih, diagonal kiri (-6deg), gerak → */}
        <div className="marquee-band marquee-band-back">
          <div className="marquee-track marquee-track-ltr">
            {backItems.map((label, i) => (
              <div key={i} className="marquee-item">
                <span className="marquee-text-dark">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Lapisan DEPAN — orange-accent, diagonal kanan (+6deg), gerak ← */}
        <div className="marquee-band marquee-band-front">
          <div className="marquee-track marquee-track-rtl">
            {frontItems.map((label, i) => (
              <div key={i} className="marquee-item">
                <span className="marquee-text-light">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


// ============================================================
// CTA Section
// ============================================================
function CTASection() {
  return (
    <section className="pt-12 pb-24">
      <div className="container-portfolio">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-10 md:p-16 text-center">
            <p className="relative mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-orange-accent)]">
              Let&rsquo;s Work Together
            </p>
            <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
              Have a project in mind?
            </h2>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              {/* Get In Touch button — hidden when isContactPageEnabled is false (see config.ts) */}
              {isContactPageEnabled && (
                <Link
                  href="/contact"
                  id="home-cta-contact"
                  className="rounded-full bg-[var(--color-orange-accent)] px-8 py-3 font-heading text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-orange-accent)_35%,transparent)] hover:bg-[var(--color-orange-accent-dark)]"
                >
                  Get In Touch
                </Link>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                id="home-cta-email"
                className="rounded-full border border-[var(--color-border-btn)] px-8 py-3 font-heading text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// Page
// ============================================================
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsRow />
      <DisciplinesMarquee />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}
