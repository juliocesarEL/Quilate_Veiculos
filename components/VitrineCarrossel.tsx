"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { loja } from "@/data/loja";
import { veiculosVitrine } from "@/data/veiculos";
import { linkWhatsApp } from "@/lib/whatsapp";
import { VeiculoCard } from "@/components/VeiculoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

/* Largura de cada slide por faixa de tela (--gap é o espaço entre slides):
   até 480px ≈ 85% (fatia do próximo) · 481–767 1,5 card · 768–1023 2 · 1024–1279 3 · 1280+ 4 */
const LARGURA_SLIDE =
  "basis-[85%] min-[481px]:basis-[calc((100%-var(--gap))/1.5)] md:basis-[calc((100%-var(--gap))/2)] lg:basis-[calc((100%-2*var(--gap))/3)] xl:basis-[calc((100%-3*var(--gap))/4)]";
const SIZES_SLIDE = "(min-width: 1280px) 290px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, (min-width: 481px) 62vw, 82vw";

const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function BotaoSeta({ direcao, desabilitado, onClick, className = "" }: { direcao: "anterior" | "proximo"; desabilitado: boolean; onClick: () => void; className?: string }) {
  const Icone = direcao === "anterior" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={desabilitado}
      aria-label={direcao === "anterior" ? "Carro anterior" : "Próximo carro"}
      className={`flex size-12 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-card transition-[background-color,color,opacity,scale] duration-300 hover:bg-primary hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-ink ${className}`}
    >
      <Icone aria-hidden="true" className="size-5" />
    </button>
  );
}

export function VitrineCarrossel() {
  const total = veiculosVitrine.length;
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [visiveis, setVisiveis] = useState<number[]>([0]);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(total <= 1);
  const [arrastando, setArrastando] = useState(false);
  const arraste = useRef<{ x: number; inicio: number; moveu: boolean; id: number } | null>(null);
  const bloquearClique = useRef(false);

  /** Distância de um slide para o próximo (largura + espaço) */
  const passo = useCallback(() => {
    const trilho = trilhoRef.current;
    const [a, b] = trilho ? Array.from(trilho.children as HTMLCollectionOf<HTMLElement>) : [];
    if (!a) return 0;
    return b ? b.offsetLeft - a.offsetLeft : a.offsetWidth;
  }, []);

  const rolar = useCallback(
    (slides: number) => {
      trilhoRef.current?.scrollBy({ left: slides * passo(), behavior: semMovimento() ? "auto" : "smooth" });
    },
    [passo],
  );

  // Setas desabilitadas nas pontas
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    let quadro = 0;
    const atualizar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        setNoInicio(trilho.scrollLeft <= 2);
        setNoFim(trilho.scrollLeft >= trilho.scrollWidth - trilho.clientWidth - 2);
      });
    };
    atualizar();
    trilho.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      cancelAnimationFrame(quadro);
      trilho.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  // Indicadores: quais slides estão (quase) inteiros na tela
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const naTela = new Set<number>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const i = Number((e.target as HTMLElement).dataset.indice);
          if (e.intersectionRatio >= 0.6) naTela.add(i);
          else naTela.delete(i);
        }
        if (naTela.size) setVisiveis(Array.from(naTela).sort((a, b) => a - b));
      },
      { root: trilho, threshold: [0, 0.6, 1] },
    );
    Array.from(trilho.children).forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, []);

  function teclado(e: KeyboardEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return; // não interfere em links e botões dentro do slide
    const acoes: Record<string, () => void> = {
      ArrowRight: () => rolar(1),
      ArrowLeft: () => rolar(-1),
      Home: () => rolar(-total),
      End: () => rolar(total),
    };
    if (acoes[e.key]) {
      e.preventDefault();
      acoes[e.key]();
    }
  }

  /* ---- Arrastar com o mouse (toque e trackpad já usam a rolagem nativa) ---- */
  function iniciarArraste(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trilhoRef.current) return;
    arraste.current = { x: e.clientX, inicio: trilhoRef.current.scrollLeft, moveu: false, id: e.pointerId };
  }

  function moverArraste(e: PointerEvent<HTMLDivElement>) {
    const a = arraste.current;
    const trilho = trilhoRef.current;
    if (!a || !trilho) return;
    const dx = e.clientX - a.x;
    if (!a.moveu && Math.abs(dx) > 6) {
      // Só captura o ponteiro depois que vira arraste: um clique simples continua chegando ao botão
      a.moveu = true;
      trilho.setPointerCapture(a.id);
      trilho.style.scrollSnapType = "none";
      setArrastando(true);
    }
    if (a.moveu) trilho.scrollLeft = a.inicio - dx;
  }

  function soltarArraste() {
    const a = arraste.current;
    const trilho = trilhoRef.current;
    arraste.current = null;
    if (!a?.moveu || !trilho) return;
    setArrastando(false);
    bloquearClique.current = true;
    window.setTimeout(() => (bloquearClique.current = false), 0);
    // Encaixa no slide mais próximo e devolve o scroll-snap quando a rolagem terminar
    const p = passo() || 1;
    trilho.scrollTo({ left: Math.round(trilho.scrollLeft / p) * p, behavior: semMovimento() ? "auto" : "smooth" });
    const devolverSnap = () => (trilho.style.scrollSnapType = "");
    if ("onscrollend" in trilho) trilho.addEventListener("scrollend", devolverSnap, { once: true });
    else window.setTimeout(devolverSnap, 450);
  }

  const primeiro = visiveis[0] + 1;
  const ultimo = visiveis[visiveis.length - 1] + 1;
  const contador = primeiro === ultimo ? `${primeiro} de ${total}` : `${primeiro}–${ultimo} de ${total}`;

  return (
    <section id="estoque" aria-labelledby="estoque-titulo" className="bg-surface pb-[clamp(4rem,2.6rem+6vw,8rem)] pt-[clamp(2.5rem,1.5rem+4vw,5rem)]">
      <div className="container-site">
        <SectionHeading
          id="estoque-titulo"
          eyebrow="Vitrine"
          titulo="Carros prontos para sair do pátio"
          descricao="Alguns dos carros que estão na loja agora. Toque em “Tenho interesse” e a mensagem já vai pronta para o WhatsApp."
        />

        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="@container relative mt-10 [--gap:1rem] sm:mt-12 md:[--gap:1.25rem] xl:[--gap:1.5rem]">
          <div
            ref={trilhoRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Carros em destaque. Use as setas do teclado para navegar."
            tabIndex={0}
            onKeyDown={teclado}
            onPointerDown={iniciarArraste}
            onPointerMove={moverArraste}
            onPointerUp={soltarArraste}
            onPointerCancel={soltarArraste}
            onClickCapture={(e) => {
              if (bloquearClique.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={`no-scrollbar mx-[calc(var(--gutter)*-1)] flex snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto overscroll-x-contain px-[var(--gutter)] py-3 scroll-px-[var(--gutter)] focus-visible:outline-offset-[-3px] ${
              arrastando ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
          >
            {veiculosVitrine.map((v, i) => (
              <div
                key={v.id}
                data-indice={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}`}
                className={`shrink-0 snap-start ${LARGURA_SLIDE}`}
              >
                <VeiculoCard veiculo={v} sizes={SIZES_SLIDE} />
              </div>
            ))}
          </div>

          {/* Setas sobre as bordas (desktop), centralizadas na foto: cqw = largura do carrossel */}
          <BotaoSeta
            direcao="anterior"
            desabilitado={noInicio}
            onClick={() => rolar(-1)}
            className="absolute left-0 top-[calc(0.75rem+(100cqw-2*var(--gap))/3*0.375)] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex xl:top-[calc(0.75rem+(100cqw-3*var(--gap))/4*0.375)]"
          />
          <BotaoSeta
            direcao="proximo"
            desabilitado={noFim}
            onClick={() => rolar(1)}
            className="absolute right-0 top-[calc(0.75rem+(100cqw-2*var(--gap))/3*0.375)] z-10 hidden translate-x-1/2 -translate-y-1/2 lg:flex xl:top-[calc(0.75rem+(100cqw-3*var(--gap))/4*0.375)]"
          />
        </div>

        {/* Setas (celular e tablet) + indicadores */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <BotaoSeta direcao="anterior" desabilitado={noInicio} onClick={() => rolar(-1)} className="lg:hidden" />
          <div className="flex min-w-24 flex-col items-center gap-2">
            <div aria-hidden="true" className="flex items-center gap-1.5">
              {veiculosVitrine.map((v, i) => (
                <span
                  key={v.id}
                  className={`h-2 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                    visiveis.includes(i) ? "w-6 bg-primary" : "w-2 bg-ink/20"
                  }`}
                />
              ))}
            </div>
            <p aria-live="polite" className="text-sm font-medium text-slate tabular-nums">
              {contador}
            </p>
          </div>
          <BotaoSeta direcao="proximo" desabilitado={noFim} onClick={() => rolar(1)} className="lg:hidden" />
        </div>

        <div data-reveal className="mt-10 flex flex-col justify-center gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink href={linkWhatsApp(loja.mensagemEstoque)} externo tamanho="lg">
            <WhatsAppIcon className="size-5" />
            Ver todos os carros no WhatsApp
          </ButtonLink>
          <ButtonLink href={loja.instagram.url} externo variante="contorno-escuro" tamanho="lg">
            <InstagramIcon className="size-5 text-primary" />
            Ver mais no Instagram
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
