import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ViewTransition } from "react";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/app/_lib/data";
import { GalleryGrid, LongDescription, ContentBlockRenderer } from "./_components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article>
      {/* ── Hero Image ─────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-80 overflow-hidden bg-[var(--color-bg-secondary)] md:h-[75vh]">
        <ViewTransition name={`project-image-${project.slug}`}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </ViewTransition>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Hero text — bottom-anchored */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
          <div className="container-portfolio">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--color-orange-accent)" }}
              />
              <span className="text-sm font-medium text-white/70">
                {Array.isArray(project.category) ? project.category.join(", ") : project.category}
              </span>
              <span className="text-sm text-white/40">·</span>
              <span className="text-sm text-white/50">{project.year}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {/* Live Demo & GitHub buttons — Web Development / Front-End Development only */}
            {(() => {
              const cats = Array.isArray(project.category) ? project.category : [project.category];
              const isWebProject = cats.some(
                (c) => c === "Web Development" || c === "Front-End Development" || c === "Desktop Application"
              );
              if (!isWebProject) return null;
              return (
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      id={`project-live-demo-${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[var(--color-orange-accent)] px-6 py-2.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-orange-accent)_40%,transparent)] hover:bg-[var(--color-orange-accent-dark)]"
                    >
                      Live Demo 
                    </a>
                  )}
                  {project.downloadInstaller && (
                    <a
                      href={project.downloadInstaller}
                      id={`project-download-installer-${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[var(--color-orange-accent)] px-6 py-2.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-orange-accent)_40%,transparent)] hover:bg-[var(--color-orange-accent-dark)]"
                    >
                      Download Installer 
                    </a>
                  )}
                  {project.githubRepo && (
                    <a
                      href={project.githubRepo}
                      id={`project-github-repo-${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/30 px-6 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
                    >
                      GitHub Repository
                    </a>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="container-portfolio py-14 md:py-22">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* ── Main content col ── */}
          <div className="lg:col-span-2 space-y-10">

            {project.contentBlocks && project.contentBlocks.length > 0 ? (
              /* contentBlocks path — used when project defines structured content */
              <ContentBlockRenderer blocks={project.contentBlocks} title={project.title} />
            ) : (
              /* Default path — used for all other projects */
              <>
                {/* Full description — renders \n\n as paragraph breaks */}
                <LongDescription text={project.longDescription} />

                {/* Gallery */}
                {project.images.length > 0 && (
                  <GalleryGrid images={project.images} title={project.title} layout={project.galleryLayout} />
                )}
              </>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 space-y-6">
              {/* Accent line */}
              <div
                className="h-1 w-12 rounded-full"
                style={{ backgroundColor: "var(--color-orange-accent)" }}
              />

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                  {project.programLabel ?? "Client"}
                </p>
                <p className="font-medium text-[var(--color-fg)]">
                  {project.client}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                  Category
                </p>
                <p className="font-medium text-[var(--color-fg)]">
                  {project.category}
                </p>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                  Year
                </p>
                <p className="font-medium text-[var(--color-fg)]">
                  {project.year}
                </p>
              </div>

              {project.techStack ? (
                <>
                  {/* Backend */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                      Backend
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.backend.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frontend */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                      Frontend
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.frontend.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Default: Tools Used */
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
                    Tools Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Adjacent project navigation ── */}
        {(prev || next) && (
          <div className="mt-16 border-t border-[var(--color-border)] pt-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
              More Projects
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  id={`prev-project-${prev.slug}`}
                  className="group flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 transition-all hover:border-[var(--color-orange-accent)]/40"
                >
                  <span className="text-xs text-[var(--color-fg-subtle)]">
                    ← Previous
                  </span>
                  <span className="font-heading font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-orange-accent)]">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  id={`next-project-${next.slug}`}
                  className="group flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-right transition-all hover:border-[var(--color-orange-accent)]/40 sm:ml-auto"
                >
                  <span className="text-xs text-[var(--color-fg-subtle)]">
                    Next →
                  </span>
                  <span className="font-heading font-semibold text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-orange-accent)]">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/projects"
            id="back-to-projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] underline-orange hover:text-[var(--color-fg)] transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>
      </div>
    </article>
  );
}
