import Link from "next/link";
import { personalInfo } from "@/app/_lib/data";
import { Logo } from "./logo";
import { isContactPageEnabled } from "@/app/_lib/config";

const socialLinks = [
  { href: personalInfo.socials.github, label: "Github", id: "footer-github" },
  { href: personalInfo.socials.linkedin, label: "LinkedIn", id: "footer-linkedin" },
  { href: personalInfo.socials.instagram, label: "Instagram", id: "footer-instagram" },
];

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-portfolio py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Logo id="footer-logo" />
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-orange-accent)]/30 bg-[var(--color-orange-accent)]/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-orange-accent)] animate-pulse" />
              <span className="text-xs text-[var(--color-orange-accent)] font-medium">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
              NAVIGATION
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-fg-muted)] underline-orange hover:text-[var(--color-fg)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)]">
              Social
            </p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    id={link.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-fg-muted)] underline-orange hover:text-[var(--color-fg)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  id="footer-email"
                  className="text-sm text-[var(--color-orange-accent)] underline-orange hover:text-[var(--color-orange-accent-dark)] transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--color-fg-subtle)]">
            © {year} Farid Hakim. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-fg-subtle)]">
            Developed and Designed in Jakarta, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
