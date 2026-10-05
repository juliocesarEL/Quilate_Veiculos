import { enderecoCompleto, loja, navegacao } from "@/data/loja";
import { linkWhatsApp } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const redes = [
    { href: loja.instagram.url, rotulo: `Instagram ${loja.instagram.usuario}`, Icone: InstagramIcon },
    { href: linkWhatsApp(), rotulo: "WhatsApp", Icone: WhatsAppIcon },
  ];

  return (
    <footer className="on-dark relative border-t border-white/10 bg-[#090c10] pb-[calc(2rem+env(safe-area-inset-bottom))] pt-16 text-white/75">
      <div className="container-site">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="group inline-block rounded-lg" aria-label={`${loja.nome}, voltar ao início`}>
              <Logo variante="empilhada" />
            </a>
            <p className="measure mt-5 text-sm leading-relaxed">{loja.descricao}</p>
            <ul className="mt-6 flex gap-2" aria-label="Redes sociais">
              {redes.map(({ href, rotulo, Icone }) => (
                <li key={rotulo}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={rotulo}
                    className="flex size-11 items-center justify-center rounded-btn border border-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light"
                  >
                    <Icone className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Links rápidos">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Links rápidos</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
              {navegacao.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-white">
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">Loja</h2>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed">
              <p>{enderecoCompleto}</p>
              <p>
                WhatsApp:{" "}
                <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-white underline-offset-4 hover:underline">
                  {loja.whatsappExibicao}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/65 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {loja.nome} · {loja.razaoSocial} · CNPJ {loja.cnpj}
          </p>
          <p className="measure md:text-right">
            Projeto de demonstração da Risen Studio: loja, pessoas, endereço e estoque são fictícios. O WhatsApp e o Instagram são da Risen Studio. Fotos: Pexels.
          </p>
        </div>
      </div>
    </footer>
  );
}
