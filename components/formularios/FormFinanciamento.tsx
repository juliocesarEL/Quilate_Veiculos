"use client";

import { useId } from "react";
import { Calculator, Lock } from "lucide-react";
import { mascaraCpf, mascaraData } from "@/lib/format";
import { validarFinanciamento, type DadosFinanciamento } from "@/lib/validacao";
import { mensagemFinanciamento } from "@/lib/whatsapp";
import { useFormulario } from "@/hooks/useFormulario";
import { useEnvioWhatsApp } from "@/hooks/useEnvioWhatsApp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Campo } from "@/components/formularios/Campo";
import { CartaoFormulario } from "@/components/formularios/CartaoFormulario";
import { AvisoEnvio } from "@/components/formularios/AvisoEnvio";

const VAZIO: DadosFinanciamento = { cpf: "", nascimento: "" };

/** Simulação de financiamento: pede só CPF e data de nascimento e envia pelo WhatsApp. */
export function FormFinanciamento() {
  const id = useId();
  const whatsapp = useEnvioWhatsApp();
  const { formRef, dados, erros, atualizar, enviar } = useFormulario({
    inicial: VAZIO,
    validar: (d) => validarFinanciamento(d),
    aoEnviar: (d) => whatsapp.enviar(mensagemFinanciamento(d)),
  });

  return (
    <CartaoFormulario
      tituloId="fin-titulo"
      icone={<Calculator aria-hidden="true" className="size-6" />}
      titulo="Simular financiamento"
      texto="Só precisamos do seu CPF e da data de nascimento. Fazemos a simulação com os bancos e respondemos pelo WhatsApp com parcelas e prazos reais."
    >
      <form ref={formRef} noValidate onSubmit={enviar} aria-labelledby="fin-titulo" className="mt-6 flex flex-1 flex-col gap-4">
        <Campo
          id={`${id}-cpf`}
          rotulo="CPF"
          inputMode="numeric"
          placeholder="000.000.000-00"
          valor={dados.cpf}
          onChange={(v) => atualizar("cpf", mascaraCpf(v))}
          erro={erros.cpf}
        />
        <Campo
          id={`${id}-nascimento`}
          rotulo="Data de nascimento"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="DD/MM/AAAA"
          valor={dados.nascimento}
          onChange={(v) => atualizar("nascimento", mascaraData(v))}
          erro={erros.nascimento}
        />
        <p className="flex items-start gap-2 text-xs leading-relaxed text-slate">
          <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-primary" />
          Os dados vão direto para a loja pelo WhatsApp e são usados só para a consulta de crédito.
        </p>
        <div className="mt-auto pt-2">
          <Button type="submit" tamanho="lg" className="w-full">
            <WhatsAppIcon className="size-5" />
            Simular financiamento
          </Button>
          {whatsapp.linkEnviado && <AvisoEnvio link={whatsapp.linkEnviado} aoPreencherDeNovo={whatsapp.limpar} />}
        </div>
      </form>
    </CartaoFormulario>
  );
}
