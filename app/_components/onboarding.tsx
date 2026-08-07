"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_KEY = "fh_onboarding_shown";
const NAME = "Farid Hakim";

/**
 * Split the name into individual characters, preserving the space as a
 * non-animating gap so layout stays intact without rendering an empty span.
 */
const CHARS = NAME.split(""); // ["F","a","r","i","d"," ","H","a","k","i","m"]

// ─── Animation variants ───────────────────────────────────────────────────────

/** Stagger container — controls timing of children */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      // Start staggering children immediately
      staggerChildren: 0.065,
      delayChildren: 0.15,
    },
  },
  /** After letters are visible, wait ~500 ms then let the overlay exit */
  exit: {},
};

/** Per-letter animation */
const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Total duration before the overlay starts to exit:
//   delayChildren (0.15s) + stagger * charCount + letter-duration (0.55s) + hold (0.5s)
//   approx 0.15 + 0.065*11 + 0.55 + 0.5  approx 1.9 s
const OVERLAY_EXIT_DELAY_MS =
  150 + // delayChildren
  Math.round(65 * CHARS.length) + // stagger total
  550 + // last letter duration
  500; // hold pause after last letter

// ─── Component ────────────────────────────────────────────────────────────────

export function Onboarding() {
  const [shouldShow, setShouldShow] = useState(false);
  const [visible, setVisible] = useState(true);

  // 1. Determine whether to show on mount
  useEffect(() => {
    try {
      const already = sessionStorage.getItem(SESSION_KEY);
      if (!already) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setShouldShow(true);
      }
    } catch {
      // sessionStorage unavailable (private mode edge cases) — skip silently
    }
  }, []);

  // 2. Schedule the overlay exit
  useEffect(() => {
    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, OVERLAY_EXIT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [shouldShow]);

  // 3. Don't mount anything if already shown this session
  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="onboarding-overlay"
          /**
           * Exit: slide the entire overlay up out of the viewport.
           * Using translateY(-100%) so it smoothly uncovers the page behind.
           */
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          style={{
            position: "fixed",
            inset: 0,
            // Sits above CustomCursor (z-[9999]) and everything else
            zIndex: 99999,
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Prevent any scroll bleed-through while overlay is present
            overflow: "hidden",
          }}
          // No enter animation — it should be visible from the very first frame
          initial={{ y: 0 }}
          animate={{ y: 0 }}
        >
          {/* Letter container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label={NAME}
            style={{
              display: "flex",
              alignItems: "baseline",
              // Clip letters while they animate up so they don't bleed outside
              overflow: "hidden",
              // Extra vertical padding so descenders/ascenders aren't clipped
              padding: "0.1em 0",
            }}
          >
            {CHARS.map((char, i) =>
              char === " " ? (
                // Render the word-break as a non-animated spacer
                <span
                  key={`space-${i}`}
                  style={{
                    display: "inline-block",
                    // Matches the em-based gap that a real word space would produce
                    width: "0.35em",
                  }}
                />
              ) : (
                <motion.span
                  key={`${char}-${i}`}
                  variants={letterVariants}
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    // Responsive font size: increased slightly
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--color-lime-accent)",
                    // Prevent layout shifts
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
