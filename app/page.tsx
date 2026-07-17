import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/animation/CustomCursor";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { SectionScrollReveal } from "@/components/animation/SectionScrollReveal";
import { ParticleLogoSection } from "@/components/animation/ParticleLogoSection";
import { IntroGateway } from "@/components/intro/IntroGateway";
import { AboutSection } from "@/components/sections/AboutSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { ClientsMarqueeSection } from "@/components/sections/ClientsMarqueeSection";
import { CTABandSection } from "@/components/sections/CTABandSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StrategySection } from "@/components/sections/StrategySection";
import { TestimonialsMarqueeSection } from "@/components/sections/TestimonialsMarqueeSection";
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
      <CustomCursor />
      <div className="relative isolate overflow-x-clip bg-[var(--color-bg)]">
        <Header />
        <main id="conteudo-principal">
          <HeroSection />
          <CTABandSection />
          <ProblemsSection />
          <ServicesSection />
          <AboutSection />
          <TestimonialsMarqueeSection />
          <StrategySection />
          <ClientsMarqueeSection />
          <ProcessSection />
          <AudienceSection />
          <FAQSection />
        </main>
        <ParticleLogoSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
