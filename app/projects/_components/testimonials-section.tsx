"use client";

import { testimonials } from "@/app/_lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/app/_components/scroll-animation";

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden
      className="text-[var(--color-lime-accent)]"
    >
      <path
        d="M0 24V14.4C0 10.4 1.2 7.06667 3.6 4.4C6 1.6 9.2 0 13.2 0L14.4 2.4C12 2.93333 10 4.06667 8.4 5.8C6.8 7.4 5.86667 9.33333 5.6 11.6H10.4V24H0ZM17.6 24V14.4C17.6 10.4 18.8 7.06667 21.2 4.4C23.6 1.6 26.8 0 30.8 0L32 2.4C29.6 2.93333 27.6 4.06667 26 5.8C24.4 7.4 23.4667 9.33333 23.2 11.6H28V24H17.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <div id="testimonials" className="mt-24 pt-12 border-t border-[var(--color-border)]">
      {/* Section header */}
      <Reveal className="mb-16 text-center max-w-2xl mx-auto">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
          Testimonials
        </p>
        <h2 className="font-heading text-3xl font-bold text-[var(--color-fg)] md:text-4xl">
          What People Say
        </h2>
        <p className="mt-4 text-[var(--color-fg-muted)]">
          Feedback from clients and collaborators on the projects we've worked on together.
        </p>
      </Reveal>

      {/* Testimonials grid */}
      <StaggerContainer
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.12}
      >
        {testimonials.map((t, i) => (
          <StaggerItem key={t.id} className="flex h-full">
            <article
              id={`testimonial-${t.id}`}
              className="relative flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 w-full h-full transition-all duration-300 hover:border-[var(--color-lime-accent)]/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            >
              {/* Quote icon */}
              <QuoteIcon />

              {/* Quote text */}
              <blockquote className="flex-1">
                <p className="text-[var(--color-fg-muted)] leading-relaxed text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Author */}
              <footer className="flex items-center gap-3">
                {/* Avatar placeholder circle */}
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex items-center justify-center">
                  <span className="font-heading text-sm font-bold text-[var(--color-lime-accent)]">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="not-italic font-heading font-semibold text-sm text-[var(--color-fg)]">
                    {t.name}
                  </cite>
                  <p className="text-xs text-[var(--color-fg-subtle)]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </footer>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* CTA to contact */}
      <Reveal className="mt-20 text-center">
        <div className="inline-block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] px-8 py-8 max-w-md mx-auto">
          <p className="font-heading text-lg font-semibold text-[var(--color-fg)] mb-2">
            Want to work together?
          </p>
          <p className="text-sm text-[var(--color-fg-muted)] mb-5">
            I'd love to hear about your project.
          </p>
          <a
            href="/contact"
            id="testimonials-cta"
            className="inline-block rounded-full bg-[var(--color-lime-accent)] px-6 py-2.5 font-heading text-sm font-semibold text-white dark:text-[var(--color-ink-950)] transition-all duration-300 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-lime-accent)_40%,transparent)] hover:bg-[var(--color-lime-accent-dark)]"
          >
            Get in touch →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
