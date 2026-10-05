"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loja, navegacao } from "@/data/loja";
import { linkWhatsApp } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { classesBotao } from "@/components/ui/Button";

const FOCAVEIS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState<string>("");
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  // Fundo sólido depois de rolar
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca no menu a seção visível
  useEffect(() => {
    const secoes = navegacao
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtivo(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const fechar = useCallback((devolverFoco = true) => {
    setAberto(false);
    if (devolverFoco) botaoRef.current?.focus();
  }, []);

  // Menu mobile: trava a rolagem, prende o foco e fecha com ESC
  useEffect(() => {
    if (!aberto) return;
    const painel = painelRef.current;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const primeiro = painel?.querySelector<HTMLElement>(FOCAVEIS);
    const timer = window.setTimeout(() => primeiro?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
        return;
      }
      if (e.key !== "Tab" || !painel) return;
      const itens = [botaoRef.current, ...Array.from(painel.querySelectorAll<HTMLElement>(FOCAVEIS))].filter(
        (el): el is HTMLElement => el !== null,
      );
      const inicio = itens[0];
      const fim = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === inicio) {
        e.preventDefault();
        fim.focus();
      } else if (!e.shiftKey && document.activeElement === fim) {
        e.preventDefault();
        inicio.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && fechar(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [aberto, fechar]);

  const solido = rolou || aberto;

  return (
    <>
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solido ? "bg-ink/90 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-[calc(env(safe-area-inset-top)+0.75rem)] focus:z-[60] focus:rounded-btn focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#inicio" className="group -m-2 rounded-lg p-2" aria-label={`${loja.nome}, voltar ao início`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navegacao.map((item) => {
              const atual = ativo === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={atual ? "location" : undefined}
                    className={`group relative inline-flex min-h-11 items-center rounded-lg px-3 text-[0.9375rem] font-medium transition-colors ${
                      atual ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {item.rotulo}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-2 h-0.5 origin-left rounded-full bg-primary-light transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        atual ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className={classesBotao("primaria", "md", "max-sm:hidden")}
          >
            <WhatsAppIcon className="size-5" />
            <span><span className="lg:max-xl:sr-only">Chamar no </span>WhatsApp</span>
          </a>

          <button
            ref={botaoRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-btn border border-white/15 text-white transition-colors hover:border-primary-light lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${aberto ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Progresso de leitura (animação CSS guiada pela rolagem) */}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-primary via-primary-light to-primary" />
    </header>

      {/* Painel do menu mobile (fora do header: o backdrop-filter dele mudaria a referência do position:fixed) */}
      <div
        id="menu-mobile"
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!aberto}
        className={`on-dark fixed inset-x-0 bottom-0 top-[calc(4.5rem+env(safe-area-inset-top))] z-40 overflow-y-auto bg-ink duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          aberto
            ? "visible transition-[clip-path] [clip-path:circle(150%_at_100%_0)]"
            : "invisible transition-[clip-path,visibility] [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[34rem] bg-[radial-gradient(closest-side,rgb(45_106_83/0.4),transparent)]" />
        <nav aria-label="Menu mobile" className="container-site relative flex min-h-full flex-col pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6">
          <ul className="flex flex-col">
            {navegacao.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-white/10 transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)] ${
                  aberto ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: aberto ? `${120 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => fechar(false)}
                  className="flex min-h-14 items-center justify-between py-3 font-display text-2xl font-bold text-white short:min-h-11 short:text-lg"
                >
                  {item.rotulo}
                  <span aria-hidden="true" className="size-2 rotate-45 bg-primary-light" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className={classesBotao("primaria", "lg", "mt-8 w-full")}
          >
            <WhatsAppIcon className="size-5" />
            Chamar no WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
