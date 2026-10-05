import type { ReactNode } from "react";

type Props = {
  icone: ReactNode;
  titulo: string;
  tituloId: string;
  texto: string;
  /** Atraso da animação de entrada, ex.: "120ms" */
  atraso?: string;
  children: ReactNode;
};

/** Card que envolve cada formulário: ícone, título, explicação e o formulário. */
export function CartaoFormulario({ icone, titulo, tituloId, texto, atraso = "0ms", children }: Props) {
  return (
    <div
      data-reveal
      style={{ "--d": atraso } as React.CSSProperties}
      className="group relative flex flex-col overflow-hidden rounded-card border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      {/* Faixa de destaque: cresce ao passar o mouse ou ao focar um campo */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left bg-linear-to-r from-primary-light via-primary to-primary-dark transition-transform duration-700 ease-[var(--ease-out-expo)] sm:scale-x-[0.25] sm:group-hover:scale-x-100 sm:group-focus-within:scale-x-100"
      />
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icone}</span>
        <div>
          <h3 id={tituloId} className="text-h3 font-bold text-ink">
            {titulo}
          </h3>
          <p className="mt-1.5 text-slate">{texto}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
