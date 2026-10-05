"use client";

import { useEffect } from "react";

/**
 * Um único IntersectionObserver para todos os elementos com [data-reveal].
 * Adiciona .is-in quando o elemento entra na tela; o CSS cuida da animação.
 * Também marca <html class="ready"> ao fim da abertura, liberando as animações contínuas.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observar = (raiz: ParentNode) =>
      raiz.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    observar(document);

    // Elementos que surgem depois (ex.: cards ao trocar o filtro)
    const mo = new MutationObserver(() => observar(document));
    mo.observe(document.body, { childList: true, subtree: true });

    // Libera as animações contínuas e as de rolagem (ver .ready no globals.css) depois que a
    // sequência de abertura do hero termina, ou antes, se a pessoa começar a rolar.
    const marcarPronto = () => {
      document.documentElement.classList.add("ready");
      window.removeEventListener("scroll", marcarPronto);
    };
    const timer = window.setTimeout(marcarPronto, 2200);
    window.addEventListener("scroll", marcarPronto, { passive: true, once: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", marcarPronto);
    };
  }, []);

  return null;
}
