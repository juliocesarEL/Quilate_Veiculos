import { Star } from "lucide-react";
import { depoimentos } from "@/data/depoimentos";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Estrelas({ nota }: { nota: number }) {
  return (
    <div role="img" aria-label={`Nota ${nota} de 5`} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-[1.125rem] ${i < nota ? "fill-[#F5C451] text-[#F5C451]" : "fill-white/15 text-white/15"}`}
        />
      ))}
    </div>
  );
}

export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="on-dark cv-auto relative isolate overflow-hidden bg-primary-dark section-y text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_85%_0%,rgb(83_181_144/0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_46px,rgb(255_255_255/0.025)_46px_47px)]" />
      </div>

      <div className="container-site">
        <div>
          <SectionHeading
            id="depoimentos-titulo"
            tom="escuro"
            eyebrow="Quem já comprou"
            titulo="O que os clientes contam depois da compra"
          />
        </div>

        <ul
          tabIndex={0}
          aria-label="Depoimentos de clientes"
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4"
        >
          {depoimentos.map((d, i) => (
            <li
              key={d.id}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
              className="w-[85%] shrink-0 snap-start xs:w-[19rem] md:w-auto"
            >
              <figure className="relative flex h-full flex-col rounded-card border border-white/15 bg-white/[0.07] p-6 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:bg-white/[0.1]">
                <Estrelas nota={d.nota} />
                <blockquote className="mt-5 flex-1 whitespace-pre-line leading-relaxed text-white/90">
                  <p>“{d.texto}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-base font-extrabold text-primary-dark"
                  >
                    {d.nome.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-bold leading-tight text-white">{d.nome}</span>
                    <span className="mt-0.5 block text-sm text-white/70">Depoimento ilustrativo</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-center text-sm text-white/70 md:hidden" aria-hidden="true">
          Arraste para o lado para ver mais
        </p>
      </div>
    </section>
  );
}
