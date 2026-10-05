import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primaria" | "contorno-claro" | "contorno-escuro" | "branca";
type Tamanho = "md" | "lg";

const base =
  "btn-shine group/btn inline-flex min-h-11 whitespace-nowrap items-center justify-center gap-2.5 rounded-btn font-display font-bold tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variantes: Record<Variante, string> = {
  primaria: "bg-primary text-white shadow-[0_8px_24px_-10px_rgb(45_106_83/0.8)] hover:bg-primary-dark hover:shadow-glow",
  "contorno-claro": "border border-white/25 bg-white/5 text-white hover:border-primary-light hover:bg-white/10",
  "contorno-escuro": "border border-ink/15 bg-white text-ink hover:border-primary hover:text-primary-dark",
  branca: "bg-white text-primary-dark hover:bg-surface",
};

const tamanhos: Record<Tamanho, string> = {
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base sm:px-7",
};

export function classesBotao(variante: Variante = "primaria", tamanho: Tamanho = "md", extra = "") {
  return `${base} ${variantes[variante]} ${tamanhos[tamanho]} ${extra}`;
}

type Comum = { variante?: Variante; tamanho?: Tamanho; children: ReactNode; className?: string };

export function ButtonLink({
  variante,
  tamanho,
  className,
  children,
  externo,
  ...props
}: Comum & AnchorHTMLAttributes<HTMLAnchorElement> & { externo?: boolean }) {
  return (
    <a
      className={classesBotao(variante, tamanho, className)}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export function Button({ variante, tamanho, className, children, ...props }: Comum & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classesBotao(variante, tamanho, className)} {...props}>
      {children}
    </button>
  );
}
