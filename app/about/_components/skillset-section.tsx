"use client";

import { skillGroups } from "@/app/_lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";

import { SiAdobeillustrator, SiAdobephotoshop, SiFigma, SiCanva, SiAffinitydesigner } from "react-icons/si";
import { Lightbulb, MessageCircle, ClipboardList, Target } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Figma": <SiFigma color="#F24E1E" size={16} />,
  "Adobe Illustrator": <SiAdobeillustrator color="#FF9A00" size={16} />,
  "Adobe Photoshop": <SiAdobephotoshop color="#31A8FF" size={16} />,
  "Canva": <SiCanva color="#00C4CC" size={16} />,
  "Affinity Designer": <SiAffinitydesigner color="#1B72BA" size={16} />,
  "Creative Direction": <Lightbulb className="w-4 h-4 text-[var(--color-fg-subtle)]" />,
  "Client Communication": <MessageCircle className="w-4 h-4 text-[var(--color-fg-subtle)]" />,
  "Project Management": <ClipboardList className="w-4 h-4 text-[var(--color-fg-subtle)]" />,
  "Design Strategy": <Target className="w-4 h-4 text-[var(--color-fg-subtle)]" />,
};

// Animated skill tag
function SkillTag({ name }: { name: string }) {
  const icon = iconMap[name];

  return (
    <div className="group flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 transition-colors hover:border-[var(--color-lime-accent)] hover:bg-[var(--color-lime-accent)]/10">
      {icon}
      <span className="text-sm font-medium text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-lime-accent)]">{name}</span>
    </div>
  );
}

export function SkillsetSection() {
  return (
    <div id="skillset" className="mb-20">
      {/* Section header */}
      <Reveal className="mb-16">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
          Skills & Tools
        </p>
        <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
          My Skillset
        </h2>
        <p className="mt-4 max-w-lg text-[var(--color-fg-muted)]">
          The tools and skills I use to turn ideas into clear visuals and meaningful creative work.
        </p>
      </Reveal>

      {/* Skill groups */}
      <StaggerContainer
        className="grid gap-6 sm:grid-cols-2"
        staggerDelay={0.08}
      >
        {skillGroups.map((group) => (
          <StaggerItem key={group.category}>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 h-full flex flex-col">
              <h3 className="font-heading text-xl font-semibold text-[var(--color-fg)] mb-6">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                  />
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>


    </div>
  );
}
