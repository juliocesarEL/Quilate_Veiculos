"use client";

import { useRef, type ReactNode } from "react";

/**
 * Atualiza --mx/--my de cada .spotlight filho conforme o ponteiro se move,
 * criando a borda luminosa que segue o cursor. Sem efeito em telas de toque.
 */
export function SpotlightGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function mover(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    ref.current.querySelectorAll<HTMLElement>(".spotlight").forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={mover}
      onPointerEnter={() => ref.current?.style.setProperty("--spot", "1")}
      onPointerLeave={() => ref.current?.style.setProperty("--spot", "0")}
    >
      {children}
    </div>
  );
}
