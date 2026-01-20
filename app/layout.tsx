import type { Metadata, Viewport } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "Passport to Engagement";
const COUPLE = "FG OFFR RO Sefah & FG OFFR TB Lamptey";
const DESCRIPTION =
  "Your official passport to our engagement — flight details, venue, and all the moments that matter.";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // <-- replace with your real domain later
  title: {
    default: `${SITE_NAME} • ${COUPLE}`,
    template: `%s • ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  category: "wedding",
  keywords: [
    "wedding",
    "engagement",
    "invitation",
    "passport invite",
    "Accra",
    "traditional marriage",
    "flight theme",
    "airline theme",
  ],
  authors: [{ name: COUPLE }],
  creator: COUPLE,

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} • ${COUPLE}`,
    description: DESCRIPTION,
    locale: "en_GB",
    // Put an image in /public/og.jpg (1200x630) when you're ready
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} • ${COUPLE}`,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },

  // Nice small touch: discourages indexing if you want it private.
  // If you want Google to index it, delete this entire "robots" block.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1D26",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={[
          playfair.variable,
          raleway.variable,
          "antialiased",
          // default font stack: body uses raleway, headings can use playfair via classes
          "font-sans",
          "bg-[#0b0b0c]",
          "text-white",
        ].join(" ")}
      >
        {/* Subtle “flight / passport” ambient layer. Keep it very light */}
        <div
          aria-hidden
          className="fixed inset-0 -z-10 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(212,175,55,0.16), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06), transparent 55%)",
          }}
        />

        {children}
      </body>
    </html>
  );
}
