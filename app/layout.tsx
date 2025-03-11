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
  title:
    "Sustaina: AI-powered Waste Management and Sustainability Tracking Platform",
  description:
    "Sustaina is an AI-powered platform designed to optimize waste management and track sustainability efforts. Our platform leverages advanced machine learning algorithms to provide actionable insights, helping organizations and consumers reduce waste, improve recycling rates, and achieve their sustainability goals.",
  keywords:
    "AI-powered waste management, sustainability tracking, waste reduction, recycling, sustainable living, eco-friendly, green lifestyle, sustainability, eco products",
  // author: "Sustaina Team",
  // viewport: "width=device-width, initial-scale=1.0",
  // robots: "index, follow",
  // openGraph: {
  //   title: "Sustaina: AI-powered Waste Management and Sustainability Tracking Platform",
  //   description: "Sustaina is an AI-powered platform designed to optimize waste management and track sustainability efforts.",
  //   url: "https://www.sustaina.com",
  //   type: "website",
  //   images: [
  //     {
  //       url: "https://www.sustaina.com/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Sustaina Logo",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@sustaina",
  //   title: "Sustaina: AI-powered Waste Management and Sustainability Tracking Platform",
  //   description: "Sustaina is an AI-powered platform designed to optimize waste management and track sustainability efforts.",
  //   image: "https://www.sustaina.com/twitter-image.jpg",
  // },
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
