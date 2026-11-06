import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';
import { InteractivePainting } from './InteractivePainting';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 text-left">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 01 • ЗНАКОМСТВО И МЕТОД
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            Обо мне и подходе к терапии
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-sm font-serif italic">
          «Пространство, где вам безопасно быть собой — без оценок, давления и масок»
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Authentic Photography Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="border border-mist p-2.5 bg-paper shadow-subtle"
          >
            <InteractivePainting
              imageSrc="./photos/post_306_1.jpg"
              imageAlt="Юлия Колесникова — терапевтическая работа"
              captionTitle="Юлия Колесникова • Североморск"
              captionSubtitle="Архив 2026 • Проведите курсором, чтобы смыть краску"
              className="aspect-[4/5] w-full"
            />
          </motion.div>

          {/* Secondary Candid Atmospheric Photo */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="border border-mist p-2 bg-paper">
              <div className="aspect-square overflow-hidden bg-linen">
                <img
                  src="./photos/post_274_1.jpg"
                  alt="Юлия в дороге"
                  className="w-full h-full object-cover object-center img-editorial"
                  loading="lazy"
                />
              </div>
              <span className="block pt-2 text-[10px] font-mono text-ash uppercase">В пути • Заметки</span>
            </div>
            <div className="border border-mist p-2 bg-paper">
              <div className="aspect-square overflow-hidden bg-linen">
                <img
                  src="./photos/post_174_1.jpg"
                  alt="Рабочий блокнот и книги"
                  className="w-full h-full object-cover object-center img-editorial"
                  loading="lazy"
                />
              </div>
              <span className="block pt-2 text-[10px] font-mono text-ash uppercase">Практика • Дневник</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Qualifications & Philosophy */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-left">
          {/* Lead Manifesto Paragraph */}
          <div className="space-y-4">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-ink leading-snug">
              «Я верю, что терапия начинается не с попытки себя починить, а с разрешения остановиться и прислушаться к себе.»
            </h3>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed font-sans">
              Меня зовут Юлия Колесникова. Я дипломированный психолог-консультант, веду частную практику
              в научно доказанных модальностях: когнитивно-поведенческой терапии (CBT) и терапии принятия
              и ответственности (ACT). Мой канал «Терапия с трепетом» вырос из желания говорить о психологии
              просто, глубоко и без надменности.
            </p>
            <p className="text-sm sm:text-base text-charcoal leading-relaxed font-sans">
              На консультациях мы не ищем «виноватых» и не пытаемся заставить вас соответствовать чужим идеалам.
              Мы бережно исследуем, как ваши мысли, автоматические реакции и накопленный опыт влияют
              на сегодняшнее состояние, и находим конкретные способы вернуть себе внутреннее спокойствие.
            </p>
          </div>

          {/* Qualifications & Accreditation Grid */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-ash block">
              ОБРАЗОВАНИЕ И АККРЕДИТАЦИЯ
            </span>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {psychologistProfile.education.map((edu, idx) => (
                <li
                  key={idx}
                  className="p-4 border border-mist bg-paper flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-ash mb-2">
                    <span className="font-semibold text-ink">{edu.year}</span>
                    <span>{edu.hours}</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-ink leading-snug mb-1">
                      {edu.specialty}
                    </p>
                    <p className="text-[11px] font-mono text-ash">{edu.institution}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* AKPP Association Badge */}
            <div className="p-4 border border-mist bg-linen flex items-center justify-between gap-3 text-left">
              <div>
                <span className="text-xs font-medium text-ink block">
                  Ассоциация когнитивно-поведенческой психотерапии (АКПП)
                </span>
                <span className="text-[11px] font-mono text-ash">
                  Действительный член ассоциации с 30 сентября 2025 года
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-sage-500 shrink-0" />
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-ash block">
              ПРИНЦИПЫ МОЕЙ РАБОТЫ
            </span>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
              {psychologistProfile.principles.map((pr, idx) => (
                <li key={idx} className="border-t border-mist/80 pt-3 text-left">
                  <span className="font-mono text-xs text-ash block mb-1">0{idx + 1}.</span>
                  <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                    {pr}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct CTA into Telegram */}
          <div className="pt-4">
            <a
              href={psychologistProfile.bookingTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink hover:bg-graphite text-paper text-xs sm:text-sm font-medium transition-all shadow-subtle group"
            >
              <span>Записаться на сессию к Юлии</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
