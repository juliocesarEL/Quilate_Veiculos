/**
 * Depoimentos ILUSTRATIVOS: pessoas e textos inventados para a demonstração.
 * Em um site real, use avaliações verdadeiras, com autorização dos clientes.
 */

export type Depoimento = {
  id: string;
  nome: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Quebras de linha (\n) do texto são mantidas na exibição */
  texto: string;
};

export const depoimentos: Depoimento[] = [
  {
    id: "camila-r",
    nome: "Camila R.",
    nota: 5,
    texto:
      "Fui com meu pai procurar um SUV para a família. Mostraram o laudo antes mesmo de a gente pedir e explicaram cada item. Fechamos no mesmo fim de semana.",
  },
  {
    id: "joao-pedro-s",
    nome: "João Pedro S.",
    nota: 5,
    texto:
      "Dei meu carro antigo como entrada e a avaliação foi justa.\n\nA simulação do financiamento veio pelo WhatsApp no mesmo dia, com as parcelas certinhas.",
  },
  {
    id: "marcos-a",
    nome: "Marcos A.",
    nota: 5,
    texto: "Segundo carro que compro com eles. Atendimento direto, sem enrolação e sem surpresa depois da compra.",
  },
  {
    id: "patricia-l",
    nome: "Patrícia L.",
    nota: 5,
    texto: "Tirei todas as dúvidas pelo WhatsApp antes de ir até a loja.\nO carro estava exatamente como nas fotos.",
  },
];
