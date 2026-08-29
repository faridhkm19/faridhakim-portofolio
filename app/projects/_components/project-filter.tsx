"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types & Constants ────────────────────────────────────────────────────────

export type FilterCategory =
  | "All"
  | "Web Development"
  | "Front-End Development"
  | "UI/UX Design"
  | "Brand Identity"
  | "Marketing Design"
  | "Logo Design"
  | "Desktop Application";

export const FILTER_CATEGORIES: FilterCategory[] = [
  "All",
  "Web Development",
  "Front-End Development",
  "UI/UX Design",
  "Brand Identity",
  "Marketing Design",
  "Logo Design",
  "Desktop Application",
];

export interface ProjectFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  /** Count of projects per named category (excluding "All"). */
  categoryCounts: Record<string, number>;
  /** Total project count, used for the "All" row. */
  totalCount: number;
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  // Stable ref so the debounce effect never goes stale when onChange identity changes
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; });

  // Debounce: propagate to parent 300 ms after user stops typing
  useEffect(() => {
    const t = setTimeout(() => onChangeRef.current(local), 300);
    return () => clearTimeout(t);
  }, [local]);

  // Sync when parent resets externally (e.g., "Clear all filters")
  useEffect(() => {
    if (value === "") setLocal("");
  }, [value]);

  return (
    <div className="relative flex-1">
      {/* Magnifying glass icon */}
      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        id="project-search"
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search projects..."
        autoComplete="off"
        aria-label="Search projects by name"
        className="w-full rounded-full border border-[var(--color-border-btn)] bg-[var(--color-bg-card)] py-2.5 pl-11 pr-10 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none transition-all duration-200 focus:border-[var(--color-orange-accent)] focus:ring-2 focus:ring-[var(--color-orange-accent)]/20"
      />

      {/* Clear button — visible when there is text */}
      <AnimatePresence>
        {local && (
          <motion.button
            key="search-clear"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            onClick={() => { setLocal(""); onChange(""); }}
            aria-label="Clear search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-fg)]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Category List (shared by Dropdown and MobileFilterSheet) ─────────────────

function CategoryList({
  activeCategory,
  onSelect,
  categoryCounts,
  totalCount,
}: {
  activeCategory: FilterCategory;
  onSelect: (cat: FilterCategory) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}) {
  return (
    <ul role="listbox" aria-label="Filter by category" className="space-y-0.5">
      {FILTER_CATEGORIES.map((cat) => {
        const isActive = cat === activeCategory;
        const count = cat === "All" ? totalCount : (categoryCounts[cat] ?? 0);
        return (
          <li key={cat} role="option" aria-selected={isActive}>
            <button
              onClick={() => onSelect(cat)}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                isActive
                  ? "bg-[var(--color-orange-accent)]/10 text-[var(--color-orange-accent)]"
                  : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg)]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {/* Radio-style indicator */}
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-[var(--color-orange-accent)]"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[var(--color-orange-accent)]" />
                  )}
                </span>
                {cat}
              </span>
              <span
                className={`text-xs tabular-nums ${
                  isActive ? "text-[var(--color-orange-accent)]/70" : "text-[var(--color-fg-subtle)]"
                }`}
              >
                {count}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// ─── Category Dropdown (desktop & tablet ≥ 640px) ─────────────────────────────

function CategoryDropdown({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
}: {
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFiltered = activeCategory !== "All";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        id="filter-dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Filter by category"
        className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
          isFiltered
            ? "border-[var(--color-orange-accent)] bg-[var(--color-orange-accent)]/10 text-[var(--color-orange-accent)]"
            : "border-[var(--color-border-btn)] bg-[var(--color-bg-card)] text-[var(--color-fg-muted)] hover:border-[var(--color-orange-accent)]/50 hover:text-[var(--color-fg)]"
        }`}
      >
        {/* Funnel icon */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <span>{isFiltered ? activeCategory : "Filter"}</span>
        {/* Animated chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown-panel"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[240px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-2 shadow-2xl"
          >
            <CategoryList
              activeCategory={activeCategory}
              onSelect={(cat) => { onCategoryChange(cat); setOpen(false); }}
              categoryCounts={categoryCounts}
              totalCount={totalCount}
            />

            {/* Reset — only shown when a filter is active */}
            <AnimatePresence>
              {isFiltered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 overflow-hidden border-t border-[var(--color-border-subtle)] pt-1.5"
                >
                  <button
                    onClick={() => { onCategoryChange("All"); setOpen(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-orange-accent)]"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                    Reset filter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Filter Sheet (< 640px) ───────────────────────────────────────────

function MobileFilterSheet({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
}: {
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}) {
  const [open, setOpen] = useState(false);
  const isFiltered = activeCategory !== "All";

  // Lock body scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Funnel icon trigger */}
      <button
        id="mobile-filter-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open filter panel"
        className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          isFiltered
            ? "border-[var(--color-orange-accent)] bg-[var(--color-orange-accent)]/10 text-[var(--color-orange-accent)]"
            : "border-[var(--color-border-btn)] bg-[var(--color-bg-card)] text-[var(--color-fg-muted)]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {/* Active dot indicator */}
        {isFiltered && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-orange-accent)] ring-2 ring-[var(--color-bg)]" />
        )}
      </button>

      {/* Overlay + Sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Sheet panel */}
            <motion.div
              key="sheet-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 pb-10 pt-4"
            >
              {/* Drag handle */}
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[var(--color-border)]" />

              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-[var(--color-fg)]">
                  Filter Kategori
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close filter panel"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border-btn)] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <CategoryList
                activeCategory={activeCategory}
                onSelect={(cat) => { onCategoryChange(cat); setOpen(false); }}
                categoryCounts={categoryCounts}
                totalCount={totalCount}
              />

              {/* Reset button */}
              {isFiltered && (
                <button
                  onClick={() => { onCategoryChange("All"); setOpen(false); }}
                  className="mt-5 w-full rounded-full border border-[var(--color-border-btn)] py-3 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-orange-accent)] hover:text-[var(--color-orange-accent)]"
                >
                  Reset Filter
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Active Filter Badge ───────────────────────────────────────────────────────

function ActiveFilterBadge({
  category,
  onClear,
}: {
  category: FilterCategory;
  onClear: () => void;
}) {
  return (
    <AnimatePresence>
      {category !== "All" && (
        <motion.div
          key="active-badge"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-2"
        >
          <button
            onClick={onClear}
            aria-label={`Remove filter: ${category}`}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-orange-accent)]/30 bg-[var(--color-orange-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-orange-accent)] transition-all hover:bg-[var(--color-orange-accent)]/20"
          >
            {category}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ProjectFilter({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
}: ProjectFilterProps) {
  return (
    <div className="mb-10 space-y-3">
      {/* ── Row 1: Search bar + filter control ── */}
      <div className="flex items-center gap-3">
        <SearchBar value={searchQuery} onChange={onSearchChange} />

        {/* Desktop / tablet (≥ 640px): inline dropdown */}
        <div className="hidden sm:block">
          <CategoryDropdown
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            categoryCounts={categoryCounts}
            totalCount={totalCount}
          />
        </div>

        {/* Mobile (< 640px): icon trigger + bottom sheet */}
        <div className="block sm:hidden">
          <MobileFilterSheet
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            categoryCounts={categoryCounts}
            totalCount={totalCount}
          />
        </div>
      </div>

      {/* ── Row 2: Active filter badge ── */}
      <ActiveFilterBadge
        category={activeCategory}
        onClear={() => onCategoryChange("All")}
      />
    </div>
  );
}
