import { linkWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Botão flutuante do WhatsApp (sempre visível). */
export function WhatsAppFloat() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="hero-fade group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_30px_-8px_rgb(45_106_83/0.9)] transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-110 sm:size-16"
      style={{ "--d": "2200ms" } as React.CSSProperties}
    >
      <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full bg-primary" />
      <WhatsAppIcon className="relative size-7 transition-transform duration-500 group-hover:-rotate-12 sm:size-8" />
    </a>
  );
}
