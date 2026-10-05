/**
 * Regras de validação dos formulários. Funções puras: recebem o valor digitado e
 * devolvem a mensagem de erro, ou `undefined` quando o valor é válido.
 * Não dependem de React nem do navegador, então são testadas de forma isolada.
 */
import { apenasDigitos, cpfValido, idadePorData, telefoneValido } from "@/lib/format";

/** Mensagem de erro por campo do formulário (`undefined` = campo válido) */
export type Erros<T> = Partial<Record<keyof T, string>>;

export const IDADE_MINIMA_FINANCIAMENTO = 18;
const IDADE_MAXIMA_PLAUSIVEL = 110;
const ANO_MINIMO_CARRO = 1980;

export const temErros = <T>(erros: Erros<T>) => Object.values(erros).some(Boolean);

/* ---------------- campos ---------------- */

export function validarNome(valor: string) {
  const nome = valor.trim();
  if (!nome) return "Informe seu nome.";
  if (nome.length < 2) return "O nome precisa ter pelo menos 2 letras.";
  return undefined;
}

export function validarTelefone(valor: string) {
  if (!apenasDigitos(valor)) return "Informe um telefone com DDD.";
  if (!telefoneValido(valor)) return "Telefone incompleto. Use o formato (11) 99999-9999.";
  return undefined;
}

export function validarCpf(valor: string) {
  const digitos = apenasDigitos(valor);
  if (!digitos) return "Informe seu CPF.";
  if (digitos.length < 11) return "CPF incompleto. Use o formato 000.000.000-00.";
  if (!cpfValido(valor)) return "Esse CPF não é válido. Confira os números.";
  return undefined;
}

export function validarNascimento(valor: string, hoje = new Date()) {
  if (!valor) return "Informe sua data de nascimento.";
  if (valor.length < 10) return "Data incompleta. Use o formato DD/MM/AAAA.";
  const idade = idadePorData(valor, hoje);
  if (idade === null || idade < 0 || idade > IDADE_MAXIMA_PLAUSIVEL) return "Essa data não existe. Confira dia, mês e ano.";
  if (idade < IDADE_MINIMA_FINANCIAMENTO) return "O financiamento é só para maiores de 18 anos.";
  return undefined;
}

export function validarObrigatorio(valor: string, mensagem: string) {
  return valor.trim() ? undefined : mensagem;
}

export function validarAnoCarro(valor: string, anoAtual = new Date().getFullYear()) {
  if (!valor) return "Informe o ano do carro.";
  const ano = Number(valor);
  const anoMaximo = anoAtual + 1; // carros "ano que vem" já são vendidos no fim do ano
  if (valor.length !== 4 || ano < ANO_MINIMO_CARRO || ano > anoMaximo) return `Use um ano entre ${ANO_MINIMO_CARRO} e ${anoMaximo}.`;
  return undefined;
}

export function validarKm(valor: string) {
  return apenasDigitos(valor) ? undefined : "Informe a quilometragem. Se não souber, use um valor aproximado.";
}

/* ---------------- formulários ---------------- */

export type DadosFinanciamento = { cpf: string; nascimento: string };

export function validarFinanciamento(dados: DadosFinanciamento, hoje = new Date()): Erros<DadosFinanciamento> {
  return {
    cpf: validarCpf(dados.cpf),
    nascimento: validarNascimento(dados.nascimento, hoje),
  };
}

export type DadosAvaliacao = { nome: string; telefone: string; marca: string; modelo: string; ano: string; km: string };

export function validarAvaliacao(dados: DadosAvaliacao, anoAtual = new Date().getFullYear()): Erros<DadosAvaliacao> {
  return {
    nome: validarNome(dados.nome),
    telefone: validarTelefone(dados.telefone),
    marca: validarObrigatorio(dados.marca, "Informe a marca. Ex.: Chevrolet."),
    modelo: validarObrigatorio(dados.modelo, "Informe o modelo. Ex.: Onix LT."),
    ano: validarAnoCarro(dados.ano, anoAtual),
    km: validarKm(dados.km),
  };
}
