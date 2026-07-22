"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Logo({ id = "logo" }: { id?: string }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-[var(--color-fg)] transition-opacity hover:opacity-70"
      id={id}
      aria-label="Home"
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--color-fg)]"
      >
        <motion.path
          d="M 22 78 V 22 H 50 M 22 50 H 78 M 50 22 V 78 M 78 22 V 78"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="transition-all duration-300 group-hover:stroke-[var(--color-lime-accent)]"
        />
      </motion.svg>
    </Link>
  );
}
