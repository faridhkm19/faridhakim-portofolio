"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { isContactPageEnabled } from "@/app/_lib/config";

const allNavLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  // Contact link is conditionally included via the feature flag in config.ts
  { href: "/contact", label: "Contact" },
];

// Filter out Contact link when the feature flag is disabled
const navLinks = allNavLinks.filter(
  (link) => link.href !== "/contact" || isContactPageEnabled
);

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-[var(--color-border)] animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-fg)] transition-all duration-300 hover:border-[var(--color-orange-accent)] hover:bg-[var(--color-orange-accent)] hover:text-white"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="text-sm"
      >
        {isDark ? "☀" : "☾"}
      </motion.span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      id="site-navbar"
      style={{ viewTransitionName: "site-navbar" }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent"
        }`}
    >
      <div className="container-portfolio flex h-16 items-center justify-between">
        {/* Logo */}
        <Logo id="nav-logo" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${isActive
                    ? "text-[var(--color-orange-accent)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-0 rounded-lg bg-[var(--color-orange-accent)]/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] md:hidden"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="block h-0.5 w-5 rounded-full bg-[var(--color-fg)]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="block h-0.5 w-5 rounded-full bg-[var(--color-fg)]"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="block h-0.5 w-5 rounded-full bg-[var(--color-fg)]"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
      >
        <nav className="container-portfolio flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                    ? "bg-[var(--color-orange-accent)]/10 text-[var(--color-orange-accent)]"
                    : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg)]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </motion.header>
  );
}
