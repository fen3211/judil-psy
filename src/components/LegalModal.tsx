import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { psychologistProfile } from '../data/psychologistProfile';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0D131F]/50 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white border border-mist shadow-elevated overflow-hidden z-10 my-8 flex flex-col max-h-[85vh] text-left"
          >
            <div className="px-6 py-4 border-b border-mist flex items-center justify-between bg-[#FAF7F2] sticky top-0 z-20">
              <div className="flex items-center gap-2 text-[11px] font-mono text-ash uppercase">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>Правовая информация • Законодательство РФ</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-mist text-ash hover:text-ink transition-colors focus:outline-none"
                aria-label="Закрыть правовую информацию"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-charcoal leading-relaxed">
              <div>
                <h3 id="legal-modal-title" className="font-serif text-xl sm:text-2xl text-ink font-normal mb-2">
                  Политика конфиденциальности и правовые условия
                </h3>
                <p className="text-xs text-ash font-mono">
                  Редакция от 06 ноября 2026 г. • Психолог {psychologistProfile.fullName}
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-semibold text-ink text-sm">1. Отсутствие сбора персональных данных через сайт (152-ФЗ РФ)</h4>
                <p>
                  Сайт <strong>judil.psy</strong> носит исключительно информационно-ознакомительный характер. Сайт <strong>НЕ содержит веб-форм</strong>, не ведёт базы данных пользователей и не собирает персональные данные на стороне сервера.
                </p>
                <p>
                  Вся коммуникация и согласование времени консультаций происходят непосредственно в мессенджере Telegram в рамках прямого диалога между клиентом и психологом по протоколам шифрования Telegram.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-ink text-sm">2. Немедицинский статус консультаций (323-ФЗ РФ)</h4>
                <p>
                  Услуги психологического консультирования не являются медицинской деятельностью, не предусматривают постановку психиатрических диагнозов, назначение фармакотерапии и не заменяют врачебную помощь.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-ink text-sm">3. Правило отмены и переноса консультаций</h4>
                <p>
                  В соответствии со ст. 781 Гражданского кодекса РФ и ст. 32 Закона РФ «О защите прав потребителей», отмена или перенос подтверждённой консультации возможны <strong>не позднее чем за 24 часа</strong> до назначенного времени.
                </p>
                <p>
                  При отмене менее чем за 24 часа или неявке клиента сессия считается проведённой и подлежит оплате в полном объёме (2 500 ₽), так как рабочее время специалиста было персонально зарезервировано.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-semibold text-ink text-sm">4. Уведомление об экстремистском статусе Meta Platforms Inc.</h4>
                <p className="text-ash text-xs italic">
                  Деятельность корпорации Meta Platforms Inc. (включая социальные сети Facebook и Instagram) признана экстремистской и запрещена на территории Российской Федерации. Ссылки на профиль @judil.psy носят исключительно информационно-архивный характер.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
