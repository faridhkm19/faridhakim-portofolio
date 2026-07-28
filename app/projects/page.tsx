"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewTransition } from "react";
import { projects } from "@/app/_lib/data";
import type { Project } from "@/app/_lib/data";
import { Reveal } from "@/app/_components/scroll-animation";
import { TestimonialsSection } from "./_components/testimonials-section";

const categories = [
  "All",
  "Web Development",
  "Front-End Development",
  "UI/UX Design",
  "Brand Identity",
  "Marketing Design",
  "Logo Design",
] as const;

type Category = (typeof categories)[number];

// ============================================================
// Project Card — with whileInView appear animation
// ============================================================
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  // Stagger delay: each card delays 80ms more than the previous,
  // capped at 400ms so late-column cards don't wait too long.
  const staggerDelay = Math.min(index * 0.08, 0.4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{
        duration: 0.55,
        delay: staggerDelay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        id={`project-card-${project.slug}`}
        data-cursor="view"
        className="group block overflow-hidden rounded-lg border-[3px] border-[var(--color-border)] transition-colors duration-300 hover:border-[var(--color-lime-accent)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[5px] bg-[var(--color-bg-secondary)]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay with arrow button */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-heading text-xs font-medium uppercase tracking-widest text-white">
              View Project →
            </span>
          </div>
        </div>

        {/* Meta area — gray bg default, lime accent on hover */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-b-[5px] bg-[var(--color-bg-card)] transition-colors duration-300 group-hover:bg-[var(--color-lime-accent)]">
          <div className="min-w-0">
            <h2 className="font-heading text-sm font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[var(--color-ink-950)] truncate">
              {project.title}
            </h2>
            <span className="text-[11px] text-white/60 transition-colors duration-300 group-hover:text-[var(--color-ink-950)]/70">
              {Array.isArray(project.category) ? project.category[0] : project.category}
            </span>
          </div>
          <span className="flex-shrink-0 text-[11px] text-white/60 transition-colors duration-300 group-hover:text-[var(--color-ink-950)]/70">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================
// Page
// ============================================================
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) =>
        Array.isArray(p.category)
          ? p.category.includes(activeCategory)
          : p.category === activeCategory
      );

  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-portfolio">
        {/* Page header */}
        <Reveal className="mb-12">
          <h1 className="font-heading text-5xl font-bold text-[var(--color-fg)] md:text-6xl">
            All Projects
          </h1>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\//g, "-").replace(/ /g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${activeCategory === cat
                    ? "border border-transparent bg-[var(--color-lime-accent)] text-[var(--color-ink-950)]"
                    : "border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-lime-accent)]/50 hover:text-[var(--color-lime-accent)]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project grid — AnimatePresence handles filter transitions,
            individual cards animate via whileInView */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-[var(--color-fg-subtle)]">
            No projects in this category yet.
          </p>
        )}

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>
    </div>
  );
}
