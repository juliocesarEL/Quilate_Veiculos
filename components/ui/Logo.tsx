/**
 * Logo da Quilate Veículos (marca fictícia): um diamante lapidado desenhado em linha,
 * com a mesa no topo, a cintura e as facetas da coroa e do pavilhão.
 * Em fundo escuro, usa a versão negativa (verde claro e textos claros).
 */

/** Geometria da marca no viewBox (-1 -0.5 50 39). Também usada no hero e nos ícones. */
export const MARCA = {
  viewBox: "-1 -0.5 50 39",
  contorno: "10.5,1.5 37.5,1.5 46.5,11.5 24,35.5 1.5,11.5",
  cintura: "M1.5 11.5H46.5",
  /** Coroa em zigue-zague e pavilhão convergindo para a ponta */
  facetas: "M10.5 1.5L17 11.5L24 1.5L31 11.5L37.5 1.5M17 11.5L24 35.5L31 11.5",
  traco: 3,
  tracoFacetas: 2,
};

export function DiamondMark({ className = "", cor = "#2D6A53" }: { className?: string; cor?: string }) {
  return (
    <svg viewBox={MARCA.viewBox} className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={cor} strokeLinejoin="round" strokeLinecap="round">
        <polygon points={MARCA.contorno} strokeWidth={MARCA.traco} />
        <path d={MARCA.cintura} strokeWidth={MARCA.traco} />
        <path d={MARCA.facetas} strokeWidth={MARCA.tracoFacetas} />
      </g>
    </svg>
  );
}

type LogoProps = {
  /** "claro" = sobre fundo escuro (versão negativa); "escuro" = cores originais sobre fundo claro */
  tom?: "claro" | "escuro";
  /** "horizontal" para o header; "empilhada" com a marca em cima do nome */
  variante?: "horizontal" | "empilhada";
  className?: string;
};

export function Logo({ tom = "claro", variante = "horizontal", className = "" }: LogoProps) {
  const negativa = tom === "claro";
  const corMarca = negativa ? "#53B590" : "#2D6A53";
  const nome = negativa ? "text-[#E9ECEE]" : "text-[#6C6D6E]";
  const sub = negativa ? "text-[#A9B1B8]" : "text-[#7A7A7A]";
  const animacao = "transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110";

  if (variante === "empilhada") {
    return (
      <span className={`inline-flex flex-col items-center ${className}`}>
        <DiamondMark cor={corMarca} className={`h-11 w-auto ${animacao}`} />
        <span className={`mt-2.5 font-display text-[1.375rem] font-bold leading-none tracking-[0.08em] ${nome}`}>QUILATE</span>
        <span className={`mt-1.5 font-display text-[0.75rem] font-semibold leading-none tracking-[0.34em] ${sub}`}>VEÍCULOS</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <DiamondMark cor={corMarca} className={`h-8 w-auto shrink-0 ${animacao}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.125rem] font-bold tracking-[0.08em] ${nome}`}>QUILATE</span>
        <span className={`mt-1 font-display text-[0.625rem] font-semibold tracking-[0.36em] ${sub}`}>VEÍCULOS</span>
      </span>
    </span>
  );
}
