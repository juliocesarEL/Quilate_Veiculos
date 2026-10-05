import { SectionHeading } from "@/components/ui/SectionHeading";
import { FormFinanciamento } from "@/components/formularios/FormFinanciamento";
import { FormAvaliacao } from "@/components/formularios/FormAvaliacao";

/** Seção com os dois formulários. Server Component: só os formulários rodam no navegador. */
export function FinanciamentoAvaliacao() {
  return (
    <section id="financiamento" aria-labelledby="financiamento-titulo" className="cv-auto relative bg-white section-y">
      <div className="container-site">
        <SectionHeading
          id="financiamento-titulo"
          eyebrow="Financiamento e troca"
          titulo="Simule a parcela e descubra quanto vale o seu carro"
          descricao="Os dois formulários abrem o WhatsApp com a mensagem pronta. Você não precisa criar conta nem esperar e-mail."
        />
        <div id="avaliacao" className="mt-12 grid items-stretch gap-5 sm:gap-6 lg:grid-cols-2">
          <FormFinanciamento />
          <FormAvaliacao />
        </div>
      </div>
    </section>
  );
}
