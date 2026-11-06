import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 sm:mb-20">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 06 • ФОРМАТ И СТОИМОСТЬ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            Условия и правила консультаций
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-xs font-serif italic">
          «Прозрачные условия без скрытых доплат и давления»
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Main Price Dossier */}
        <div className="lg:col-span-6 border border-mist bg-paper p-8 sm:p-10 shadow-subtle space-y-8">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
              ИНДИВИДУАЛЬНАЯ КОНСУЛЬТАЦИЯ
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl sm:text-6xl text-ink font-medium tracking-tight">
                2 500 ₽
              </span>
              <span className="text-sm font-mono text-ash">/ 55 минут</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal mt-3 leading-relaxed">
              Индивидуальная онлайн-встреча в Яндекс Телемост. Подходит для работы с тревогой,
              личными границами, кризисными периодами и самооценкой.
            </p>
          </div>

          <div className="space-y-3 border-t border-mist/80 pt-6 text-xs text-charcoal">
            <div className="flex items-center justify-between py-1.5 border-b border-mist/40">
              <span className="text-ash font-mono uppercase text-[11px]">Платформа</span>
              <span className="font-medium text-ink">Яндекс Телемост (видеосвязь)</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-mist/40">
              <span className="text-ash font-mono uppercase text-[11px]">Длительность</span>
              <span className="font-medium text-ink">55 минут</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-mist/40">
              <span className="text-ash font-mono uppercase text-[11px]">Оплата</span>
              <span className="font-medium text-ink">Банковский перевод перед сессией</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-mist/40">
              <span className="text-ash font-mono uppercase text-[11px]">Регулярность</span>
              <span className="font-medium text-ink">Рекомендуется 1 раз в неделю</span>
            </div>
          </div>

          {/* Primary Action Button directly to Telegram */}
          <div className="pt-2">
            <a
              href={psychologistProfile.bookingTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-ink hover:bg-graphite text-paper text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-all shadow-subtle hover:shadow group"
            >
              <span>Записаться на консультацию</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Essential Session Agreement / Rules */}
        <div className="lg:col-span-6 space-y-8">
          <div className="border border-mist bg-linen p-6 sm:p-8 space-y-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-ash block">
              ПРАВИЛО ОТМЕНЫ И ПЕРЕНОСА (СТ. 781 ГК РФ)
            </span>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
              Бронирование времени консультации является двусторонним обязательством.
              Перенос или отмена сессии возможны <strong>не позднее чем за 24 часа</strong> до назначенного времени.
            </p>
            <p className="text-xs text-ash leading-relaxed">
              При более поздней отмене или неявке сессия считается проведённой и подлежит оплате
              в полном объёме, так как это время закреплено персонально за вами.
            </p>
          </div>

          <div className="space-y-4 text-xs text-charcoal leading-relaxed pl-2">
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold block">
                Конфиденциальность
              </span>
              <p className="text-ash">
                Вся озвученная информация защищена этическим кодексом психолога и не передаётся третьим лицам.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold block">
                Немедицинский статус
              </span>
              <p className="text-ash">
                Консультации носят психологический характер, не включают постановку психиатрических диагнозов
                и назначение медикаментозного лечения (323-ФЗ РФ).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
