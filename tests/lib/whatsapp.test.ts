import { describe, expect, it, vi } from "vitest";
import { abrirWhatsApp, linkWhatsApp, mensagemFinanciamento } from "@/lib/whatsapp";

describe("mensagens do WhatsApp", () => {
  it("monta a mensagem de financiamento com CPF e nascimento, uma informação por linha", () => {
    expect(mensagemFinanciamento({ cpf: "529.982.247-25", nascimento: "15/08/1990" })).toBe(
      "Olá! Quero simular um financiamento.\nCPF: 529.982.247-25\nData de nascimento: 15/08/1990",
    );
  });

  it("codifica a mensagem no link wa.me (acentos, quebras de linha e barras)", () => {
    const link = linkWhatsApp("Olá!\nData: 15/08/1990", "5511999999999");
    expect(link.startsWith("https://wa.me/5511999999999?text=")).toBe(true);
    expect(decodeURIComponent(link.split("text=")[1])).toBe("Olá!\nData: 15/08/1990");
    expect(link).not.toMatch(/[\s\n]/);
  });
});

describe("abrirWhatsApp", () => {
  const URL_WA = "https://wa.me/5511999999999?text=Ol%C3%A1";

  it("abre em outra aba e corta o acesso da aba nova à página (opener)", () => {
    const aba = { opener: {} as Window | null };
    const navegador = { open: vi.fn().mockReturnValue(aba), location: { href: "" } };
    abrirWhatsApp(URL_WA, navegador as unknown as Window);
    expect(navegador.open).toHaveBeenCalledWith(URL_WA, "_blank");
    expect(aba.opener).toBeNull();
    expect(navegador.location.href).toBe("");
  });

  it("se o pop-up for bloqueado, abre na própria aba", () => {
    const navegador = { open: vi.fn().mockReturnValue(null), location: { href: "" } };
    abrirWhatsApp(URL_WA, navegador as unknown as Window);
    expect(navegador.location.href).toBe(URL_WA);
  });
});
