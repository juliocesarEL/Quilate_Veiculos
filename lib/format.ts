const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const inteiro = new Intl.NumberFormat("pt-BR");

/** 72900 → "R$ 72.900" */
export const formatarPreco = (valor: number) => moeda.format(valor).replace(/ /g, " ");

/** 48200 → "48.200 km" */
export const formatarKm = (km: number) => `${inteiro.format(km)} km`;

export const apenasDigitos = (texto: string) => texto.replace(/\D/g, "");

/** Máscara de telefone brasileiro: (11) 99999-9999 ou (11) 3333-4444 */
export function mascaraTelefone(texto: string) {
  const d = apenasDigitos(texto).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Valida DDD + número fixo (10 dígitos) ou celular começando com 9 (11 dígitos) */
export function telefoneValido(texto: string) {
  const d = apenasDigitos(texto);
  if (d.length === 11) return d[2] === "9" && Number(d.slice(0, 2)) >= 11;
  if (d.length === 10) return Number(d.slice(0, 2)) >= 11;
  return false;
}

/** Máscara de CPF: 000.000.000-00 */
export function mascaraCpf(texto: string) {
  const d = apenasDigitos(texto).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");
}

/** Valida os dois dígitos verificadores do CPF */
export function cpfValido(texto: string) {
  const d = apenasDigitos(texto);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const digito = (n: number) => {
    let soma = 0;
    for (let i = 0; i < n; i++) soma += Number(d[i]) * (n + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

/** Máscara de data: DD/MM/AAAA */
export function mascaraData(texto: string) {
  const d = apenasDigitos(texto).slice(0, 8);
  return d.replace(/^(\d{2})(\d)/, "$1/$2").replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

/** "31/12/1990" → idade em anos, ou null se a data não existir */
export function idadePorData(texto: string, hoje = new Date()) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
  if (!m) return null;
  const [dia, mes, ano] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const data = new Date(ano, mes - 1, dia);
  if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) return null;
  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() < mes - 1 || (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)) idade--;
  return idade;
}

/** "48200" → "48.200" */
export function mascaraMilhar(texto: string, maxDigitos = 7) {
  const d = apenasDigitos(texto).slice(0, maxDigitos);
  return d ? inteiro.format(Number(d)) : "";
}

