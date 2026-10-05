"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import { linkWhatsApp } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Faq() {
  const [abertos, setAbertos] = useState<Set<string>>(() => new Set([faq[0].id]));
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  const alternar = (id: string) =>
    setAbertos((atual) => {
      const novo = new Set(atual);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });

  // Setas, Home e End navegam entre as perguntas (padrão WAI-ARIA de acordeão)
  function navegar(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const total = faq.length;
    const destino =
      e.key === "ArrowDown" ? (i + 1) % total
      : e.key === "ArrowUp" ? (i - 1 + total) % total
      : e.key === "Home" ? 0
      : e.key === "End" ? total - 1
      : null;
    if (destino === null) return;
    e.preventDefault();
    botoes.current[destino]?.focus();
  }

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="cv-auto bg-white section-y">
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-titulo"
            eyebrow="Perguntas frequentes"
            titulo="Antes de você perguntar"
            descricao="As dúvidas que mais aparecem no WhatsApp. Se a sua não estiver aqui, é só chamar."
          />
          <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties} className="mt-8">
            <ButtonLink href={linkWhatsApp("Olá! Tenho uma dúvida sobre a compra de um carro:")} externo variante="contorno-escuro">
              <WhatsAppIcon className="size-5 text-primary" />
              Perguntar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div data-reveal style={{ "--d": "100ms" } as React.CSSProperties} className="divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
            const aberto = abertos.has(item.id);
            const idBotao = `faq-botao-${item.id}`;
            const idPainel = `faq-painel-${item.id}`;
            return (
              <div key={item.id}>
                <h3 className="font-sans">
                  <button
                    ref={(el) => {
                      botoes.current[i] = el;
                    }}
                    id={idBotao}
                    type="button"
                    aria-expanded={aberto}
                    aria-controls={idPainel}
                    onClick={() => alternar(item.id)}
                    onKeyDown={(e) => navegar(e, i)}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.0625rem] font-bold text-ink transition-colors hover:text-primary-dark sm:text-lg"
                  >
                    {item.pergunta}
                    <span
                      aria-hidden="true"
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-spring)] ${
                        aberto ? "rotate-[135deg] border-primary bg-primary text-white" : "border-ink/15 text-ink group-hover:border-primary"
                      }`}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={idPainel} aria-labelledby={idBotao} className="accordion-panel" data-open={aberto}>
                  <div inert={!aberto}>
                    <p
                      className={`measure pb-6 pr-12 leading-relaxed text-slate transition-[opacity,transform] duration-500 ${
                        aberto ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                      }`}
                    >
                      {item.resposta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
