import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntroGateway } from "@/components/intro/IntroGateway";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClientsMarqueeSection } from "@/components/sections/ClientsMarqueeSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <JsonLd />
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("universo-intro-completed")==="true"){document.documentElement.dataset.universoIntro="completed"}}catch(e){}`,
        }}
      />
      <style>{`html[data-universo-intro="completed"] .intro-gateway { display: none !important; }`}</style>
      <noscript>
        <style>{`.intro-gateway { display: none !important; }`}</style>
      </noscript>
      <IntroGateway />
      <div className="relative isolate overflow-x-clip bg-[var(--color-bg)]">
        <Header />
        <main id="conteudo-principal">
          <HeroSection />
          <ClientsMarqueeSection />
          <AboutSection />
          <FinalCTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
