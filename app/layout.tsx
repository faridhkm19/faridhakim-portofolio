import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { CustomCursor } from "./_components/custom-cursor";
import { Onboarding } from "./_components/onboarding";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Farid Hakim Portofolio",
    template: "%s | Farid Hakim",
  },
  description:
    "Farid Hakim is a Jakarta-based graphic designer specializing in brand identity, UI/UX design, and editorial design. Available for internship and full-time opportunities.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  keywords: [
    "graphic designer",
    "brand identity",
    "UI/UX design",
    "portfolio",
    "Jakarta",
    "Indonesia",
    "Farid Hakim",
  ],
  authors: [{ name: "Farid Hakim" }],
  creator: "Farid Hakim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faridhakim.design",
    siteName: "Farid Hakim Portfolio",
    title: "Farid Hakim — Web Developer & Graphic Designer",
    description:
      "Jakarta-based graphic designer specializing in brand identity, UI/UX, and editorial design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farid Hakim — Web Developer & Graphic Designer",
    description:
      "Jakarta-based graphic designer specializing in brand identity, UI/UX, and editorial design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Onboarding />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
