import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

interface TelegramCTAProps {
  onOpenPrivacy?: () => void;
}

export const TelegramCTA: React.FC<TelegramCTAProps> = ({ onOpenPrivacy }) => {
  return (
    <section id="booking" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto hairline-t text-left">
      {/* Living Canvas Container Box with Warm Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative border border-mist bg-white p-8 sm:p-14 lg:p-16 shadow-elevated overflow-hidden space-y-10"
      >
        {/* Soft Watercolor Atmospheric Glow in Corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D97706]/15 via-[#D9483B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-ash">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span>РАЗДЕЛ 08 • ЗАПИСЬ НА КОНСУЛЬТАЦИЮ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight leading-[1.12]">
            Сделать первый шаг — это уже терапевтическое действие.
          </h2>

          <p className="text-sm sm:text-base text-charcoal leading-relaxed font-sans pt-1">
            Напишите мне напрямую в Telegram. Мы спокойно обсудим ваш запрос, проясним ожидания
            и подберём удобный день и время для консультации в Яндекс Телемост.
            Вам не нужно заранее готовить правильные слова или формулировать идеальную тему —
            мы начнём ровно с того места, где вы находитесь сейчас.
          </p>
        </div>

        {/* Action Buttons Row: Direct Telegram Booking */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <a
            href={psychologistProfile.bookingTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#0D131F] hover:bg-[#1E3A8A] text-paper text-sm sm:text-base font-medium flex items-center justify-center gap-2.5 transition-all shadow-card hover:shadow-elevated group text-center"
          >
            <MessageSquare className="w-4 h-4 text-[#F59E0B]" />
            <span>Записаться на консультацию</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={psychologistProfile.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-full border border-mist hover:border-fog bg-[#FAF7F2] text-charcoal hover:text-ink text-sm font-medium flex items-center justify-center gap-2 transition-all text-center shadow-subtle"
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>Канал @terapia_s_trepetom</span>
          </a>
        </div>

        {/* 3 Reassurance Highlights */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-mist/80 text-xs text-charcoal">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
              <HeartHandshake className="w-4 h-4 text-[#D9483B]" />
              <span>Личный контакт</span>
            </div>
            <p className="text-ash leading-relaxed">
              Вы пишете напрямую психологу Юлии Колесниковой без посредников, администраторов и ботов.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Без анкет и форм</span>
            </div>
            <p className="text-ash leading-relaxed">
              Сайт не собирает ваши персональные данные. Всё конфиденциальное общение защищено сквозным шифрованием Telegram.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
              <span>Бережный диалог</span>
            </div>
            <p className="text-ash leading-relaxed">
              Вы можете задать любые уточняющие вопросы до подтверждения записи и оплаты сессии.
            </p>
          </div>
        </div>

        {/* Statutory Medical & Crisis Disclaimer (323-FZ) */}
        <div className="relative z-10 pt-4 border-t border-mist/60 text-[11px] text-ash/90 leading-relaxed space-y-2">
          <p>
            <strong className="text-ink font-medium">Правовое уведомление (323-ФЗ РФ):</strong> Психологическое консультирование носит информационно-консультационный характер и не является медицинской деятельностью. Психолог не ставит психиатрических диагнозов и не назначает медикаментов.
          </p>
          <p>
            Если вы переживаете острый кризис или угрозу жизни, пожалуйста, обратитесь в круглосуточную службу неотложной психологической помощи: <strong className="text-ink font-medium">8-800-200-01-22</strong> (бесплатно по РФ).
          </p>
          {onOpenPrivacy && (
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="underline hover:text-ink transition-colors"
              >
                Правовая информация и правила отмены консультаций
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
