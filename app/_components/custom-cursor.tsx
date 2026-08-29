"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Cursor states ────────────────────────────────────────────────────────────
type CursorState = "default" | "pointer" | "view" | "drag" | "clicking";

// Data attributes consumed by this component:
//   data-cursor="view"  → shows the custom cursor on project cards

// ─── Constants ────────────────────────────────────────────────────────────────

// Tighter spring for the custom cursor so it hugs the mouse
const DOT_SPRING  = { stiffness: 450, damping: 30, mass: 0.25 };

// ─── Component ────────────────────────────────────────────────────────────────
export function CustomCursor() {
  // Invisible until mouse enters viewport — avoids flash at (0,0)
  const [mounted, setMounted]         = useState(false);
  const [visible, setVisible]         = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Use the tighter spring for the single solid circle
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  // Track last detected state in a ref to avoid stale closure issues
  const stateRef = useRef<CursorState>("default");

  const updateState = useCallback((next: CursorState) => {
    if (stateRef.current !== next) {
      stateRef.current = next;
      setCursorState(next);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // Disable on touch / coarse pointer devices (tablets, phones)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    // ── Mouse position ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      // ── Contextual state detection ─────────────────────────────────────────
      const el = e.target as HTMLElement;

      // 1. Check for explicit data-cursor attribute on the element or any ancestor
      const cursorEl = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const label = cursorEl.dataset.cursor as CursorState;
        updateState(label ?? "view");
        return;
      }

      // 2. Check if mouse-button is held (clicking state)
      if (e.buttons === 1) {
        updateState("clicking");
        return;
      }

      // 3. Check for interactive elements → pointer state
      const isInteractive =
        !!el.closest("a") ||
        !!el.closest("button") ||
        window.getComputedStyle(el).cursor === "pointer";

      updateState(isInteractive ? "pointer" : "default");
    };

    const onDown = () => updateState("clicking");
    const onUp = (e: MouseEvent) => {
      // Re-evaluate what's under the cursor after releasing
      const el = e.target as HTMLElement;
      const cursorEl = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) { updateState(cursorEl.dataset.cursor as CursorState ?? "view"); return; }
      const isInteractive = !!el.closest("a") || !!el.closest("button");
      updateState(isInteractive ? "pointer" : "default");
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SSR guard — render nothing on server
  if (!mounted) return null;

  const isView = cursorState === "view";

  return (
    // Hidden on mobile via CSS (md:block) — also disabled by pointer media query above
    <div className="pointer-events-none hidden md:block">
      <motion.div
        className="fixed left-0 top-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: "var(--color-orange-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-bg)",
        }}
        animate={{
          width: isView ? 72 : 0,
          height: isView ? 72 : 0,
          opacity: isView && visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <AnimatePresence>
          {isView && visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <ArrowUpRight size={28} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
