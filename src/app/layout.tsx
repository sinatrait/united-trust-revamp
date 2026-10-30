import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import "yet-another-react-lightbox/styles.css";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const organizationDescription =
  "The United Trust is an ISO 9001:2015 certified NGO dedicated to education, healthcare, and social welfare. Empowering minds and transforming communities for over 31 years.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theunitedtrust.in"),
  title: {
    template: "%s | The United Trust",
    default: "The United Educational & Social Welfare Trust | Empowering Communities",
  },
  description: organizationDescription,
  keywords:
    "NGO, charity, education trust, social welfare, United Trust, donate, community health, India",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The United Trust",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The United Educational & Social Welfare Trust",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/United-trust-logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "The United Educational & Social Welfare Trust",
  url: "https://www.theunitedtrust.in",
  logo: "https://www.theunitedtrust.in/United-trust-logo.svg",
  description: organizationDescription,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
