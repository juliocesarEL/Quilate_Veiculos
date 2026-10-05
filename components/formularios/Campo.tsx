import type { InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

type Props = {
  id: string;
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  erro?: string;
  opcional?: boolean;
  dica?: string;
  className?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "inputMode" | "autoComplete" | "placeholder">;

const estiloCampo =
  "block min-h-12 w-full rounded-btn border bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgb(14_18_23/0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-slate/70 focus:border-primary focus:shadow-[0_0_0_4px_rgb(45_106_83/0.3)] focus:outline-none focus-visible:outline-none";

/** Campo de texto com rótulo, dica opcional e mensagem de erro ligadas por aria-describedby. */
export function Campo({ id, rotulo, valor, onChange, erro, opcional, dica, className = "", ...input }: Props) {
  const idErro = `${id}-erro`;
  const idDica = `${id}-dica`;
  const descricao = [dica && !erro && idDica, erro && idErro].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {rotulo} {opcional && <span className="font-normal text-slate">(opcional)</span>}
      </label>
      <input
        id={id}
        name={id}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricao}
        required={!opcional}
        className={`${estiloCampo} ${erro ? "border-red-700" : "border-ink/15 hover:border-ink/30"}`}
        {...input}
      />
      {dica && !erro && (
        <p id={idDica} className="mt-1.5 text-xs text-slate">
          {dica}
        </p>
      )}
      {erro && (
        <p id={idErro} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {erro}
        </p>
      )}
    </div>
  );
}
