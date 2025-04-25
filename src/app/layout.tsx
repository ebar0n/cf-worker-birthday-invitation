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
  description: "¡Luciano Baron cumple 4 años! Confirma tu asistencia ingresando a esta URL.",
  openGraph: {
    title: "Fiesta de Cumpleaños de Luciano",
    description: "¡Luciano Baron cumple 4 años! Confirma tu asistencia ingresando a esta URL con tu código de invitación.",
    images: ['/photo.png'],
  },
  metadataBase: new URL('https://cf-worker-birthday-invitation.ebar0n.workers.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es-ES',
    },
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
