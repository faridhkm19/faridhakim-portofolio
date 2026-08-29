"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ContentBlock } from "@/app/_lib/data";

// ============================================================
// LongDescription
// Renders longDescription string, splitting on \n\n into paragraphs.
// Each paragraph fades in via whileInView as it scrolls into view.
// ============================================================
export function LongDescription({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  return (
    <div>
      <motion.h2
        className="font-heading mb-5 text-xl font-semibold text-[var(--color-fg)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px 0px" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        About this project
      </motion.h2>

      <div className="space-y-4">
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="text-base leading-relaxed text-[var(--color-fg-muted)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// GalleryGrid
// Renders the project image gallery.
// Each image slides up into view via whileInView independently.
// ============================================================
export function GalleryGrid({
  images,
  title,
  layout,
}: {
  images: string[];
  title: string;
  layout?: "square-grid";
}) {
  const isSquareGrid = layout === "square-grid";

  return (
    <div>
      <motion.h2
        className="font-heading mb-5 text-xl font-semibold text-[var(--color-fg)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px 0px" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        Gallery
      </motion.h2>

      <div className={isSquareGrid ? "grid grid-cols-1 md:grid-cols-2 gap-5" : "space-y-5"}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
            style={{
              aspectRatio: isSquareGrid ? "1 / 1" : (i === 0 ? "16 / 9" : "4 / 3"),
            }}
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.12,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              src={src}
              alt={`${title} — gallery image ${i + 1}`}
              fill
              className={`transition-transform duration-700 hover:scale-[1.02] ${
                isSquareGrid ? "object-cover object-center" : "object-cover"
              }`}
              sizes={isSquareGrid ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 66vw"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TwoSquareGallery
// Two equal square (1/1) columns, responsive (stacks on mobile).
// ============================================================
function TwoSquareGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
          style={{ aspectRatio: "1 / 1" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={src}
            alt={`${title} — image ${i + 1}`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// PortraitSingleGallery
// Portrait image (≈406:635 ≈ 0.64 ratio), centered in container.
// ============================================================
function PortraitSingleGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div>
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
          style={{ aspectRatio: "406 / 635" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={src}
            alt={`${title} — image ${i + 1}`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// FeaturedPlusTwoGallery
// First image: full-width featured (16/9).
// Next two images: two equal square columns below, responsive.
// ============================================================
function FeaturedPlusTwoGallery({ images, title }: { images: string[]; title: string }) {
  const [featured, ...rest] = images;
  return (
    <div className="flex flex-col gap-4">
      {/* Featured image */}
      {featured && (
        <motion.div
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
          style={{ aspectRatio: "16 / 9" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={featured}
            alt={`${title} — featured image`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </motion.div>
      )}

      {/* Two-column pair */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((src, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
              style={{ aspectRatio: "1 / 1" }}
              initial={{ opacity: 0, y: 48, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.65, delay: (i + 1) * 0.12, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={src}
                alt={`${title} — image ${i + 2}`}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// AsymmetricTwoColGallery
// Left column: square-ish (183×183 ratio), Right column: wider (259×183 ratio).
// Both share equal height. Responsive: stacks on mobile.
// ============================================================
function AsymmetricTwoColGallery({ images, title }: { images: string[]; title: string }) {
  const [left, right] = images;
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      {/* Left — narrower, square-ish (183/183 ≈ 1:1) */}
      {left && (
        <motion.div
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)] sm:flex-none"
          style={{ aspectRatio: "1 / 1", flexBasis: "41.5%" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: 0, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={left}
            alt={`${title} — gallery image 1`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 42vw"
          />
        </motion.div>
      )}

      {/* Right — wider landscape (259/183 ≈ 259:183) */}
      {right && (
        <motion.div
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)] sm:flex-1"
          style={{ aspectRatio: "259 / 183" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={right}
            alt={`${title} — gallery image 2`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 58vw"
          />
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// LandscapeSingleGallery
// Full content-width single image, landscape ratio ≈ 455:289.
// ============================================================
function LandscapeSingleGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div>
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
          style={{ aspectRatio: "455 / 289" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={src}
            alt={`${title} — gallery image ${i + 1}`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// TwoByTwoGridGallery
// 4 images in a 2-column × 2-row grid, each cell ≈ 219:217 (nearly square).
// ============================================================
function TwoByTwoGridGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.slice(0, 4).map((src, i) => (
        <motion.div
          key={i}
          className="relative overflow-hidden rounded-lg bg-[var(--color-bg-secondary)]"
          style={{ aspectRatio: "219 / 217" }}
          initial={{ opacity: 0, y: 48, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src={src}
            alt={`${title} — gallery image ${i + 1}`}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================
// ProcessTimeline
// Gantt-style design process chart. Used by ui-ux-resika only.
// Renders 6 phases as animated bars spanning a 5-column week grid.
// Vertical guide lines + staggered slide-in animation via framer-motion.
// ============================================================
function ProcessTimeline({
  phases,
}: {
  phases: { name: string; badge: string; startCol: number; endCol: number }[];
}) {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"];
  const totalCols = weeks.length;

  return (
    <div className="relative overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-6">
      {/* Vertical column guide lines — positioned over the grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalCols}, minmax(88px, 1fr))`,
          padding: "0 1.25rem",
        }}
        aria-hidden
      >
        {weeks.map((_, i) => (
          <div
            key={i}
            style={{
              borderLeft:
                i === 0
                  ? "none"
                  : "1px solid color-mix(in srgb, var(--color-border) 70%, transparent)",
            }}
          />
        ))}
      </div>

      {/* Grid content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalCols}, minmax(88px, 1fr))`,
          rowGap: "0.6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Week header labels */}
        {weeks.map((w, i) => (
          <motion.div
            key={i}
            style={{ gridRow: 1, gridColumn: i + 1 }}
            className="pb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
          >
            {w}
          </motion.div>
        ))}

        {/* Phase bars */}
        {phases.map((phase, rowIdx) => (
          <motion.div
            key={rowIdx}
            style={{
              gridRow: rowIdx + 2,
              gridColumn: `${phase.startCol} / ${phase.endCol + 1}`,
            }}
            className="flex min-w-0 items-center justify-between gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2 shadow-sm"
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{
              duration: 0.48,
              delay: 0.18 + rowIdx * 0.09,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <span className="whitespace-nowrap text-xs font-medium text-[var(--color-fg)] sm:text-sm">
              {phase.name}
            </span>
            <motion.span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none sm:text-xs"
              style={{
                backgroundColor: "var(--color-orange-accent)",
                color: "#ffffff",
              }}
              initial={{ scale: 0.65, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.32 + rowIdx * 0.09,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {phase.badge}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ContentBlockRenderer
// Renders a contentBlocks array in order, dispatching each block
// to its matching layout. Falls back to null for unknown types.
// ============================================================
export function ContentBlockRenderer({
  blocks,
  title,
}: {
  blocks: ContentBlock[];
  title: string;
}) {
  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <div key={i}>
              <motion.h2
                className="font-heading mb-5 text-xl font-semibold text-[var(--color-fg)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {block.heading}
              </motion.h2>
              {block.body && (
                <motion.p
                  className="text-base leading-relaxed text-[var(--color-fg-muted)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  {block.body}
                </motion.p>
              )}
            </div>
          );
        }

        if (block.type === "gallery") {
          if (block.layout === "two-square") {
            return <TwoSquareGallery key={i} images={block.images} title={title} />;
          }
          if (block.layout === "portrait-single") {
            return <PortraitSingleGallery key={i} images={block.images} title={title} />;
          }
          if (block.layout === "featured-plus-two") {
            return <FeaturedPlusTwoGallery key={i} images={block.images} title={title} />;
          }
          if (block.layout === "asymmetric-two-col") {
            return <AsymmetricTwoColGallery key={i} images={block.images} title={title} />;
          }
          if (block.layout === "landscape-single") {
            return <LandscapeSingleGallery key={i} images={block.images} title={title} />;
          }
          if (block.layout === "two-by-two-grid") {
            return <TwoByTwoGridGallery key={i} images={block.images} title={title} />;
          }
        }

        if (block.type === "process-timeline") {
          return <ProcessTimeline key={i} phases={block.phases} />;
        }

        return null;
      })}
    </div>
  );
}
