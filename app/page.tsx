import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { SectionScrollReveal } from "@/components/animation/SectionScrollReveal";
import { IntroGateway } from "@/components/intro/IntroGateway";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AgencyLanding } from "@/components/sections/AgencyLanding";
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
      <ScrollProgress />
      <SectionScrollReveal />
      <div
        data-site-shell
        className="relative isolate overflow-x-clip bg-[var(--color-bg)]"
      >
        <Header />
        <main id="conteudo-principal">
          <AgencyLanding />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
