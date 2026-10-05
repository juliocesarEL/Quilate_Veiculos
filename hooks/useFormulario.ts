import { useRef, useState, type FormEvent } from "react";
import { temErros, type Erros } from "@/lib/validacao";

type Opcoes<T> = {
  inicial: T;
  validar: (dados: T) => Erros<T>;
  /** Chamado só quando todos os campos são válidos */
  aoEnviar: (dados: T) => void;
};

/**
 * Estado e validação de um formulário simples:
 * - os erros só aparecem depois da primeira tentativa de envio;
 * - a partir daí, revalida a cada digitação (o erro some assim que o campo fica certo);
 * - ao enviar com erro, leva o foco para o primeiro campo inválido.
 */
export function useFormulario<T extends Record<string, string>>({ inicial, validar, aoEnviar }: Opcoes<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dados, setDados] = useState<T>(inicial);
  const [erros, setErros] = useState<Erros<T>>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);

  function atualizar(campo: keyof T, valor: string) {
    const novos = { ...dados, [campo]: valor };
    setDados(novos);
    if (tentouEnviar) setErros(validar(novos));
  }

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    setTentouEnviar(true);
    const encontrados = validar(dados);
    setErros(encontrados);
    if (temErros(encontrados)) {
      focarPrimeiroErro(formRef.current);
      return;
    }
    aoEnviar(dados);
  }

  return { formRef, dados, erros, atualizar, enviar };
}

function focarPrimeiroErro(form: HTMLFormElement | null) {
  requestAnimationFrame(() => form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
}
