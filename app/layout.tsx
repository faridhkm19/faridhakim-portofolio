import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { CustomCursor } from "./_components/custom-cursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Farid Hakim — Graphic Designer",
    template: "%s | Farid Hakim",
  },
  description:
    "Farid Hakim is a Jakarta-based graphic designer specializing in brand identity, UI/UX design, and editorial design. Available for internship and full-time opportunities.",
  icons: {
    icon: "/projects/gambarproject/FotoFaridHakim.webp",
    apple: "/projects/gambarproject/FotoFaridHakim.webp",
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
    title: "Farid Hakim — Graphic Designer",
    description:
      "Jakarta-based graphic designer specializing in brand identity, UI/UX, and editorial design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farid Hakim — Graphic Designer",
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
