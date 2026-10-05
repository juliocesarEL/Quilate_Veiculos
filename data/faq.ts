import { loja } from "@/data/loja";

export type Pergunta = { id: string; pergunta: string; resposta: string };

const horarios = loja.horarios.map((h) => `${h.dias.toLowerCase()}, das ${h.abre} às ${h.fecha}`).join("; ");

export const faq: Pergunta[] = [
  {
    id: "documentos",
    pergunta: "Quais documentos preciso para comprar um carro?",
    resposta:
      "Para comprar à vista: RG e CPF (ou CNH) e um comprovante de residência recente. Para financiar, o banco costuma pedir também comprovante de renda. Se a compra for no nome de uma empresa, traga contrato social e cartão CNPJ. Confirme a lista pelo WhatsApp antes da visita para não precisar voltar.",
  },
  {
    id: "entrada",
    pergunta: "Qual é a entrada mínima?",
    resposta: `Depende do carro, do banco e da análise de crédito. Em muitos casos é possível financiar com entrada a partir de ${loja.entradaMinima} do valor do veículo, e o seu usado pode ser a entrada. Faça a simulação pelo formulário e respondemos com os valores reais.`,
  },
  {
    id: "financiamento",
    pergunta: "Como funciona o financiamento?",
    resposta: `Você informa só o CPF e a data de nascimento no formulário de simulação. Consultamos ${loja.bancosParceiros} e voltamos com as opções de parcela e prazo, em até ${loja.prazoMaximoFinanciamento} meses. A aprovação depende da análise de crédito do banco, e você só assina depois de conferir todas as condições.`,
  },
  {
    id: "troca",
    pergunta: "Vocês aceitam meu carro na troca?",
    resposta:
      "Sim. Seu carro pode entrar como parte do pagamento. A avaliação leva em conta a tabela FIPE, a quilometragem, o estado de conservação e a documentação. Mande marca, modelo, ano e km pelo formulário de avaliação para receber uma primeira estimativa.",
  },
  {
    id: "garantia",
    pergunta: "Os carros têm garantia?",
    resposta: `Sim. Motor e câmbio têm garantia de ${loja.garantia}, com as condições descritas no contrato. Além disso, vale a garantia legal de 90 dias prevista no Código de Defesa do Consumidor.`,
  },
  {
    id: "laudo",
    pergunta: "O que é o laudo cautelar?",
    resposta:
      "É uma vistoria feita por empresa especializada que confere chassi, motor, estrutura e documentação do carro. Ela aponta se o veículo teve sinistro, passou por leilão ou tem alguma adulteração. Você pode ver o laudo antes de fechar negócio.",
  },
  {
    id: "pagamento",
    pergunta: "Quais são as formas de pagamento?",
    resposta:
      "À vista via PIX ou transferência, financiamento, carta de consórcio contemplada, seu carro na troca ou uma combinação dessas opções.",
  },
  {
    id: "visita",
    pergunta: "Como agendar uma visita ou test drive?",
    resposta: `Chame no WhatsApp, diga qual carro quer ver e o melhor horário para você. Deixamos o carro separado e pronto para o test drive. Atendemos ${horarios}.`,
  },
];
