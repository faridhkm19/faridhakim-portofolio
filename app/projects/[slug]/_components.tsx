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
              <motion.p
                className="text-base leading-relaxed text-[var(--color-fg-muted)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px 0px" }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                {block.body}
              </motion.p>
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
        }

        return null;
      })}
    </div>
  );
}
