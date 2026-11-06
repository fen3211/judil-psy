import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Обо мне', href: '#about', color: '#E96E54', dotClass: 'bg-[#E96E54]' },
    { label: 'С чем я работаю', href: '#problems', color: '#3156B8', dotClass: 'bg-[#3156B8]' },
    { label: 'Заметки', href: '#notes', color: '#E8B64B', dotClass: 'bg-[#E8B64B]' },
    { label: 'Цитаты', href: '#quotes', color: '#7665B7', dotClass: 'bg-[#7665B7]' },
    { label: 'Стоимость', href: '#pricing', color: '#799F87', dotClass: 'bg-[#799F87]' },
    { label: 'FAQ', href: '#faq', color: '#25242B', dotClass: 'bg-[#25242B]' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-mist/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Colophon */}
        <a
          href="#"
          className="flex items-baseline gap-3 text-ink group focus:outline-none"
        >
          <span className="font-serif italic text-2xl font-medium tracking-tight group-hover:text-ash transition-colors">
            judil.psy
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-ash border-l border-mist pl-3">
            Терапия с трепетом
          </span>
        </a>

        {/* Desktop Colorful Navigation (Effect 5.3) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-ash">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="inline-flex items-center gap-2 hover:text-ink transition-colors py-1 group"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${link.dotClass} opacity-75 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300`}
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Direct Telegram Booking Action */}
        <div className="flex items-center gap-3">
          <a
            href={psychologistProfile.bookingTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-ink hover:bg-charcoal text-paper text-xs sm:text-[13px] font-medium tracking-wide flex items-center gap-1.5 transition-all shadow-subtle hover:shadow"
          >
            <span>Записаться</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-linen text-ink transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
            aria-label={mobileMenuOpen ? 'Закрыть навигацию' : 'Открыть навигацию'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-editorial-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-editorial-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-mist bg-parchment overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-left">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ash mb-1">
                Содержание журнала
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-2xl text-graphite hover:text-ink transition-colors py-1 border-b border-mist/40 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className={`w-2 h-2 rounded-full ${link.dotClass}`} aria-hidden="true" />
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={psychologistProfile.bookingTelegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-ink text-paper text-sm font-medium flex items-center justify-center gap-2 text-center"
                >
                  <span>Записаться в Telegram</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={psychologistProfile.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full border border-mist text-ash hover:text-ink text-xs font-mono tracking-wider uppercase text-center"
                >
                  Канал @terapia_s_trepetom
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
