import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Clock, Bookmark } from 'lucide-react';
import { JournalNote } from '../types';
import { psychologistProfile } from '../data/psychologistProfile';

interface NoteModalProps {
  note: JournalNote | null;
  onClose: () => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ note, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (note) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [note, onClose]);

  return (
    <AnimatePresence>
      {note && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Editorial Window */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-modal-title"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper border border-mist shadow-elevated overflow-hidden z-10 my-8 flex flex-col max-h-[90vh] text-left"
          >
            {/* Header Bar */}
            <div className="px-6 py-4 border-b border-mist flex items-center justify-between bg-parchment sticky top-0 z-20">
              <div className="flex items-center gap-2 text-[11px] font-mono text-ash uppercase">
                <Bookmark className="w-3.5 h-3.5 text-sage-600" />
                <span>{note.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {note.readTime}
                </span>
              </div>

              <button
                autoFocus
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-mist text-ash hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
                aria-label="Закрыть заметку"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Note Title */}
              <h3
                id="note-modal-title"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-normal tracking-tight leading-snug"
              >
                {note.title}
              </h3>

              {/* Note Meta */}
              <div className="flex items-center gap-4 text-xs font-mono text-ash border-b border-mist/80 pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {note.date}
                </span>
                <span>•</span>
                <span className="text-ink font-serif italic">{psychologistProfile.fullName}</span>
              </div>

              {/* Attached Photo if available */}
              {note.photos.length > 0 && (
                <div className="overflow-hidden bg-linen border border-mist max-h-80">
                  <img
                    src={note.photos[0]}
                    alt={note.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Full text with editorial paragraph formatting */}
              <div className="text-sm sm:text-base text-charcoal leading-relaxed space-y-4 font-sans whitespace-pre-line">
                {note.fullText}
              </div>

              {/* Original Telegram Citation Box */}
              <div className="p-4 border border-mist bg-linen flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ash">
                <div>
                  <span className="font-semibold text-ink block">
                    Оригинальная публикация в Telegram-канале
                  </span>
                  Пост № {note.postId} в канале «Терапия с трепетом»
                </div>
                <a
                  href={note.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border border-mist text-ink hover:text-charcoal font-medium transition-colors shadow-subtle shrink-0"
                >
                  <span>Открыть в Telegram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
