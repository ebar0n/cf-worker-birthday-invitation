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
  title: "Fiesta de Cumpleaños de Luciano",
  description: "¡Luciano Baron cumple 4 años! Te invitamos a celebrar con nosotros.",
  openGraph: {
    title: "Fiesta de Cumpleaños de Luciano",
    description: "¡Luciano Baron cumple 4 años! Te invitamos a celebrar con nosotros.",
    images: ['/photo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
