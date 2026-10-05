import type { MetadataRoute } from "next";
import { loja } from "@/data/loja";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: loja.nome,
    short_name: "Quilate",
    description: loja.descricao,
    start_url: "/",
    display: "standalone",
    background_color: "#0e1217",
    theme_color: "#0e1217",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
