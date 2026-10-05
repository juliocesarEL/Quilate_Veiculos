"use client";

import { useId } from "react";
import { ArrowLeftRight } from "lucide-react";
import { apenasDigitos, mascaraMilhar, mascaraTelefone } from "@/lib/format";
import { validarAvaliacao, type DadosAvaliacao } from "@/lib/validacao";
import { mensagemAvaliacao } from "@/lib/whatsapp";
import { useFormulario } from "@/hooks/useFormulario";
import { useEnvioWhatsApp } from "@/hooks/useEnvioWhatsApp";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Campo } from "@/components/formularios/Campo";
import { CartaoFormulario } from "@/components/formularios/CartaoFormulario";
import { AvisoEnvio } from "@/components/formularios/AvisoEnvio";

const VAZIO: DadosAvaliacao = { nome: "", telefone: "", marca: "", modelo: "", ano: "", km: "" };

const mascaraAno = (valor: string) => apenasDigitos(valor).slice(0, 4);

/** Avaliação do carro do cliente para troca ou venda, enviada pelo WhatsApp. */
export function FormAvaliacao() {
  const id = useId();
  const whatsapp = useEnvioWhatsApp();
  const { formRef, dados, erros, atualizar, enviar } = useFormulario({
    inicial: VAZIO,
    validar: (d) => validarAvaliacao(d),
    aoEnviar: (d) => whatsapp.enviar(mensagemAvaliacao(d)),
  });

  return (
    <CartaoFormulario
      tituloId="aval-titulo"
      icone={<ArrowLeftRight aria-hidden="true" className="size-6" />}
      titulo="Avaliar meu carro"
      texto="Conte qual é o seu carro. Respondemos com uma primeira estimativa para usar na troca ou vender para a loja."
      atraso="120ms"
    >
      <form ref={formRef} noValidate onSubmit={enviar} aria-labelledby="aval-titulo" className="mt-6 grid flex-1 grid-cols-1 gap-4 xs:grid-cols-2">
        <Campo
          id={`${id}-nome`}
          className="xs:col-span-2"
          rotulo="Nome"
          autoComplete="name"
          valor={dados.nome}
          onChange={(v) => atualizar("nome", v)}
          erro={erros.nome}
        />
        <Campo
          id={`${id}-telefone`}
          className="xs:col-span-2"
          rotulo="Telefone com DDD"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(11) 99999-9999"
          valor={dados.telefone}
          onChange={(v) => atualizar("telefone", mascaraTelefone(v))}
          erro={erros.telefone}
        />
        <Campo
          id={`${id}-marca`}
          rotulo="Marca"
          placeholder="Chevrolet"
          valor={dados.marca}
          onChange={(v) => atualizar("marca", v)}
          erro={erros.marca}
        />
        <Campo
          id={`${id}-modelo`}
          rotulo="Modelo"
          placeholder="Onix LT"
          valor={dados.modelo}
          onChange={(v) => atualizar("modelo", v)}
          erro={erros.modelo}
        />
        <Campo
          id={`${id}-ano`}
          rotulo="Ano"
          inputMode="numeric"
          placeholder="2019"
          valor={dados.ano}
          onChange={(v) => atualizar("ano", mascaraAno(v))}
          erro={erros.ano}
        />
        <Campo
          id={`${id}-km`}
          rotulo="Quilometragem"
          inputMode="numeric"
          placeholder="60.000"
          valor={dados.km}
          onChange={(v) => atualizar("km", mascaraMilhar(v))}
          erro={erros.km}
        />
        <div className="mt-auto pt-2 xs:col-span-2">
          <Button type="submit" tamanho="lg" className="w-full">
            <WhatsAppIcon className="size-5" />
            Avaliar meu carro
          </Button>
          {whatsapp.linkEnviado && <AvisoEnvio link={whatsapp.linkEnviado} aoPreencherDeNovo={whatsapp.limpar} />}
        </div>
      </form>
    </CartaoFormulario>
  );
}
