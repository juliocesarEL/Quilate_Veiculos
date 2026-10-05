import type { ReactNode } from "react";

type Props = {
  id: string;
  eyebrow: string;
  titulo: ReactNode;
  descricao?: ReactNode;
  tom?: "claro" | "escuro";
  alinhamento?: "esquerda" | "centro";
  className?: string;
};

/** Cabeçalho padrão das seções: sobretítulo, h2 (com id para aria-labelledby) e linha lapidada. */
export function SectionHeading({ id, eyebrow, titulo, descricao, tom = "claro", alinhamento = "esquerda", className = "" }: Props) {
  const escuro = tom === "escuro";
  const centro = alinhamento === "centro";
  return (
    <div data-reveal className={`${centro ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p
        className={`mb-4 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.22em] ${
          escuro ? "text-primary-light" : "text-primary"
        }`}
      >
        <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-current" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-h2 font-extrabold ${escuro ? "text-white" : "text-ink"}`}>
        {titulo}
      </h2>
      <span className={`facet-rule mt-5 ${centro ? "mx-auto" : ""}`} aria-hidden="true" />
      {descricao && (
        <p className={`measure mt-5 text-lead ${centro ? "mx-auto" : ""} ${escuro ? "text-white/75" : "text-slate"}`}>{descricao}</p>
      )}
    </div>
  );
}
