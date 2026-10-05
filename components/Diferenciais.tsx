import { ArrowLeftRight, FileSearch, ShieldCheck, ClipboardCheck } from "lucide-react";
import { loja } from "@/data/loja";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightGroup } from "@/components/ui/SpotlightGroup";

const itens = [
  {
    icone: FileSearch,
    titulo: "Procedência verificada",
    texto:
      "Antes de entrar no estoque, consultamos débitos, multas, restrições judiciais e financeiras e histórico de leilão e sinistro.",
  },
  {
    icone: ClipboardCheck,
    titulo: "Laudo cautelar",
    texto:
      "Vistoria feita por empresa especializada que confere chassi, motor e estrutura. Você vê o laudo antes de fechar negócio.",
  },
  {
    icone: ShieldCheck,
    titulo: "Garantia por escrito",
    texto: `Motor e câmbio com garantia de ${loja.garantia}. As condições ficam no contrato, sem combinado de boca.`,
  },
  {
    icone: ArrowLeftRight,
    titulo: "Aceitamos seu usado",
    texto:
      "Seu carro entra como parte do pagamento. A avaliação usa a tabela FIPE e o estado real do veículo.",
  },
];

export function Diferenciais() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-titulo"
      className="on-dark cv-auto relative isolate overflow-hidden bg-ink section-y text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-[min(80rem,100%)] -translate-x-1/2 bg-linear-to-r from-transparent via-primary-light/50 to-transparent" />
        <div className="absolute -right-40 top-1/3 size-[40rem] bg-[radial-gradient(closest-side,rgb(45_106_83/0.3),transparent)]" />
        <svg className="parallax absolute -left-24 bottom-0 h-[26rem] w-[26rem] opacity-[0.06]" viewBox="0 0 64 58">
          <polygon points="16,4 48,4 62,18 32,54 2,18" fill="none" stroke="#53B590" strokeWidth=".4" />
          <path d="M2,18 H62 M16,4 L18,18 L32,4 L46,18 L48,4 M18,18 L32,54 L46,18" fill="none" stroke="#53B590" strokeWidth=".3" />
        </svg>
      </div>

      <div className="container-site">
        <SectionHeading
          id="diferenciais-titulo"
          tom="escuro"
          eyebrow="Por que a Quilate"
          titulo="O que a gente confere para você não precisar desconfiar"
          descricao="Comprar seminovo não precisa ser uma aposta. Estes são os quatro compromissos que valem para todo carro da loja."
        />

        <SpotlightGroup className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {itens.map(({ icone: Icone, titulo, texto }, i) => (
            <div
              key={titulo}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              className="spotlight rounded-card border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-white/[0.05] sm:p-7"
            >
              <div className="gem-tile flex size-14 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark shadow-[0_10px_30px_-8px_rgb(45_106_83/0.8)]">
                <Icone aria-hidden="true" className="size-6 text-white" />
              </div>
              <h3 className="mt-7 text-h3 font-bold text-white">{titulo}</h3>
              <p className="mt-3 leading-relaxed text-white/75">{texto}</p>
            </div>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
