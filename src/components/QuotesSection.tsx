import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { verifiedQuotes } from '../data/quotes';
import { psychologistProfile } from '../data/psychologistProfile';
import { CalligraphicInkLine } from './CalligraphicInkLine';

export const QuotesSection: React.FC = () => {
  const primaryQuote = verifiedQuotes.find((q) => q.postId === 261) || verifiedQuotes[0];
  const restQuote = verifiedQuotes.find((q) => q.postId === 360) || verifiedQuotes[1];
  const boundaryQuote = verifiedQuotes.find((q) => q.postId === 280) || verifiedQuotes[2];

  return (
    <section id="quotes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 sm:mb-20">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 04 • ЖИВОПИСНАЯ ТИПОГРАФИКА
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            Слова, которые возвращают к себе
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-xs font-serif italic">
          «Подлинные фрагменты авторских публикаций из канала @terapia_s_trepetom»
        </p>
      </div>

      {/* Featured Large Statement with Venetian Coral Gouache Brush Mark */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-24">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs text-ash tracking-widest uppercase block">
            ЦИТАТА № 01 • ИЗ АРХИВА КАНАЛА
          </span>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.18] font-normal"
          >
            «Откажись от мысли, что с тобой{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium italic text-[#D9483B]">
                что-то не так
              </span>
              <span className="absolute left-0 bottom-1 w-full h-3 sm:h-4 bg-[#D9483B]/20 -rotate-1 rounded-sm -z-0" />
            </span>{' '}
            — в этом и есть твоя главная сила.»
          </motion.blockquote>

          {/* Ink writing flourish line */}
          <div className="py-2">
            <CalligraphicInkLine color="#3156B8" durationMs={1500} className="w-full max-w-lg" />
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs text-ash font-mono">
            <span className="text-ink font-serif italic text-sm">{psychologistProfile.fullName}</span>
            <span>•</span>
            <a
              href={primaryQuote.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Пост #${primaryQuote.postId} в Telegram (откроется в новой вкладке)`}
              className="inline-flex items-center gap-1 hover:text-ink transition-colors underline"
            >
              <span>Пост #{primaryQuote.postId} в Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Authentic Atmosphere Photo from Channel Archive */}
        <div className="lg:col-span-5">
          <div className="border border-mist p-2.5 bg-white shadow-card">
            <div className="aspect-[4/3] overflow-hidden bg-[#F3EFE6]">
              <img
                src="./photos/post_261_1.jpg"
                alt="Цветы и авторские записки на стене"
                className="w-full h-full object-cover object-center img-editorial"
                loading="lazy"
              />
            </div>
            <div className="pt-2.5 flex items-center justify-between text-[10px] font-mono text-ash uppercase">
              <span>Североморск • Архив записей</span>
              <span className="w-2 h-2 rounded-full bg-[#D9483B]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Balanced Brush Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 border-t border-mist/80 pt-12">
        {/* Quote 02: Rest with Warm Ochre Gouache Brush */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-ash tracking-widest uppercase block">
            ЦИТАТА № 02 • ПРАВО НА ОТДЫХ
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl text-ink leading-snug">
            «Отдых — это{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium italic text-[#D97706]">
                базовая потребность
              </span>
              <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#D97706]/20 rounded-sm -z-0" />
            </span>
            , а не награда, которую нужно заслужить изнеможением.»
          </blockquote>
          <p className="text-xs text-ash leading-relaxed">
            В обществе достигаторства отдых превратили в трофей за подвиг. На консультациях мы учимся
            останавливаться без самоедства и чувства вины.
          </p>
          <div className="pt-1">
            <a
              href={restQuote.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Пост #${restQuote.postId} в Telegram канале (откроется в новой вкладке)`}
              className="text-xs font-mono text-ash hover:text-ink underline inline-flex items-center gap-1"
            >
              <span>Пост #{restQuote.postId} в канале</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Quote 03: Boundaries with Deep Amethyst Brush */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-mist md:pl-10 pt-8 md:pt-0">
          <span className="font-mono text-xs text-ash tracking-widest uppercase block">
            ЦИТАТА № 03 • ГРАНИЦЫ И ГОЛОС
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl text-ink leading-snug">
            «Сказать «нет» другому человеку — это в первую очередь сказать{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium italic text-[#583D72]">
                «да» себе
              </span>
              <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#583D72]/20 rounded-sm -z-0" />
            </span>
            {' '}и своему здоровью.»
          </blockquote>
          <p className="text-xs text-ash leading-relaxed">
            Границы — это инструкция по бережному обращению с вашей душой. Защищать себя можно
            спокойно, твёрдо и без бесконечных оправданий.
          </p>
          <div className="pt-1">
            <a
              href={boundaryQuote.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Пост #${boundaryQuote.postId} в Telegram канале (откроется в новой вкладке)`}
              className="text-xs font-mono text-ash hover:text-ink underline inline-flex items-center gap-1"
            >
              <span>Пост #{boundaryQuote.postId} в канале</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
