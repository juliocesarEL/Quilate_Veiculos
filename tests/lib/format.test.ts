import { describe, expect, it } from "vitest";
import { formatarKm, formatarPreco, idadePorData, mascaraCpf, mascaraData, mascaraMilhar, mascaraTelefone } from "@/lib/format";

describe("máscaras de digitação", () => {
  it("formata o CPF conforme o usuário digita", () => {
    expect(mascaraCpf("529")).toBe("529");
    expect(mascaraCpf("5299822")).toBe("529.982.2");
    expect(mascaraCpf("52998224725")).toBe("529.982.247-25");
    expect(mascaraCpf("529.982.247-2599")).toBe("529.982.247-25"); // ignora o excesso
  });

  it("formata a data como DD/MM/AAAA", () => {
    expect(mascaraData("1508")).toBe("15/08");
    expect(mascaraData("15081990")).toBe("15/08/1990");
  });

  it("formata celular e fixo", () => {
    expect(mascaraTelefone("11987654321")).toBe("(11) 98765-4321");
    expect(mascaraTelefone("1134567890")).toBe("(11) 3456-7890");
  });

  it("separa milhares na quilometragem", () => {
    expect(mascaraMilhar("45915")).toBe("45.915");
  });
});

describe("formatação de valores", () => {
  it("mostra preço em reais sem centavos", () => {
    expect(formatarPreco(78900)).toBe("R$ 78.900");
  });

  it("mostra quilometragem com separador de milhar", () => {
    expect(formatarKm(159000)).toBe("159.000 km");
  });
});

describe("idadePorData", () => {
  const hoje = new Date(2026, 9, 4);

  it("calcula a idade considerando se o aniversário já passou", () => {
    expect(idadePorData("04/10/2000", hoje)).toBe(26);
    expect(idadePorData("05/10/2000", hoje)).toBe(25);
  });

  it("devolve null para data inexistente", () => {
    expect(idadePorData("31/04/2000", hoje)).toBeNull();
  });
});
