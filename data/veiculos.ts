/**
 * Estoque da vitrine. Loja fictícia: modelos, preços e km são ilustrativos.
 * Fotos: Pexels (licença gratuita, uso comercial permitido); créditos no README.
 *
 * A estrutura do tipo `Veiculo` espelha a futura tabela do Supabase, então a
 * interface não precisa mudar quando os dados vierem do banco.
 *
 * A vitrine mostra os carros com `destaque: true` e `status: "disponivel"`, na ordem
 * deste arquivo, até o limite de MAX_VITRINE (os primeiros da lista têm prioridade).
 * Para tirar um carro da vitrine sem apagar, use `status: "reservado"` ou `"vendido"`.
 *
 * Campos com `null` não aparecem no card; `preco: null` mostra "Sob consulta".
 */

export type Cambio = "Manual" | "Automático" | "CVT";
export type Combustivel = "Flex" | "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";
export type StatusVeiculo = "disponivel" | "reservado" | "vendido";

export type Veiculo = {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  /** Pode ficar vazia ("") se não souber */
  versao: string;
  /** Ano-modelo. null = não informado */
  ano: number | null;
  /** Número (ex.: 45915), texto livre (ex.: "Baixo km") ou null = não mostrar */
  km: number | string | null;
  /** Em reais, sem centavos. null = "Sob consulta" */
  preco: number | null;
  cambio: Cambio | null;
  combustivel: Combustivel | null;
  /** Usada no texto alternativo da foto */
  cor?: string;
  /** Caminhos em /public ou URLs (configure remotePatterns no next.config ao usar Supabase Storage) */
  fotos: string[];
  /**
   * Ponto de foco da foto no recorte 4:3 do card (CSS object-position).
   * Ex.: "50% 90%" mantém a parte de baixo, útil em fotos em pé com o carro embaixo.
   */
  fotoFoco?: string;
  /** Aparece na vitrine */
  destaque: boolean;
  status: StatusVeiculo;
  /** Exibe o selo "Novo no estoque" */
  novo?: boolean;
};

export const veiculos: Veiculo[] = [
  {
    id: "volvo-xc90-2020",
    slug: "volvo-xc90-t6-momentum-2020",
    marca: "Volvo",
    modelo: "XC90",
    versao: "T6 Momentum",
    ano: 2020,
    km: 48300,
    preco: 259900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Branco",
    fotos: ["/veiculos/volvo-xc90-2020.webp"],
    fotoFoco: "50% 72%",
    destaque: true,
    status: "disponivel",
    novo: true,
  },
  {
    id: "hyundai-santa-fe-2022",
    slug: "hyundai-santa-fe-2022",
    marca: "Hyundai",
    modelo: "Santa Fe",
    versao: "2.5 Turbo",
    ano: 2022,
    km: 36800,
    preco: 239900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Prata",
    fotos: ["/veiculos/hyundai-santa-fe-2022.webp"],
    destaque: true,
    status: "disponivel",
  },
  {
    id: "toyota-hilux-2022",
    slug: "toyota-hilux-srx-2022",
    marca: "Toyota",
    modelo: "Hilux",
    versao: "2.8 SRX 4x4",
    ano: 2022,
    km: 62400,
    preco: 249900,
    cambio: "Automático",
    combustivel: "Diesel",
    cor: "Preta",
    fotos: ["/veiculos/toyota-hilux-2022.webp"],
    fotoFoco: "50% 78%",
    destaque: true,
    status: "disponivel",
  },
  {
    id: "hyundai-tucson-2023",
    slug: "hyundai-tucson-2023",
    marca: "Hyundai",
    modelo: "Tucson",
    versao: "1.6 Turbo Limited",
    ano: 2023,
    km: 21500,
    preco: 189900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Vermelho",
    fotos: ["/veiculos/hyundai-tucson-2023.webp"],
    destaque: true,
    status: "disponivel",
    novo: true,
  },
  {
    id: "vw-golf-variant-2017",
    slug: "volkswagen-golf-variant-2017",
    marca: "Volkswagen",
    modelo: "Golf Variant",
    versao: "1.4 TSI Highline",
    ano: 2017,
    km: 84200,
    preco: 89900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Azul",
    fotos: ["/veiculos/vw-golf-variant-2017.webp"],
    fotoFoco: "50% 62%",
    destaque: true,
    status: "disponivel",
  },
  {
    id: "bmw-320i-2016",
    slug: "bmw-320i-2016",
    marca: "BMW",
    modelo: "320i",
    versao: "2.0 Sport",
    ano: 2016,
    km: 71900,
    preco: 109900,
    cambio: "Automático",
    combustivel: "Flex",
    cor: "Branca",
    fotos: ["/veiculos/bmw-320i-2016.webp"],
    fotoFoco: "50% 74%",
    destaque: true,
    status: "disponivel",
  },
  {
    id: "hyundai-tucson-n-line-2024",
    slug: "hyundai-tucson-n-line-2024",
    marca: "Hyundai",
    modelo: "Tucson",
    versao: "1.6 Turbo N Line",
    ano: 2024,
    km: 12300,
    preco: 209900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Cinza",
    fotos: ["/veiculos/hyundai-tucson-n-line-2024.webp"],
    destaque: true,
    status: "disponivel",
  },
  {
    id: "bmw-x5-2018",
    slug: "bmw-x5-xdrive35i-2018",
    marca: "BMW",
    modelo: "X5",
    versao: "xDrive35i M Sport",
    ano: 2018,
    km: "Baixo km",
    preco: 279900,
    cambio: "Automático",
    combustivel: "Gasolina",
    cor: "Branca",
    fotos: ["/veiculos/bmw-x5-2018.webp"],
    destaque: true,
    status: "disponivel",
  },
  {
    id: "honda-civic-type-r-2020",
    slug: "honda-civic-type-r-2020",
    marca: "Honda",
    modelo: "Civic",
    versao: "Type R",
    ano: 2020,
    km: 29700,
    preco: null,
    cambio: "Manual",
    combustivel: "Gasolina",
    cor: "Preto",
    fotos: ["/veiculos/honda-civic-type-r-2020.webp"],
    destaque: true,
    status: "disponivel",
  },
  {
    id: "toyota-land-cruiser-2006",
    slug: "toyota-land-cruiser-2006",
    marca: "Toyota",
    modelo: "Land Cruiser",
    versao: "4.2 Diesel 4x4",
    ano: 2006,
    km: 198500,
    preco: 169900,
    cambio: "Manual",
    combustivel: "Diesel",
    cor: "Branca",
    fotos: ["/veiculos/toyota-land-cruiser-2006.webp"],
    destaque: true,
    status: "disponivel",
  },
];

/** Quantidade máxima de carros na vitrine */
export const MAX_VITRINE = 10;

export const veiculosVitrine = veiculos.filter((v) => v.destaque && v.status === "disponivel").slice(0, MAX_VITRINE);

/** "Jeep Renegade 1.3 Turbo 2023", pulando o que não estiver preenchido */
export const nomeVeiculo = (v: Veiculo) => [v.marca, v.modelo, v.versao, v.ano].filter(Boolean).join(" ");
