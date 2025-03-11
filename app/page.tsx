import { Navbar } from "@/components/navbar";
import { MobileMenu } from "@/components/mobile-menu";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { DashboardSection } from "@/components/sections/dashboard-section";
import { PartnerStoresSection } from "@/components/sections/partner-stores-section";
import { ImpactStatsSection } from "@/components/sections/impact-stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";

export default async function SustainaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <MobileMenu />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DashboardSection />
      <PartnerStoresSection />
      <ImpactStatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
