import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VitrineCarrossel } from "@/components/VitrineCarrossel";
import { Diferenciais } from "@/components/Diferenciais";
import { FinanciamentoAvaliacao } from "@/components/FinanciamentoAvaliacao";
import { Depoimentos } from "@/components/Depoimentos";
import { Sobre } from "@/components/Sobre";
import { Faq } from "@/components/Faq";
import { Localizacao } from "@/components/Localizacao";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <VitrineCarrossel />
        <Diferenciais />
        <FinanciamentoAvaliacao />
        <Depoimentos />
        <Sobre />
        <Faq />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
