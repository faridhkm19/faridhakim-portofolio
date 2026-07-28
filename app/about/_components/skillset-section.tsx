"use client";

import { useState, useEffect } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiFlutter,
  SiMysql,
  SiReact,
  SiAdobeillustrator,
  SiFigma,
  SiAdobephotoshop,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

// ============================================================
// Stack tools — 10 items, displayed in a 5 × 2 fixed grid
// Colors: official brand hex values from Simple Icons / brand guidelines
// ============================================================
interface StackTool {
  name: string;
  icon: IconType;
  color: string;
}

const stackTools: StackTool[] = [
  { name: "HTML5",             icon: SiHtml5,            color: "#E34F26" },
  { name: "CSS3",              icon: SiCss3,             color: "#264DE4" },
  { name: "JavaScript",        icon: SiJavascript,       color: "#F7DF1E" },
  { name: "Java",              icon: FaJava,             color: "#ED8B00" },
  { name: "Flutter",           icon: SiFlutter,          color: "#54C5F8" },
  { name: "MySQL",             icon: SiMysql,            color: "#4479A1" },
  { name: "React",             icon: SiReact,            color: "#61DAFB" },
  { name: "Adobe Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Figma",             icon: SiFigma,            color: "#F24E1E" },
  { name: "Adobe Photoshop",   icon: SiAdobephotoshop,   color: "#31A8FF" },
];

// ============================================================
// Logo box
//
// Desktop  (hover:hover) — pure CSS :hover controls grayscale + scale + label.
// Mobile   (hover:none)  — JS state `isActive` controls the same visuals.
//   • `showActive` is only true when isTouchDevice && isActive,
//     so laptop-with-touchscreen users stay on the CSS path.
//   • Inline styles override Tailwind's `grayscale` class when active.
//   • Same duration/easing on both paths for visual consistency.
// ============================================================
interface ToolLogoBoxProps extends StackTool {
  isActive: boolean;
  isTouchDevice: boolean;
  onTap: () => void;
}

function ToolLogoBox({ name, icon: Icon, color, isActive, isTouchDevice, onTap }: ToolLogoBoxProps) {
  // showActive is true only on genuine touch-only devices
  const showActive = isTouchDevice && isActive;

  return (
    <div
      aria-label={name}
      title={name}
      /* group + relative: CSS hover path; onClick + stopPropagation: tap path */
      className="group relative flex items-center justify-center aspect-square cursor-pointer"
      onClick={(e) => {
        e.stopPropagation(); // prevent section's "tap outside" handler from firing
        onTap();
      }}
    >
      {/* ── Icon ─────────────────────────────────────────────────── */}
      <div
        style={{
          width: "70%",
          height: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Touch-active: inline style overrides Tailwind's grayscale class
          ...(showActive && {
            filter: "grayscale(0)",
            transform: "scale(1.1)",
          }),
        }}
        className={[
          // transition covers both filter and transform on all paths
          "transition-[filter,transform] duration-300 ease-out",
          // Default: fully desaturated
          "grayscale",
          // Desktop hover — pointer devices only
          "[@media(hover:hover)]:group-hover:grayscale-0",
          "[@media(hover:hover)]:group-hover:scale-110",
        ].join(" ")}
      >
        <Icon style={{ width: "100%", height: "100%", color }} />
      </div>

      {/* ── Name label ───────────────────────────────────────────── */}
      <span
        style={showActive ? { opacity: 1 } : undefined}
        className={[
          "pointer-events-none",
          "absolute top-full left-1/2 -translate-x-1/2 mt-2",
          "text-[11px] font-medium tracking-wide whitespace-nowrap",
          "text-[var(--color-fg-muted)]",
          // Default: hidden
          "opacity-0",
          "transition-opacity duration-200 ease-out",
          // Desktop hover — pointer devices only
          "[@media(hover:hover)]:group-hover:opacity-100",
        ].join(" ")}
      >
        {name}
      </span>
    </div>
  );
}

// ============================================================
// Section
// ============================================================
export function SkillsetSection() {
  // Which tool is currently tapped (mobile active state)
  const [activeToolName, setActiveToolName] = useState<string | null>(null);

  // Detect touch-only device via matchMedia — runs only on client.
  // Using (hover: none) mirrors the CSS guard used on the desktop path.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsTouchDevice(mq.matches);
    // Update if the user connects/disconnects a mouse while on the page
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleTap = (toolName: string) => {
    // Tap same logo again → deactivate; tap new logo → switch active
    setActiveToolName((prev) => (prev === toolName ? null : toolName));
  };

  return (
    // onClick on the section root: tap anywhere outside a logo resets active state
    <div
      id="skillset"
      className="mb-20"
      onClick={() => setActiveToolName(null)}
    >
      {/* Section header */}
      <Reveal className="mb-16">
        <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
          My Stack
        </h2>
      </Reveal>

      {/* 5 × 2 tool grid — fixed 5 columns, gap consistent both axes */}
      <StaggerContainer
        className="grid grid-cols-5 gap-4"
        staggerDelay={0.08}
      >
        {stackTools.map((tool) => (
          <StaggerItem key={tool.name}>
            <ToolLogoBox
              {...tool}
              isActive={activeToolName === tool.name}
              isTouchDevice={isTouchDevice}
              onTap={() => handleTap(tool.name)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
