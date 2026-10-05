import type { NextConfig } from "next";

/** Cabeçalhos de segurança enviados em todas as respostas */
const cabecalhosSeguranca = [
  // Nenhum outro site pode exibir esta página dentro de um <iframe> (clickjacking)
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  // O navegador não "adivinha" o tipo de um arquivo diferente do declarado
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Para outros sites, envia só a origem (sem o caminho da página)
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // A página não usa câmera, microfone, localização nem pagamento
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Sempre HTTPS, por dois anos, incluindo subdomínios
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Não recria AGENTS.md / CLAUDE.md (instruções para assistentes de IA) ao rodar `next dev`
  agentRules: false,
  // Não anuncia o framework no cabeçalho X-Powered-By
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: cabecalhosSeguranca }];
  },
};

export default nextConfig;
