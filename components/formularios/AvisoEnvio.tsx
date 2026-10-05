import { CheckCircle2 } from "lucide-react";

type Props = {
  /** Link do WhatsApp que acabou de ser aberto */
  link: string;
  aoPreencherDeNovo: () => void;
};

/** Confirmação depois do envio, com o link de reserva caso o WhatsApp não tenha aberto. */
export function AvisoEnvio({ link, aoPreencherDeNovo }: Props) {
  return (
    <div role="status" className="mt-4 flex items-start gap-3 rounded-btn bg-primary/10 p-4 text-sm text-primary-dark">
      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <p>
        Abrimos o WhatsApp com a sua mensagem pronta. Não abriu?{" "}
        <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
          Toque aqui
        </a>{" "}
        ou{" "}
        <button type="button" onClick={aoPreencherDeNovo} className="font-semibold underline underline-offset-2">
          preencha de novo
        </button>
        .
      </p>
    </div>
  );
}
