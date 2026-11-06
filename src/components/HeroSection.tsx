import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [paintRevealed, setPaintRevealed] = useState(false);

  useEffect(() => {
    // Trigger the organic paint reveal expansion shortly after mount
    const timer = setTimeout(() => {
      setPaintRevealed(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-[95vh] pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-between text-left overflow-hidden">
      {/* Top Chromatic Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-widest uppercase text-ash border-b border-mist pb-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
            <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
            LIVING CANVAS
          </span>
          <span>•</span>
          <span>ТЕРАПИЯ С ТРЕПЕТОМ</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">КПТ & ACT ПСИХОТЕРАПИЯ</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-ink font-medium">ЧЛЕН АКПП</span>
        </div>
      </div>

      {/* Main Living Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center flex-grow my-auto">
        {/* Left Column: Painterly Typography & Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mist bg-white/80 backdrop-blur-sm text-xs font-mono tracking-wider text-ash uppercase shadow-subtle"
            >
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              <span>Юлия Колесникова • Психолог-консультант</span>
            </motion.div>

            {/* Monumental Headline with Gouache Brush Highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-normal leading-[1.08] tracking-tight"
            >
              Пространство, где вам{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 font-medium italic text-[#1E3A8A]">
                  безопасно
                </span>
                {/* Organic Gouache Brush Stroke backdrop */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 bottom-1 w-full h-3.5 sm:h-4 bg-[#F59E0B]/25 -rotate-1 origin-left rounded-sm pointer-events-none -z-0"
                />
              </span>{' '}
              быть собой — без оценок и масок.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-charcoal leading-relaxed max-w-xl font-sans"
          >
            Индивидуальные консультации онлайн. Бережная доказательная помощь при тревоге,
            синдроме самозванца, выгорании и потере контакта с собственными желаниями.
            Здесь не нужно играть роли или заслуживать одобрение.
          </motion.p>

          {/* Direct Telegram Booking Action */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href={psychologistProfile.bookingTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#0D131F] hover:bg-[#1E3A8A] text-paper font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-card hover:shadow-elevated group text-center"
            >
              <span>Записаться на консультацию</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={psychologistProfile.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full border border-mist hover:border-[#D97706]/50 bg-white/90 text-charcoal hover:text-ink text-sm font-medium flex items-center justify-center gap-2 transition-all text-center shadow-subtle"
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Канал в Telegram</span>
            </a>
          </motion.div>

          {/* Quick Painterly Specs Plate */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4 grid grid-cols-3 gap-4 border-t border-mist/80 max-w-lg text-left"
          >
            <div>
              <span className="block text-[10px] font-mono uppercase text-ash">Формат</span>
              <span className="text-xs sm:text-sm font-medium text-ink">Яндекс Телемост</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-ash">Сессия</span>
              <span className="text-xs sm:text-sm font-medium text-ink">55 минут</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-ash">Стоимость</span>
              <span className="text-xs sm:text-sm font-medium text-ink">2 500 ₽</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: PAINT REVEAL of Genuine Psychologist Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] sm:max-w-[390px] aspect-[3/4]">
            {/* Background Watercolor Pigment Blooming Splashes */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: paintRevealed ? 1 : 0.4, opacity: paintRevealed ? 0.35 : 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -inset-6 bg-gradient-to-tr from-[#1E3A8A]/30 via-[#D97706]/20 to-[#D9483B]/25 rounded-full blur-2xl pointer-events-none"
            />

            {/* Architectural Paper Frame */}
            <div className="relative w-full h-full bg-white border border-mist p-2.5 shadow-elevated overflow-hidden">
              {/* Organic Paint Reveal Container */}
              <div className="relative w-full h-full overflow-hidden bg-[#F3EFE6]">
                {/* Genuine Photo of Julia */}
                <motion.img
                  initial={{ scale: 1.08, filter: shouldReduceMotion ? 'none' : 'blur(8px)' }}
                  animate={{
                    scale: paintRevealed ? 1 : 1.08,
                    filter: 'blur(0px)',
                  }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  src="./photos/post_324_3.jpg"
                  alt="Юлия Колесникова — дипломированный психолог-консультант"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Expanding Watercolor Reveal Wash Overlay */}
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: paintRevealed ? 0 : 1,
                    scale: paintRevealed ? 1.4 : 1,
                  }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#E8DCC8] to-[#1E3A8A]/40 mix-blend-multiply pointer-events-none"
                />

                {/* Subtle Watercolor Edge Border Vignette */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none" />

                {/* Editorial Portrait Caption Plate */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-mist p-3 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-serif italic text-base sm:text-lg font-medium text-ink leading-tight">
                        Юлия Колесникова
                      </p>
                      <p className="text-[10px] font-mono text-ash tracking-wide uppercase mt-0.5">
                        АНО ДПО «НАДПО» • АКПП
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Prompt */}
      <div className="pt-8 sm:pt-12 flex justify-between items-center text-[11px] font-mono text-ash tracking-widest uppercase border-t border-mist/80">
        <span>МОСКВА • ОНЛАЙН (ЯНДЕКС ТЕЛЕМОСТ)</span>
        <a
          href="#about"
          className="flex items-center gap-1.5 hover:text-ink transition-colors"
        >
          <span>ЛИСТАТЬ ЖУРНАЛ</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#D97706]" />
        </a>
      </div>
    </section>
  );
};
