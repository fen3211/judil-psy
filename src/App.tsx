import React, { useState } from 'react';
import { ButterflyCursor } from './components/ButterflyCursor';
import { InkBloomDivider } from './components/InkBloomDivider';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProblemsSection } from './components/ProblemsSection';
import { InteractiveNotesSection } from './components/InteractiveNotesSection';
import { QuotesSection } from './components/QuotesSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { TelegramCTA } from './components/TelegramCTA';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';

export const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#222222] font-sans relative selection:bg-[#F59E0B]/20 selection:text-[#0D131F]">
      {/* 00. Butterfly Cursor particle effect */}
      <ButterflyCursor />

      {/* 01. Navigation Header */}
      <Header />

      {/* Main Flow */}
      <main>
        {/* 02. Hero / Living Cover with Paint Reveal */}
        <HeroSection />

        {/* Ink Bloom transition: Ultramarine to Viridian */}
        <InkBloomDivider color="viridian" />

        {/* 03. About the Psychologist */}
        <AboutSection />

        {/* 04. Problem Areas */}
        <ProblemsSection />

        {/* Ink Bloom transition: Viridian to Ochre */}
        <InkBloomDivider color="ochre" flip />

        {/* 05. Interactive Journal Notes */}
        <InteractiveNotesSection />

        {/* 06. Brush Quotes Flow */}
        <QuotesSection />

        {/* Ink Bloom transition: Amethyst */}
        <InkBloomDivider color="amethyst" />

        {/* 07. How It Works */}
        <ProcessSection />

        {/* 08. Formats and Pricing */}
        <PricingSection />

        {/* 09. FAQ */}
        <FaqSection />

        {/* Ink Bloom transition: Ultramarine into Final Canvas */}
        <InkBloomDivider color="ultramarine" flip />

        {/* 10. Direct Telegram Booking CTA (No form) */}
        <TelegramCTA onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      </main>

      {/* 11. Footer */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* 12. Privacy Policy & Legal Modal */}
      <LegalModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;
