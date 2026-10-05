import Image from "next/image";
import { Calendar, Cog, Fuel, Gauge, Sparkles } from "lucide-react";
import { nomeVeiculo, type Veiculo } from "@/data/veiculos";
import { formatarKm, formatarPreco } from "@/lib/format";
import { linkWhatsApp, mensagemVeiculo } from "@/lib/whatsapp";
import { classesBotao } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type Props = { veiculo: Veiculo; sizes: string };

export function VeiculoCard({ veiculo: v, sizes }: Props) {
  const nome = nomeVeiculo(v);
  // Só mostra o que estiver preenchido
  const specs = [
    { icone: Calendar, rotulo: "Ano", valor: v.ano === null ? null : String(v.ano) },
    { icone: Gauge, rotulo: "Quilometragem", valor: typeof v.km === "number" ? formatarKm(v.km) : v.km },
    { icone: Cog, rotulo: "Câmbio", valor: v.cambio },
    { icone: Fuel, rotulo: "Combustível", valor: v.combustivel },
  ].filter((s): s is { icone: typeof Calendar; rotulo: string; valor: string } => s.valor !== null);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-ink/5 transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] focus-within:ring-2 focus-within:ring-primary hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={v.fotos[0]}
          alt={`${nome}${v.cor ? `, cor ${v.cor.toLowerCase()}` : ""}`}
          fill
          sizes={sizes}
          draggable={false}
          style={{ objectPosition: v.fotoFoco ?? "50% 50%" }}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgb(255_255_255/0.45)_50%,transparent_60%)] transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-x-full"
        />
        {v.novo && (
          <span className="btn-shine absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-display text-xs font-bold text-white shadow-[0_6px_16px_-6px_rgb(45_106_83/0.9)]">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Novo no estoque
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">{v.marca}</p>
        <h3 className="mt-1.5 text-h3 font-bold text-ink">
          {v.modelo}
          {v.versao && <span className="font-semibold text-slate"> {v.versao}</span>}
        </h3>

        {specs.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-slate">
          {specs.map(({ icone: Icone, rotulo, valor }) => (
            <div key={rotulo} className="flex min-w-0 items-center gap-2">
              <Icone aria-hidden="true" className="size-4 shrink-0 text-primary" />
              <dt className="sr-only">{rotulo}</dt>
              <dd className="truncate">{valor}</dd>
            </div>
          ))}
        </dl>
        )}

        {/* mt-auto alinha o preço entre cards; pt-5 garante o respiro quando o título quebra linha */}
        <div className="mt-auto pt-5">
          <p className="border-t border-line pt-4">
            <span className="block text-xs font-medium text-slate">Preço</span>
            <span className="font-display text-[1.625rem] font-extrabold leading-tight tracking-tight text-primary-dark tabular-nums">
              {v.preco === null ? "Sob consulta" : formatarPreco(v.preco)}
            </span>
          </p>
        </div>

        <a
          href={linkWhatsApp(mensagemVeiculo(v))}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          aria-label={`Tenho interesse no ${nome} (abre o WhatsApp)`}
          className={classesBotao("primaria", "md", "mt-4 w-full")}
        >
          <WhatsAppIcon className="size-5" />
          Tenho interesse
        </a>
      </div>
    </article>
  );
}
