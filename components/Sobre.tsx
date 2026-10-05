import Image from "next/image";
import { Users } from "lucide-react";
import { loja } from "@/data/loja";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiamondMark } from "@/components/ui/Logo";

export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="cv-auto relative overflow-hidden bg-surface section-y"
    >
      <div className="container-site">
        {/* Título na largura toda: em 2 linhas no desktop (na coluna de texto viravam 4) */}
        <SectionHeading
          id="sobre-titulo"
          eyebrow="Sobre a loja"
          className="lg:max-w-none"
          titulo={
            <>
              Atendimento de perto,{" "}
              <span className="lg:block">com checagem de concessionária</span>
            </>
          }
        />

        <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Foto */}
          <div className="relative order-last lg:order-first">
            <div data-reveal="clip">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-ink shadow-card-hover">
                <Image
                  src={loja.sobre.foto}
                  alt={loja.sobre.fotoAlt}
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              data-reveal="zoom"
              style={{ "--d": "400ms" } as React.CSSProperties}
              className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-card bg-white p-4 pr-5 shadow-card-hover ring-1 ring-ink/5 sm:-right-4 lg:-right-8"
            >
              <DiamondMark className="h-9 w-auto" />
              <p className="leading-tight">
                <span className="block text-xs font-medium text-slate">
                  Em Salto desde
                </span>
                <span className="font-display text-lg font-extrabold text-ink">
                  {loja.fundacao}
                </span>
              </p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <div
              data-reveal
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="measure space-y-4 text-lead text-slate"
            >
              {loja.sobre.historia.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p
              data-reveal
              style={{ "--d": "200ms" } as React.CSSProperties}
              className="measure mt-6 flex items-start gap-3 rounded-btn border border-line bg-white p-4 text-ink"
            >
              <Users
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-primary"
              />
              {loja.sobre.equipe}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
