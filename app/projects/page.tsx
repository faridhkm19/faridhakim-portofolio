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
  "Brand Identity",
  "UI/UX Design",
  "Print Design",
  "Logo Design",
  "Marketing Design",
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
        className="group block"
      >
        {/* Thumbnail */}
        <ViewTransition name={`project-image-${project.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-bg-secondary)]">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-heading text-xs font-medium uppercase tracking-widest text-white">
                View Project →
              </span>
            </div>
            {/* Category chip on card */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {(Array.isArray(project.category) ? project.category : [project.category]).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-lime-accent) 15%, transparent)",
                    color: "var(--color-lime-accent)",
                    border: "1px solid color-mix(in srgb, var(--color-lime-accent) 30%, transparent)",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </ViewTransition>

        {/* Meta */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: "var(--color-lime-accent)" }}
            />
            <span className="text-xs text-[var(--color-fg-subtle)]">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-lg font-semibold text-[var(--color-fg)] transition-colors duration-200 group-hover:text-[var(--color-lime-accent)]">
            {project.title}
          </h2>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-[var(--color-fg-muted)]">
            {project.description}
          </p>

          {/* Tool chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-xs text-[var(--color-fg-subtle)]"
              >
                {tool}
              </span>
            ))}
          </div>
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
            Portfolio
          </p>
          <h1 className="font-heading text-4xl font-bold text-[var(--color-fg)] md:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 max-w-lg text-[var(--color-fg-muted)]">
            A collection of graphic design and web development projects
          </p>
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
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
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
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i}/>
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
