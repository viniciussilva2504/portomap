import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Porto Map — Hand-drawn Maps & Guided Tours",
    template: "%s — Sharon Jemima",
  },
  description:
    "The Porto Map — hand-drawn maps, self-guided walking routes and intimate guided tours of Porto by artist Sharon Jemima.",
  keywords: [
    "Porto walking routes",
    "Porto hand-drawn map",
    "Porto guided tour",
    "Porto illustrated map",
    "self-guided Porto",
    "Porto art gallery",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://theportomap.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Porto Map",
    title: "The Porto Map — Hand-drawn Maps & Guided Tours",
    description:
      "Original ink illustrations, self-guided walking routes and intimate guided tours of Porto by artist Sharon Jemima.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Porto Map",
    description: "Hand-drawn maps and guided walks through Porto's soul.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
