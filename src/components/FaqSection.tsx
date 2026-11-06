import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '../data/faq';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('first-session');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto hairline-t text-left">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
          РАЗДЕЛ 07 • ВОПРОСЫ И ОТВЕТЫ
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
          Частые вопросы перед началом
        </h2>
        <p className="text-xs sm:text-sm text-ash max-w-sm mx-auto mt-2 font-serif italic">
          «Всё, что важно знать о первой встрече и формате работы»
        </p>
      </div>

      {/* Accordion Rows */}
      <div className="divide-y divide-mist border-y border-mist">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="py-2">
              <button
                onClick={() => toggle(item.id)}
                className="w-full py-4 flex items-center justify-between gap-4 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-lg sm:text-xl text-ink group-hover:text-charcoal transition-colors font-medium">
                  {item.question}
                </span>

                <div className="w-7 h-7 rounded-full border border-mist flex items-center justify-center shrink-0 text-ash group-hover:text-ink transition-colors">
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pt-1 text-xs sm:text-sm text-charcoal leading-relaxed max-w-2xl">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
