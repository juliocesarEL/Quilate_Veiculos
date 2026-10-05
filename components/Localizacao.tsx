import { Clock, MapPin, Navigation } from "lucide-react";
import { enderecoCompleto, loja } from "@/data/loja";
import { linkWhatsApp } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Localizacao() {
  const mapa = `https://www.google.com/maps?q=${encodeURIComponent(loja.mapaBusca)}&output=embed`;
  const rota = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loja.mapaBusca)}`;

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="on-dark cv-auto relative isolate overflow-hidden bg-ink section-y text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[40rem] bg-[radial-gradient(closest-side,rgb(45_106_83/0.3),transparent)]" />

      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <SectionHeading
            id="contato-titulo"
            tom="escuro"
            eyebrow="Localização e contato"
            titulo="Venha ver o carro de perto"
            descricao="Avise pelo WhatsApp antes de vir e deixamos o carro separado para o test drive."
          />

          <dl data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-10 space-y-6">
            <div className="flex gap-4">
              <dt className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-light">
                <MapPin aria-hidden="true" className="size-5" />
                <span className="sr-only">Endereço</span>
              </dt>
              <dd className="pt-0.5 text-white/85">
                <address className="not-italic">{enderecoCompleto}</address>
                <a
                  href={rota}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-light underline-offset-4 hover:underline"
                >
                  <Navigation aria-hidden="true" className="size-4" />
                  Traçar rota
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-light">
                <Clock aria-hidden="true" className="size-5" />
                <span className="sr-only">Horário de funcionamento</span>
              </dt>
              <dd className="pt-0.5 text-white/85">
                <ul className="space-y-1">
                  {loja.horarios.map((h) => (
                    <li key={h.dias} className="flex flex-wrap gap-x-2">
                      <span className="font-semibold text-white">{h.dias}:</span>
                      <span>
                        {h.abre} às {h.fecha}
                      </span>
                    </li>
                  ))}
                  <li className="text-white/70">{loja.horarioObservacao}</li>
                </ul>
              </dd>
            </div>
          </dl>

          <div data-reveal style={{ "--d": "220ms" } as React.CSSProperties} className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <ButtonLink href={linkWhatsApp()} externo tamanho="lg">
              <WhatsAppIcon className="size-5" />
              Chamar no WhatsApp
            </ButtonLink>
            <ButtonLink href={loja.instagram.url} externo variante="contorno-claro" tamanho="lg">
              <InstagramIcon className="size-5" />
              Ver no Instagram
            </ButtonLink>
          </div>
        </div>

        <div
          data-reveal="zoom"
          style={{ "--d": "150ms" } as React.CSSProperties}
          className="relative min-h-[20rem] overflow-hidden rounded-card border border-white/10 bg-ink-soft shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] sm:min-h-[24rem] lg:min-h-0"
        >
          <iframe
            title={`Mapa com a localização da ${loja.nome}`}
            src={mapa}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] contrast-[1.05]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
