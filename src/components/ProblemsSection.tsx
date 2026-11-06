import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { problemAreas } from '../data/problems';
import { psychologistProfile } from '../data/psychologistProfile';
import { LivingInkCanvas } from './LivingInkCanvas';

export const ProblemsSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('anxiety');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const therapyOutcomes = [
    {
      num: '01',
      title: 'Снижение тревожности',
      desc: 'Освоите конкретные техники КПТ для выхода из руминаций и остановки мыслей «а что, если…».',
    },
    {
      num: '02',
      title: 'Право на границы и голос',
      desc: 'Перестанете соглашаться из чувства вины и научитесь говорить «нет» близким и коллегам без самоедства.',
    },
    {
      num: '03',
      title: 'Отказ от режима «Я сама»',
      desc: 'Сможете делегировать, отдыхать без угрызений совести и выйти из хронического истощения.',
    },
    {
      num: '04',
      title: 'Внутренняя опора',
      desc: 'Смените строгого внутреннего критика на поддерживающий диалог с собой в технике ACT.',
    },
  ];

  return (
    <section id="problems" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 text-left">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 02 • ПРАКТИКА И ТЕМЫ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            С чем я помогаю справиться
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-sm font-serif italic">
          «Каждая тема — это не диагноз, а точка роста и бережного знакомства с собой»
        </p>
      </div>

      {/* Architectural Accordion Rows */}
      <div className="divide-y divide-mist border-y border-mist text-left">
        {problemAreas.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="transition-colors">
              <button
                onClick={() => toggle(item.id)}
                className="w-full py-6 sm:py-8 flex items-start sm:items-center justify-between gap-6 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-8 flex-grow">
                  <span className="font-mono text-xs sm:text-sm text-ash group-hover:text-ink transition-colors shrink-0 pt-0.5 sm:pt-0">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink group-hover:text-charcoal transition-colors font-medium">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ash mt-1 line-clamp-1 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-mist flex items-center justify-center shrink-0 group-hover:border-fog transition-colors text-ash group-hover:text-ink">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-2 pl-8 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-charcoal">
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono tracking-wider uppercase text-ash block">
                          Что вы обычно чувствуете
                        </span>
                        <ul className="space-y-2">
                          {item.symptoms.map((symptom, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-ash/50 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 bg-linen p-5 border border-mist">
                        <span className="text-[11px] font-mono tracking-wider uppercase text-ash block">
                          Как мы работаем в терапии
                        </span>
                        <p className="leading-relaxed text-ink/90">
                          {item.solution}
                        </p>
                        <div className="pt-2">
                          <a
                            href={psychologistProfile.bookingTelegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wide text-ink hover:text-charcoal underline"
                          >
                            <span>Обсудить этот запрос в Telegram</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Living Ink State Atelier (Effect 4.3) */}
      <div className="mt-14 sm:mt-18 border border-mist p-4 sm:p-6 bg-[#F8F5EF] relative overflow-hidden text-left shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-ash block mb-1">
              ИНТЕРАКТИВНЫЙ ХОЛСТ СОСТОЯНИЙ • ЭФФЕКТ ПРУЖИННОЙ РЕЛАКСАЦИИ
            </span>
            <h4 className="font-serif italic text-lg sm:text-xl text-ink">
              «Тревога утихает, когда мы даем ей пространство раствориться»
            </h4>
          </div>
          <span className="text-xs font-mono text-ash shrink-0 hidden sm:inline-block">
            Курсор возмущает пигменты • Физика возврата Гука
          </span>
        </div>
        <LivingInkCanvas className="w-full h-44 sm:h-56 border border-mist/80 bg-white shadow-inner" />
      </div>

      {/* Therapy Outcomes 4-Column Editorial Strip */}
      <div className="mt-16 sm:mt-20 pt-12 border-t border-mist/80 text-left">
        <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-6">
          РЕЗУЛЬТАТЫ СОВМЕСТНОЙ РАБОТЫ
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {therapyOutcomes.map((out) => (
            <div key={out.num} className="space-y-2 border-l border-mist pl-4">
              <span className="font-mono text-xs text-ash">{out.num}</span>
              <h4 className="font-serif text-lg text-ink font-medium leading-snug">
                {out.title}
              </h4>
              <p className="text-xs text-ash leading-relaxed">
                {out.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
