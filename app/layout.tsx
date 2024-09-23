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
  title: "🛡️ Filigraneur - Filigrane Facile et Sécurisé 🛡️",
  description:
    "Version SECURISÉE et OPEN SOURCE du site du gouvernement (qui lui présente des vulnérabilités)",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "filigrane",
    "filigraneur",
    "filigrane facile",
    "filigrane sécurisé",
  ],
  metadataBase: new URL("https://filigraneur.fr"),
  applicationName: "Filigraneur",
  robots: {
    index: true,
    follow: true,
  },
  creator: "CyberClarence",
  appleWebApp: {
    title: "Filigraneur",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    images: ["/og-image.png"],
    type: "website",
    siteName: "Filigrane Facile",
    locale: "fr-FR",
    url: "https://filigraneur.fr",
    title: "Filigraneur - Filigrane Facile et Sécurisé",
    description:
      "🇫🇷 Version SECURISÉE et OPEN SOURCE du site de l'état (qui lui présente des vulnérabilités)",
    countryName: "France",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-[100%] w-[100%]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center w-[100vw] h-[100%] overflow-auto select-none `}
      >
        <div className="h-full w-full flex flex-col relative overflow-auto select-none">
          {children}
        </div>
      </body>
    </html>
  );
}
