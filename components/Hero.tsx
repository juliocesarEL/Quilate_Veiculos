import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { loja } from "@/data/loja";
import { linkWhatsApp } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MARCA } from "@/components/ui/Logo";

const titulo = ["Seminovo", "com", "procedência,", "sem", "surpresa", "depois", "da", "compra."];

const checklist = ["Débitos e restrições", "Histórico de leilão e sinistro", "Laudo cautelar"];

const faixa = [
  "Procedência verificada",
  "Laudo cautelar",
  "Garantia por escrito",
  "Seu usado na troca",
  "Simulação de financiamento",
  "Salto/SP",
];

/* Posições em % da caixa da marca (viewBox -1 -0.5 50 39 da logo): x = (x+1)/50, y = (y+0.5)/39 */
const px = (x: number) => ((x + 1) / 50) * 100;
const py = (y: number) => ((y + 0.5) / 39) * 100;
const pct = (x: number, y: number) => ({ left: `${px(x)}%`, top: `${py(y)}%` });

/* Máscara com o desenho da marca: o reflexo passa só sobre o traço, nunca no vazio */
const MASCARA_MARCA = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${MARCA.viewBox}'><g fill='none' stroke='#000' stroke-linejoin='round' stroke-linecap='round'><polygon points='${MARCA.contorno}' stroke-width='${MARCA.traco}'/><path d='${MARCA.cintura}' stroke-width='${MARCA.traco}'/><path d='${MARCA.facetas}' stroke-width='${MARCA.tracoFacetas}'/></g></svg>`,
)}")`;

/* Brilhos nos vértices da marca */
const BRILHOS = [
  { x: 10.5, y: 1.5, d: "1.6s", tam: "9%" },
  { x: 46.5, y: 11.5, d: "2.8s", tam: "7%" },
  { x: 24, y: 35.5, d: "4.1s", tam: "8%" },
  { x: 37.5, y: 1.5, d: "5.2s", tam: "6%" },
];

/**
 * A marca da logo em tamanho grande, com um único degradê. Fica parada;
 * só o reflexo e as cintilações nos vértices se movem.
 */
function DiamanteMarca() {
  return (
    <div aria-hidden="true" className="relative aspect-[50/39] w-full">
      <svg viewBox={MARCA.viewBox} className="absolute inset-0 h-full w-full overflow-visible" focusable="false">
        <defs>
          <linearGradient id="hero-marca" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="37">
            <stop offset="0" stopColor="#5FC59B" />
            <stop offset="1" stopColor="#2D6A53" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#hero-marca)" strokeLinejoin="round" strokeLinecap="round">
          <polygon points={MARCA.contorno} strokeWidth={MARCA.traco} />
          <path d={MARCA.cintura} strokeWidth={MARCA.traco} />
          <path d={MARCA.facetas} strokeWidth={MARCA.tracoFacetas} />
        </g>
      </svg>

      <div
        className="mark-sheen absolute inset-0 overflow-hidden"
        style={{ maskImage: MASCARA_MARCA, WebkitMaskImage: MASCARA_MARCA, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
      >
        <div className="sheen absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.65),transparent)]" />
      </div>

      {BRILHOS.map((b) => (
        <span
          key={b.d}
          className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ ...pct(b.x, b.y), width: b.tam }}
        >
          <svg viewBox="-1 -1 2 2" className="twinkle block h-full w-full" style={{ "--d": b.d } as React.CSSProperties}>
            <path d="M0,-1 Q0,0 1,0 Q0,0 0,1 Q0,0 -1,0 Q0,0 0,-1Z" fill="#e9fff5" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="on-dark relative isolate overflow-hidden bg-ink pt-[calc(4.5rem+env(safe-area-inset-top))] text-white"
    >
      {/* Atmosfera: linhas de lapidação e brilhos esmeralda */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none" viewBox="0 0 100 100">
          {Array.from({ length: 14 }, (_, i) => (
            <line key={`a${i}`} x1={i * 9 - 30} y1="0" x2={i * 9 + 20} y2="100" stroke="#53B590" strokeWidth=".08" />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <line key={`b${i}`} x1={i * 9 + 20} y1="0" x2={i * 9 - 30} y2="100" stroke="#53B590" strokeWidth=".05" />
          ))}
        </svg>
        <div
          className="absolute -left-40 top-10 size-[46rem] bg-[radial-gradient(closest-side,rgb(45_106_83/0.38),transparent)]"
        />
        <div
          className="absolute -right-24 bottom-0 size-[50rem] bg-[radial-gradient(closest-side,rgb(26_63_49/0.7),transparent)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-site grid items-center gap-x-10 gap-y-10 pb-16 pt-10 sm:pt-14 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pb-24 lg:pt-6 short:grid-cols-2 short:gap-6 short:pb-10 short:pt-6">
        {/* Texto */}
        <div className="hero-exit relative z-10 max-w-2xl">
          <h1 id="hero-titulo" className="text-hero font-extrabold short:text-[clamp(1.75rem,4.2vw,2.5rem)]">
            {titulo.map((palavra, i) => (
              <span key={i}>
                <span className="hero-word" style={{ "--i": i } as React.CSSProperties}>
                  {palavra.startsWith("procedência") ? (
                    <span className="animate-[text-shine_4s_ease-in-out_1.8s_2_both] bg-[linear-gradient(110deg,#53B590_35%,#c9f5e1_50%,#53B590_65%)] bg-[length:250%_100%] bg-clip-text text-transparent">
                      {palavra}
                    </span>
                  ) : (
                    palavra
                  )}
                </span>
                {i < titulo.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>

          <p
            className="hero-fade measure mt-6 text-lead text-white/75 short:mt-3 short:text-base"
            style={{ "--d": "520ms" } as React.CSSProperties}
          >
            Antes de entrar no nosso pátio, cada carro passa por consulta de débitos e restrições, histórico de leilão e
            sinistro e laudo cautelar. Você escolhe com tudo na mesa e fala direto com a gente pelo WhatsApp.
          </p>

          <div
            className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap short:mt-5 short:flex-row"
            style={{ "--d": "680ms" } as React.CSSProperties}
          >
            <ButtonLink href={linkWhatsApp()} externo tamanho="lg">
              <WhatsAppIcon className="size-5" />
              Falar no WhatsApp
            </ButtonLink>
            <ButtonLink href="#estoque" variante="contorno-claro" tamanho="lg">
              Ver estoque
              <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </ButtonLink>
          </div>
        </div>

        {/* Visual: foto em destaque + diamante + checklist */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none short:max-w-md">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-white/10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <Image
              src={loja.heroFoto.src}
              alt={loja.heroFoto.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            {/* Degradê na base: integra a foto ao fundo escuro e dá contraste ao checklist */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
          </div>

          {/* Diamante da marca como emblema, saindo do canto do quadro */}
          <div className="absolute -right-3 -top-8 w-[26%] drop-shadow-[0_10px_24px_rgb(0_0_0/0.6)] sm:-right-6 sm:-top-12 sm:w-[24%]">
            <DiamanteMarca />
          </div>

          {/* Checklist de entrada: sobreposto à base da foto */}
          <div
            className="hero-fade relative z-10 mx-auto -mt-10 w-[calc(100%-2rem)] max-w-xs rounded-card border border-white/10 bg-ink-soft/95 p-4 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] sm:max-w-sm lg:max-w-none lg:px-5 short:hidden"
            style={{ "--d": "1300ms" } as React.CSSProperties}
          >
            <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-white/70">
              Checklist de entrada{" "}
              <span className="mt-0.5 block font-sans font-normal normal-case tracking-normal text-primary-light sm:mt-0 sm:inline">
                <span className="hidden sm:inline">· </span>vale para todo carro do estoque
              </span>
            </p>
            <ul className="mt-3 space-y-2.5 lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-2.5 lg:space-y-0">
              {checklist.map((item, i) => (
                <li
                  key={item}
                  className="check-item flex items-center gap-3 text-sm text-white"
                  style={{ "--d": `${1.7 + i * 0.38}s` } as React.CSSProperties}
                >
                  <span className="check-box flex size-6 shrink-0 items-center justify-center rounded-md bg-primary">
                    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                      <path className="check-path" d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="check-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Faixa reta com os compromissos da loja */}
      <div className="relative z-10">
        <div className="relative overflow-hidden border-y border-primary-light/30 bg-primary-dark py-3.5">
          <p className="sr-only">{faixa.join(" · ")}</p>
          <div aria-hidden="true" className="marquee-track flex w-max">
            {[0, 1].map((copia) => (
              <ul key={copia} className="flex shrink-0 items-center">
                {faixa.map((item) => (
                  <li key={item} className="flex items-center gap-8 pr-8 font-display text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
                    {item}
                    <span className="size-2 rotate-45 bg-primary-light" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
