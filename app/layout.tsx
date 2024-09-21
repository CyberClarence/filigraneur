import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Filigraneur - Filigrane Facile et Sécurisé",
  description:
    "Version SECURISÉE et OPEN SOURCE du site de l'état (qui lui présente des vulnérabilités)",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: ["/og-image.png"],
    type: "website",
    siteName: "Filigrane Facile",
    locale: "fr-FR",
    url: "https://filigraneur.fr",
    title: "Filigraneur - Filigrane Facile et sécurisé",
    description:
      "Version SECURISÉE et OPEN SOURCE du site de l'état (qui lui présente des vulnérabilités)",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
