"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/app/_lib/data";
import type { Project } from "@/app/_lib/data";
import { Reveal } from "@/app/_components/scroll-animation";
import { TestimonialsSection } from "./_components/testimonials-section";
import {
  ProjectFilter,
  FILTER_CATEGORIES,
  type FilterCategory,
} from "./_components/project-filter";

// ─── Pre-compute category counts from static data ─────────────────────────────

const categoryCounts: Record<string, number> = Object.fromEntries(
  FILTER_CATEGORIES.slice(1).map((cat) => [
    cat,
    projects.filter((p) =>
      Array.isArray(p.category)
        ? p.category.includes(cat)
        : p.category === cat
    ).length,
  ])
);

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
        className="group block overflow-hidden rounded-lg border-[3px] border-[var(--color-border)] bg-[var(--color-bg-card)] transition-colors duration-300 hover:border-[var(--color-orange-accent)] hover:bg-[var(--color-orange-accent)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
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
        <div className="flex items-center justify-between gap-2 px-2 py-1 bg-[var(--color-bg-card)] transition-colors duration-300 group-hover:bg-[var(--color-orange-accent)]">
          <div className="min-w-0">
            <h2 className="font-heading text-sm font-bold leading-tight text-[var(--color-fg)] transition-colors duration-300 group-hover:text-white truncate">
              {project.title}
            </h2>
            <span className="block -mt-0.2 text-[11px] text-[var(--color-fg-muted)] transition-colors duration-300 group-hover:text-white">
              {Array.isArray(project.category) ? project.category[0] : project.category}
            </span>
          </div>
          <span className="flex-shrink-0 text-[11px] text-[var(--color-fg-muted)] transition-colors duration-300 group-hover:text-white">
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
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // AND logic: project must match BOTH category filter AND search query
  const filtered = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "All" ||
      (Array.isArray(p.category)
        ? p.category.includes(activeCategory)
        : p.category === activeCategory);

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q === "" || p.title.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const hasActiveFilters = activeCategory !== "All" || searchQuery.trim() !== "";

  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-portfolio">
        {/* Page header */}
        <Reveal className="mb-12">
          <h1 className="font-heading text-5xl font-bold text-[var(--color-fg)] md:text-6xl">
            All Projects
          </h1>
        </Reveal>

        {/* Search + Filter */}
        <Reveal delay={0.1}>
          <ProjectFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={categoryCounts}
            totalCount={projects.length}
          />
        </Reveal>

        {/* Project grid — AnimatePresence handles filter/search transitions */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + "|" + searchQuery}
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
          ) : (
            /* ── Improved empty state ── */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-5 py-24 text-center"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-fg-subtle)]"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              {/* Message */}
              <div>
                <p className="font-heading text-base font-semibold text-[var(--color-fg)]">
                  {searchQuery.trim()
                    ? `No results for "${searchQuery.trim()}"`
                    : "No projects in this category yet."}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-fg-muted)]">
                  {searchQuery.trim()
                    ? "Try a different keyword or clear the filters."
                    : "Check back later or browse other categories."}
                </p>
              </div>
              {/* Clear all CTA */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Section */}
        <TestimonialsSection />
      </div>
    </div>
  );
}

