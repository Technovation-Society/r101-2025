import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technovation Society",
  description:
    "Join Technovation Society - A premier technology community fostering innovation, learning, and collaboration through divisions, activities, hackathons, and tech events. Discover your passion in technology with us.",
  keywords: [
    "technology society",
    "technovation",
    "hackathon",
    "tech community",
    "innovation",
    "programming",
    "software development",
    "technology events",
    "student organization",
    "tech divisions",
  ],
  authors: [{ name: "Technovation Society" }],
  creator: "Technovation Society",
  publisher: "Technovation Society",
  icons: {
    icon: [
      {
        url: "/hero/TECHSOC_Logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/hero/TECHSOC_Logo.png",
    apple: "/hero/TECHSOC_Logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://technovationsociety.org",
    siteName: "Technovation Society",
    title: "Technovation Society - Innovation Through Technology",
    description:
      "Join Technovation Society - A premier technology community fostering innovation, learning, and collaboration through divisions, activities, hackathons, and tech events.",
    images: [
      {
        url: "/hero/TECHSOC_Logo.png",
        width: 1200,
        height: 630,
        alt: "Technovation Society Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technovation Society - Innovation Through Technology",
    description:
      "Join Technovation Society - A premier technology community fostering innovation, learning, and collaboration through divisions, activities, hackathons, and tech events.",
    images: ["/hero/TECHSOC_Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
