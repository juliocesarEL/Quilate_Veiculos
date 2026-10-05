import { describe, expect, it } from "vitest";
import {
  temErros,
  validarAnoCarro,
  validarAvaliacao,
  validarCpf,
  validarFinanciamento,
  validarNascimento,
  validarTelefone,
} from "@/lib/validacao";

// Data fixa: os testes não podem mudar de resultado conforme o dia em que rodam
const HOJE = new Date(2026, 9, 4); // 04/10/2026

describe("validarCpf", () => {
  it("aceita CPF com dígitos verificadores corretos, com ou sem máscara", () => {
    expect(validarCpf("529.982.247-25")).toBeUndefined();
    expect(validarCpf("52998224725")).toBeUndefined();
  });

  it("pede o CPF quando o campo está vazio", () => {
    expect(validarCpf("")).toBe("Informe seu CPF.");
  });

  it("avisa quando faltam dígitos", () => {
    expect(validarCpf("529.982.247")).toMatch(/incompleto/);
  });

  it("recusa dígito verificador errado", () => {
    expect(validarCpf("529.982.247-26")).toMatch(/não é válido/);
  });

  it("recusa sequências repetidas, que passariam na conta dos dígitos", () => {
    expect(validarCpf("111.111.111-11")).toMatch(/não é válido/);
  });
});

describe("validarNascimento", () => {
  it("aceita maior de idade", () => {
    expect(validarNascimento("15/08/1990", HOJE)).toBeUndefined();
  });

  it("aceita quem faz 18 anos exatamente hoje", () => {
    expect(validarNascimento("04/10/2008", HOJE)).toBeUndefined();
  });

  it("recusa quem faz 18 anos só amanhã", () => {
    expect(validarNascimento("05/10/2008", HOJE)).toMatch(/maiores de 18/);
  });

  it("recusa datas que não existem no calendário", () => {
    expect(validarNascimento("31/02/1990", HOJE)).toMatch(/não existe/);
    expect(validarNascimento("29/02/2001", HOJE)).toMatch(/não existe/); // 2001 não é bissexto
  });

  it("aceita 29 de fevereiro em ano bissexto", () => {
    expect(validarNascimento("29/02/2000", HOJE)).toBeUndefined();
  });

  it("recusa data no futuro", () => {
    expect(validarNascimento("01/01/2030", HOJE)).toMatch(/não existe/);
  });

  it("avisa quando a data está incompleta ou vazia", () => {
    expect(validarNascimento("15/08", HOJE)).toMatch(/incompleta/);
    expect(validarNascimento("", HOJE)).toBe("Informe sua data de nascimento.");
  });
});

describe("validarTelefone", () => {
  it("aceita celular com DDD e fixo com DDD", () => {
    expect(validarTelefone("(11) 98765-4321")).toBeUndefined();
    expect(validarTelefone("(11) 3456-7890")).toBeUndefined();
  });

  it("recusa celular de 11 dígitos sem o 9 na frente", () => {
    expect(validarTelefone("(11) 88765-4321")).toMatch(/incompleto/);
  });
});

describe("validarAnoCarro", () => {
  it("aceita até o ano que vem (modelo do ano seguinte)", () => {
    expect(validarAnoCarro("2027", 2026)).toBeUndefined();
    expect(validarAnoCarro("2028", 2026)).toMatch(/entre 1980 e 2027/);
  });

  it("recusa anos antigos demais", () => {
    expect(validarAnoCarro("1979", 2026)).toMatch(/entre 1980/);
  });
});

describe("validarFinanciamento", () => {
  it("não tem erros quando CPF e nascimento são válidos", () => {
    const erros = validarFinanciamento({ cpf: "529.982.247-25", nascimento: "15/08/1990" }, HOJE);
    expect(temErros(erros)).toBe(false);
  });

  it("aponta os dois campos quando o formulário está vazio", () => {
    const erros = validarFinanciamento({ cpf: "", nascimento: "" }, HOJE);
    expect(erros.cpf).toBeDefined();
    expect(erros.nascimento).toBeDefined();
    expect(temErros(erros)).toBe(true);
  });
});

describe("validarAvaliacao", () => {
  const valido = { nome: "Ana Lima", telefone: "(11) 98765-4321", marca: "Fiat", modelo: "Argo", ano: "2021", km: "40.000" };

  it("não tem erros com todos os campos preenchidos", () => {
    expect(temErros(validarAvaliacao(valido, 2026))).toBe(false);
  });

  it("considera espaços em branco como campo vazio", () => {
    expect(validarAvaliacao({ ...valido, marca: "   " }, 2026).marca).toMatch(/Informe a marca/);
  });
});
