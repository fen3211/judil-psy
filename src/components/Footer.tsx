import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-mist/80 bg-paper/60 text-xs text-ash">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-12 border-b border-mist/60 text-left">
        {/* Col 1: Colophon & Brand */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage-500"></span>
            <span className="font-serif italic text-xl font-medium text-graphite tracking-tight">
              judil.psy
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-ash pl-2 border-l border-mist">
              Терапия с трепетом
            </span>
          </div>
          <p className="text-xs text-charcoal/80 leading-relaxed max-w-sm">
            Персональный терапевтический журнал психолога-консультанта в КПТ и ACT-подходах. Пространство бережного контакта, снижения тревоги и поиска опоры на себя.
          </p>
          <div className="text-[11px] font-mono text-ash pt-1">
            Москва • Онлайн (Яндекс Телемост)
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="md:col-span-3 space-y-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-graphite font-semibold block mb-2">
            Разделы сайта
          </span>
          <ul className="space-y-1 text-xs text-charcoal">
            <li>
              <a href="#about" className="py-1.5 inline-block hover:text-ink transition-colors">
                Знакомство и подход
              </a>
            </li>
            <li>
              <a href="#problems" className="py-1.5 inline-block hover:text-ink transition-colors">
                С чем я работаю
              </a>
            </li>
            <li>
              <a href="#notes" className="py-1.5 inline-block hover:text-ink transition-colors">
                Заметки из дневника
              </a>
            </li>
            <li>
              <a href="#quotes" className="py-1.5 inline-block hover:text-ink transition-colors">
                Цитаты и смыслы
              </a>
            </li>
            <li>
              <a href="#pricing" className="py-1.5 inline-block hover:text-ink transition-colors">
                Формат и стоимость
              </a>
            </li>
            <li>
              <a href="#faq" className="py-1.5 inline-block hover:text-ink transition-colors">
                Частые вопросы
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct Contacts & Channels */}
        <div className="md:col-span-4 space-y-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-graphite font-semibold block mb-2">
            Каналы связи
          </span>
          <div className="space-y-2">
            <a
              href={psychologistProfile.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-linen hover:bg-paper border border-mist text-graphite transition-all shadow-subtle group"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                <span className="font-medium text-xs">Канал в Telegram</span>
              </div>
              <span className="text-[11px] font-mono text-ash group-hover:text-graphite flex items-center gap-0.5">
                {psychologistProfile.channelHandle}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>

            <a
              href={psychologistProfile.bookingTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-linen hover:bg-paper border border-mist text-graphite transition-all shadow-subtle group"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                <span className="font-medium text-xs">Запись на сессию</span>
              </div>
              <span className="text-[11px] font-mono text-ash group-hover:text-graphite flex items-center gap-0.5">
                @Judildan
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>

            <a
              href={`https://instagram.com/${psychologistProfile.instagramHandle.replace('@', '')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-linen hover:bg-paper border border-mist text-graphite transition-all shadow-subtle group"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-roseDust-500" />
                <span className="font-medium text-xs">Instagram*</span>
              </div>
              <span className="text-[11px] font-mono text-ash group-hover:text-graphite flex items-center gap-0.5">
                {psychologistProfile.instagramHandle}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
            <p className="text-[10px] text-ash/80 italic pt-0.5">
              *Деятельность Meta Platforms Inc. (Instagram) признана экстремистской и запрещена на территории РФ.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal Notice per 323-FZ & 152-FZ */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[11px] text-ash/90 leading-relaxed max-w-2xl">
          <span className="font-semibold text-graphite">Правовая оговорка (323-ФЗ):</span> Услуги психологического консультирования носят исключительно информационно-консультационный характер и не являются медицинской деятельностью. Психолог не ставит клинических диагнозов и не назначает медикаменты. Член Ассоциации когнитивно-поведенческой психотерапии (АКПП).
        </p>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenPrivacy}
            className="text-[11px] underline hover:text-graphite transition-colors"
          >
            Политика конфиденциальности
          </button>
          <span>•</span>
          <span className="font-mono text-[11px]">© 2025–2026</span>
        </div>
      </div>
    </footer>
  );
};

