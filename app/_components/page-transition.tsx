"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * PageTransition
 *
 * Wraps page content with AnimatePresence so that each route change
 * triggers a fade + slide-up enter and a fade + slide-down exit.
 *
 * Architecture note (Next.js App Router):
 *   - layout.tsx is a Server Component → cannot use hooks directly.
 *   - This client component acts as the boundary, reading `pathname`
 *     via usePathname() to produce a stable, unique key per route.
 *   - `mode="wait"` ensures the exit animation finishes before the
 *     entering page mounts, preventing double-render visual overlap.
 *
 * Coexistence with React <ViewTransition>:
 *   - AnimatePresence operates at the React/DOM layer (opacity, transform).
 *   - <ViewTransition> operates at the browser CSS layer (view-transition-*).
 *   - They animate different elements and do not conflict.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        /**
         * Enter: fade in + translate up from 20px below target position.
         * Exit:  fade out + translate up 10px (content drifts up as it leaves,
         *        matching the direction the entering page arrives from).
         */
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.45,
          ease: [0.4, 0, 0.2, 1], // matches --ease-smooth from design system
        }}
        // Ensure the wrapper itself doesn't create a stacking context
        // that clips children or interferes with position:sticky elements.
        style={{ minHeight: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
