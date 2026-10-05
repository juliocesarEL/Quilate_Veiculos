import { useState } from "react";
import { abrirWhatsApp, linkWhatsApp } from "@/lib/whatsapp";

/**
 * Abre o WhatsApp com a mensagem e guarda o link usado, para o aviso de
 * "não abriu? toque aqui" caso o navegador não troque de aba.
 */
export function useEnvioWhatsApp() {
  const [linkEnviado, setLinkEnviado] = useState<string | null>(null);

  function enviar(mensagem: string) {
    const url = linkWhatsApp(mensagem);
    setLinkEnviado(url);
    abrirWhatsApp(url);
  }

  return { linkEnviado, enviar, limpar: () => setLinkEnviado(null) };
}
