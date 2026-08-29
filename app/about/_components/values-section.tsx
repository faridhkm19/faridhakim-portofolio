"use client";

import { useState } from "react";
import { Code2, Layout, Crosshair, TrendingUp } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";

const values = [
  {
    icon: <Code2 size={50} />,
    title: "Structured Logic",
    desc: "Good code starts with clear thinking. I approach every problem by breaking it down into logical steps first, which keeps my work clean, maintainable, and easy to build on as projects grow.",
  },
  {
    icon: <Layout size={50} />,
    title: "User-Centered Design",
    desc: "My design background helps me create intuitive interfaces that put users first. Every screen is designed to make tasks simpler, clearer, and easier to complete.",
  },
  {
    icon: <Crosshair size={50} />,
    title: "Attention to Detail",
    desc: "Small details matter in every project. From UI spacing to database structure, I focus on consistency and quality to build reliable, maintainable solutions.",
  },
  {
    icon: <TrendingUp size={50} />,
    title: "Continuous Growth",
    desc: "Technology moves fast, and I'd rather keep up than fall behind. From front-end frameworks to database design, I'm always picking up new tools and refining the ones I already know.",
  },
];

export function ValuesSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="mb-20">
      <Reveal className="mb-16">
        <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
          My Core Values
        </h2>
      </Reveal>

      <StaggerContainer
        className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        staggerDelay={0.1}
      >
        {values.map((v, i) => (
          <StaggerItem key={v.title}>
            <div
              className={`flip-card${flippedCards.has(i) ? " flipped" : ""}`}
              onClick={() => toggleFlip(i)}
            >
              <div className="flip-card-inner">
                {/* Front face — icon + title, centered */}
                <div className="flip-card-front">
                  <span className="text-8xl text-[var(--color-orange-accent)]">
                    {v.icon}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-[var(--color-fg)] text-center">
                    {v.title}
                  </h3>
                </div>

                {/* Back face — title + description on accent bg */}
                <div className="flip-card-back">
                  <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                    {v.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
