"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/app/_lib/data";
import { Reveal } from "@/app/_components/scroll-animation";

const socialLinks = [
  { name: "Behance", href: personalInfo.socials.behance, icon: "Be" },
  { name: "Dribbble", href: personalInfo.socials.dribbble, icon: "Dr" },
  { name: "LinkedIn", href: personalInfo.socials.linkedin, icon: "In" },
  { name: "Instagram", href: personalInfo.socials.instagram, icon: "Ig" },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate submission delay (replace with real API call)
    await new Promise((res) => setTimeout(res, 1500));

    setFormState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-portfolio">
        {/* Page header */}
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-lime-accent)]">
            Let&rsquo;s Talk
          </p>
          <h1 className="font-heading text-4xl font-bold text-[var(--color-fg)] md:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-[var(--color-fg-muted)]">
            Whether you have a project in mind, a question, or just want to say
            hello.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
          {/* Contact info sidebar */}
          <Reveal direction="right" className="lg:col-span-2">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
              {/* Email */}
              <div className="pb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)] mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  id="contact-email-link"
                  className="font-medium text-[var(--color-lime-accent)] underline-lime hover:text-[var(--color-lime-accent-dark)] transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Location */}
              <div className="py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)] mb-2">
                  Location
                </p>
                <p className="font-medium text-[var(--color-fg)]">
                  {personalInfo.location}
                </p>
                <p className="text-sm text-[var(--color-fg-muted)] mt-1">
                  Open to remote opportunities worldwide
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Social links */}
              <div className="pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-fg-subtle)] mb-4">
                  Find Me On
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      id={`contact-social-${s.name.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium text-[var(--color-fg-muted)] transition-all hover:border-[var(--color-lime-accent)]/40 hover:text-[var(--color-fg)]"
                    >
                      <span className="font-heading text-xs font-bold text-[var(--color-lime-accent)]">
                        {s.icon}
                      </span>
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal direction="left" className="lg:col-span-3">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-[var(--color-lime-accent)]/30 bg-[var(--color-bg-card)] p-10 text-center"
              >
                <span className="mb-4 text-4xl">✅</span>
                <h2 className="font-heading text-2xl font-bold text-[var(--color-fg)] mb-2">
                  Message Sent!
                </h2>
                <p className="text-[var(--color-fg-muted)] max-w-xs">
                  Thank you for reaching out. I&rsquo;ll get back to you within
                  1–2 business days.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-[var(--color-fg)]"
                    >
                      Full Name <span className="text-[var(--color-lime-accent)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none transition-all focus:border-[var(--color-lime-accent)] focus:ring-0 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-[var(--color-fg)]"
                    >
                      Email Address <span className="text-[var(--color-lime-accent)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none transition-all focus:border-[var(--color-lime-accent)] focus:ring-0 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-medium text-[var(--color-fg)]"
                  >
                    Subject <span className="text-[var(--color-lime-accent)]">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-fg)] outline-none transition-all focus:border-[var(--color-lime-accent)] focus:ring-0 focus:outline-none"
                  >
                    <option value="">Select a topic…</option>
                    <option value="internship">Internship Opportunity</option>
                    <option value="fulltime">Full-time Opportunity</option>
                    <option value="freelance">Freelance Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-[var(--color-fg)]"
                  >
                    Message <span className="text-[var(--color-lime-accent)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, company, or opportunity…"
                    className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none transition-all focus:border-[var(--color-lime-accent)] focus:ring-0 focus:outline-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  id="contact-submit"
                  type="submit"
                  disabled={formState === "submitting"}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-[var(--color-lime-accent)] py-3.5 font-heading text-sm font-semibold text-white dark:text-[var(--color-ink-950)] transition-all duration-300 disabled:opacity-60 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-lime-accent)_40%,transparent)] hover:bg-[var(--color-lime-accent-dark)]"
                >
                  {formState === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-[var(--color-ink-950)]/30 border-t-[var(--color-ink-950)]"
                      />
                      Sending…
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>

                <p className="text-center text-xs text-[var(--color-fg-subtle)]">
                  I typically respond within 1–2 business days.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
