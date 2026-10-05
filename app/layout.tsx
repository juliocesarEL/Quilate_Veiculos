import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { enderecoCompleto, loja } from "@/data/loja";
import "./globals.css";

/*
 * Fontes servidas pelo próprio projeto (pacotes @fontsource-variable), sem baixar do
 * Google Fonts durante o build: na Vercel, o next/font/google com Turbopack falhava
 * ao buscar a Montserrat ("next/font/google queries have exactly one entry").
 * O subconjunto "latin" cobre todos os acentos do português.
 */
const montserrat = localFont({
  src: "../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const titulo = `${loja.nome} | Veículos seminovos em Salto/SP`;

export const metadata: Metadata = {
  metadataBase: new URL(loja.siteUrl),
  title: titulo,
  description: loja.descricao,
  applicationName: loja.nome,
  keywords: [
    "seminovos em Salto",
    "carros usados Salto SP",
    "loja de carros Salto",
    "financiamento de veículos",
    "laudo cautelar",
    loja.nome,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: loja.nome,
    title: titulo,
    description: loja.descricao,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${loja.nome}: ${loja.descricaoCurta}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: loja.descricao,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e1217",
  colorScheme: "light",
};

const horaValida = (h: string) => /^\d{2}:\d{2}$/.test(h);

/** Dados estruturados AutoDealer. Campos com placeholder ficam de fora. */
function jsonLd() {
  const horarios = loja.horarios
    .filter((h) => horaValida(h.abre) && horaValida(h.fecha))
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.diasSchema,
      opens: h.abre,
      closes: h.fecha,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${loja.siteUrl}/#loja`,
    name: loja.nome,
    description: loja.descricao,
    url: loja.siteUrl,
    logo: `${loja.siteUrl}/icon-512.png`,
    image: `${loja.siteUrl}/og.png`,
    telephone: loja.telefone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: loja.endereco.logradouro,
      addressLocality: loja.endereco.cidade,
      addressRegion: loja.endereco.uf,
      postalCode: loja.endereco.cep,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: loja.endereco.cidade },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`,
    geo: { "@type": "GeoCoordinates", latitude: loja.geo.lat, longitude: loja.geo.lng },
    sameAs: [loja.instagram.url],
    ...(horarios.length ? { openingHoursSpecification: horarios } : {}),
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Marca que o JS está ativo antes da primeira pintura (habilita as revelações ao rolar) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
