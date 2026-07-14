import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ClientsMarqueeSection } from "@/components/sections/ClientsMarqueeSection";
import { CredibilitySection } from "@/components/sections/CredibilitySection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="relative isolate overflow-x-clip bg-[var(--color-bg)]">
        <Header />
        <main>
          <HeroSection />
          <CredibilitySection />
          <ProblemsSection />
          <ServicesSection />
          <ProcessSection />
          <BenefitsSection />
          <ResultsSection />
          <ClientsMarqueeSection />
          <AboutSection />
          <AudienceSection />
          <DifferentialsSection />
          <FAQSection />
          <FinalCTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
