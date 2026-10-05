/**
 * Tudo que fala com o WhatsApp: montagem das mensagens, do link wa.me e a abertura
 * da conversa. As mensagens são funções puras (testadas em tests/lib/whatsapp.test.ts).
 */
import { loja } from "@/data/loja";
import { nomeVeiculo, type Veiculo } from "@/data/veiculos";
import { formatarPreco } from "@/lib/format";
import type { DadosAvaliacao, DadosFinanciamento } from "@/lib/validacao";

/** Monta um link wa.me com a mensagem já codificada. */
export function linkWhatsApp(mensagem: string = loja.mensagemPadrao, numero: string = loja.whatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Abre a conversa em outra aba. Se o navegador bloquear o pop-up,
 * abre na própria aba para o visitante não ficar sem resposta.
 */
export function abrirWhatsApp(url: string, navegador: Pick<Window, "open" | "location"> = window) {
  // Sem "noopener" nas features: com ele, window.open sempre retorna null
  const aba = navegador.open(url, "_blank");
  if (aba) aba.opener = null;
  else navegador.location.href = url;
}

/* ---------------- mensagens ---------------- */

export function mensagemVeiculo(v: Veiculo) {
  const carro = nomeVeiculo(v);
  return v.preco === null
    ? `Olá! Tenho interesse no ${carro}. Qual é o valor e ainda está disponível?`
    : `Olá! Tenho interesse no ${carro}, anunciado por ${formatarPreco(v.preco)}. Ainda está disponível?`;
}

export function mensagemFinanciamento(d: DadosFinanciamento) {
  return ["Olá! Quero simular um financiamento.", `CPF: ${d.cpf}`, `Data de nascimento: ${d.nascimento}`].join("\n");
}

export function mensagemAvaliacao(d: DadosAvaliacao) {
  return [
    "Olá! Quero avaliar meu carro.",
    `Nome: ${d.nome.trim()}`,
    `Telefone: ${d.telefone}`,
    `Carro: ${d.marca.trim()} ${d.modelo.trim()} ${d.ano}`,
    `Quilometragem: ${d.km} km`,
  ].join("\n");
}
