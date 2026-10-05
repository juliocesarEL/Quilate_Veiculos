/**
 * Configurações da loja: tudo que é específico da loja fica aqui.
 *
 * A Quilate Veículos é FICTÍCIA (projeto de demonstração). Nome, endereço, CNPJ,
 * pessoas e depoimentos são inventados. WhatsApp e Instagram são os da Risen Studio.
 */

export type DiaSemana =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Horario = {
  /** Texto exibido na página, ex.: "Segunda a sexta" */
  dias: string;
  /** Usado no JSON-LD (dados estruturados do Google) */
  diasSchema: DiaSemana[];
  /** Formato HH:MM */
  abre: string;
  fecha: string;
};

export const loja = {
  nome: "Quilate Veículos",
  descricaoCurta: "Seminovos com procedência em Salto/SP",
  descricao:
    "Loja de veículos seminovos em Salto/SP. Carros com procedência verificada, laudo cautelar e garantia. Aceitamos seu usado na troca e simulamos o financiamento pelo WhatsApp.",

  /**
   * Usado em metadata, Open Graph e JSON-LD. Defina NEXT_PUBLIC_SITE_URL ao usar um domínio
   * próprio. Na Vercel, usa o endereço de produção automaticamente.
   */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  /**
   * Somente dígitos, com DDI 55 + DDD. Como a loja é fictícia, WhatsApp e Instagram
   * levam à Risen Studio, autora do projeto, para os testes chegarem a alguém de verdade.
   */
  whatsapp: "5511989587895",
  whatsappExibicao: "(11) 98958-7895",
  /** Formato E.164 para links tel: */
  telefone: "+5511989587895",
  telefoneExibicao: "(11) 98958-7895",

  mensagemPadrao: "Olá! Vim pelo site da Quilate Veículos e gostaria de mais informações.",
  mensagemEstoque: "Olá! Vim pelo site da Quilate Veículos. Pode me mandar os carros que estão disponíveis agora?",

  endereco: {
    logradouro: "Rua das Pedras, 500",
    bairro: "Centro",
    cidade: "Salto",
    uf: "SP",
    cep: "13320-000",
  },
  /** Texto buscado no Google Maps (mapa e "Traçar rota") */
  mapaBusca: "Centro, Salto - SP",
  /** Coordenadas usadas no JSON-LD */
  geo: { lat: -23.2003, lng: -47.2869 },

  horarios: [
    {
      dias: "Segunda a sexta",
      diasSchema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      abre: "08:30",
      fecha: "18:00",
    },
    { dias: "Sábado", diasSchema: ["Saturday"], abre: "08:30", fecha: "13:00" },
  ] satisfies Horario[],
  horarioObservacao: "Domingo: fechado",

  instagram: { usuario: "@risenstudio.dev", url: "https://www.instagram.com/risenstudio.dev/" },

  cnpj: "00.000.000/0001-00",
  razaoSocial: "Quilate Veículos Ltda.",

  fundacao: "2025",
  garantia: "3 meses",
  entradaMinima: "20%",
  prazoMaximoFinanciamento: "60",
  bancosParceiros: "os principais bancos e financeiras do mercado",

  sobre: {
    historia: [
      "A Quilate Veículos abriu as portas em 2025, em Salto. É uma loja nova e de atendimento próximo: quem mostra o carro, tira as dúvidas e faz a simulação do financiamento é a mesma pessoa, do primeiro contato até a entrega.",
      "Antes de entrar no pátio, todo carro passa por consulta de débitos e restrições, histórico de leilão e sinistro e laudo cautelar. Assim você compra sabendo exatamente o que está levando.",
    ],
    equipe:
      "Quem atende você: Rafael Moreira, fundador e consultor de vendas da Quilate. Ele também faz as simulações de financiamento.",
    foto: "/img/patio.webp",
    fotoAlt: "Pátio com fileiras de carros seminovos estacionados",
  },

  /** Foto do topo da página (proporção livre; o quadro do hero recorta em 4:3) */
  heroFoto: {
    src: "/img/hero.webp",
    largura: 1600,
    altura: 1100,
    alt: "Volvo XC90 branco estacionado em uma rua arborizada",
  },
};

export const enderecoCompleto = `${loja.endereco.logradouro}, ${loja.endereco.bairro}, ${loja.endereco.cidade}/${loja.endereco.uf}, CEP ${loja.endereco.cep}`;

export const navegacao = [
  { href: "#estoque", rotulo: "Estoque" },
  { href: "#diferenciais", rotulo: "Diferenciais" },
  { href: "#financiamento", rotulo: "Financiamento" },
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#faq", rotulo: "FAQ" },
  { href: "#contato", rotulo: "Contato" },
] as const;
