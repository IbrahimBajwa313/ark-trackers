import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WhatsAppButton } from "@/components/whatsapp-button";

// 1. Configure fonts with CSS variables for better performance
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://arktrackers.com";

export const metadata: Metadata = {
  // 2. Dynamic Title System (e.g., "Pricing | Ark Trackers")
  title: {
    default: "Ark Trackers - Real-Time Vehicle Tracking",
    template: "%s | Ark Trackers",
  },
  description:
    "Secure, reliable vehicle tracking with real-time GPS updates, theft alerts, and comprehensive trip history. Peace of mind for every journey.",
  keywords: [
    "Vehicle Tracking",
    "GPS Tracker",
    "Car Security",
    "Fleet Management",
    "Ark Trackers",
    "Real-time GPS",
  ],
  metadataBase: new URL(SITE_URL),

  // 3. Robots Instructions (Essential for indexing)
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

  alternates: {
    canonical: "/",
  },

  // 4. Social Media Previews (Open Graph)
  openGraph: {
    title: "Ark Trackers - Real-Time Vehicle Tracking",
    description:
      "Secure, reliable vehicle tracking with real-time GPS updates, theft alerts, and comprehensive trip history.",
    url: SITE_URL,
    siteName: "Ark Trackers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png", // Ensure this file exists in your public folder
        width: 1200,
        height: 630,
        alt: "Ark Trackers - Secure Vehicle Tracking Solution",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ark Trackers - Real-Time Vehicle Tracking",
    description:
      "Secure, reliable vehicle tracking with real-time GPS updates and theft alerts.",
    images: ["/logo.png"],
  },

  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // 5. Verification (Add your code here later)
  verification: {
    google: "google-site-verification-code", // Replace with your actual code from Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 6. JSON-LD Structured Data
  // Connects your Logo, Description, and Contact info for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ark Trackers",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Secure, reliable vehicle tracking with real-time GPS updates, theft alerts, and comprehensive trip history.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-300-1234567", // REPLACE with your actual support number
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    sameAs: [
      // Add your actual social links here
      // 'https://facebook.com/arktrackers',
      // 'https://instagram.com/arktrackers'
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/models/car-transformed.glb" as="fetch" />
      </head>
      {/* 7. Applied font variables to body class */}
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Inject Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
