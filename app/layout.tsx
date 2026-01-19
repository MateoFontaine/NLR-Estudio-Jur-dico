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
  // Título ideal para buscadores (Google prefiere entre 50-60 caracteres)
  title: 'NLR Estudio Jurídico | Abogados en Buenos Aires',
  
  // Descripción con palabras clave (Ideal entre 150-160 caracteres)
  description: 'Tu consulta legal en manos responsables. Especialistas en Derecho Laboral, Penal, Civil, Sucesiones y Derecho Informático en CABA y GBA.',
  
  // Palabras clave para buscadores
  keywords: ['Abogados Buenos Aires', 'Derecho Laboral', 'Despidos', 'Derecho Penal', 'Sucesiones Argentina', 'Defensa del Consumidor', 'Estafas Virtuales'],
  
  // Configuración de cómo se ve en Redes Sociales (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: 'NLR Estudio Jurídico | Tu tranquilidad, nuestro compromiso',
    description: 'Asesoramiento legal integral especializado. Consultas por WhatsApp y atención inmediata.',
    url: 'https://www.estudionlr.com.ar', // Reemplaza con tu URL real cuando la tengas
    siteName: 'NLR Estudio Jurídico',
    images: [
      {
        url: '/icon.svg', // Se usará esta imagen al compartir el link
        width: 800,
        height: 600,
        alt: 'NLR Estudio Jurídico Logo',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },

  // Configuración para Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'NLR Estudio Jurídico',
    description: 'Especialistas en Derecho Laboral, Penal y Civil en Buenos Aires.',
    images: ['/Logo.png'],
  },

  // Iconos
  icons: {
    icon: '/NLR.png',
    apple: '/apple-icon.png', // Para cuando guardan el sitio en el inicio de un iPhone
  },

  // Robots le dice a Google que indexe todo el sitio
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}