"use client";

import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";

// ============================================================
// Lenis configuration
// Notes on choices:
//   lerp: 0.1        — gentle, smooth interpolation; feels natural without
//                       being sluggish. Lower = smoother but slower.
//   smoothWheel: true — enable smooth scrolling for wheel events (default)
//   syncTouch: false  — keep native momentum scroll on touch devices; Lenis
//                       smooth wheel is for pointer devices only
//   autoRaf: true     — Lenis manages its own rAF loop; no manual
//                       requestAnimationFrame needed in userland
//   stopInertiaOnNavigate: true — stops Lenis inertia when Next.js navigates
//                       to a new route, preventing scroll position carry-over
//                       and conflicts with Framer Motion whileInView triggers
// ============================================================
const LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
  autoRaf: true,
  stopInertiaOnNavigate: true,
} as const;

// ============================================================
// Root Providers
// ReactLenis with root=true creates a global Lenis instance that
// wraps document.documentElement — identical to the manual approach
// but without the imperative useEffect boilerplate.
// ThemeProvider wraps the outside so the html[class] attribute is
// set before Lenis initialises (avoids a flash of wrong scroll style).
// ============================================================
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange={false}
    >
      <ReactLenis root options={LENIS_OPTIONS}>
        <ScrollToTop />
        {children}
      </ReactLenis>
    </ThemeProvider>
  );
}
