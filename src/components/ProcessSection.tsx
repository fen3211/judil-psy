import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Диалог в Telegram',
      desc: 'Вы пишете мне в Telegram. Мы кратко обсуждаем тему обращения и выбираем удобный день и время для консультации.',
    },
    {
      num: '02',
      title: 'Первая онлайн-встреча',
      desc: '55 минут по защищённой ссылке в Яндекс Телемост. Знакомство, прояснение запроса и создание безопасного контакта.',
    },
    {
      num: '03',
      title: 'Практики и техники',
      desc: 'Работа с автоматическими мыслями (CBT), техники принятия и разделения с эмоциями (ACT), бережные упражнения для жизни.',
    },
    {
      num: '04',
      title: 'Опора на себя',
      desc: 'Постепенное снижение тревоги, свобода от чувства вины за отдых и устойчивое умение защищать личные границы.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 sm:mb-20">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 05 • ПРОЦЕСС ТЕРАПИИ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            Как мы будем работать вместе
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-xs font-serif italic">
          «Прозрачные шаги: от первого сообщения до устойчивого внутреннего спокойствия»
        </p>
      </div>

      {/* 4-Step Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="border-t border-mist pt-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-ash block mb-3">{step.num}</span>
              <h3 className="font-serif text-xl text-ink font-medium leading-snug mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct Telegram Booking prompt */}
      <div className="mt-14 pt-8 border-t border-mist/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-xs sm:text-sm text-ash font-serif italic">
          «Вам не нужно заранее готовить безупречную формулировку — мы начнём с того, что волнует прямо сейчас.»
        </span>
        <a
          href={psychologistProfile.bookingTelegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-xs font-mono uppercase tracking-wider hover:bg-graphite transition-all shrink-0"
        >
          <span>Написать в Telegram</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
