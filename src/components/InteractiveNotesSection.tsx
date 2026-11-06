import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { journalNotes } from '../data/journalNotes';
import { JournalNote } from '../types';
import { NoteModal } from './NoteModal';
import { psychologistProfile } from '../data/psychologistProfile';

export const InteractiveNotesSection: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<JournalNote | null>(null);

  const featuredNote = journalNotes[0];
  const gridNotes = journalNotes.slice(1);

  // Artistic chromatic accents for each note
  const PIGMENT_ACCENTS = [
    { badgeBg: 'bg-[#D97706]/15', text: 'text-[#D97706]', border: 'group-hover:border-[#D97706]/40' },
    { badgeBg: 'bg-[#583D72]/15', text: 'text-[#583D72]', border: 'group-hover:border-[#583D72]/40' },
    { badgeBg: 'bg-[#2D6A4F]/15', text: 'text-[#2D6A4F]', border: 'group-hover:border-[#2D6A4F]/40' },
    { badgeBg: 'bg-[#D9483B]/15', text: 'text-[#D9483B]', border: 'group-hover:border-[#D9483B]/40' },
    { badgeBg: 'bg-[#1E3A8A]/15', text: 'text-[#1E3A8A]', border: 'group-hover:border-[#1E3A8A]/40' },
  ];

  return (
    <section id="notes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto hairline-t text-left">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-ash block mb-2">
            РАЗДЕЛ 03 • ЖИВОПИСНАЯ ГАЛЕРЕЯ МЫСЛЕЙ
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
            Страницы личного терапевтического журнала
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ash max-w-sm font-serif italic">
          «Публикации, психологические практики и живые наблюдения из канала @terapia_s_trepetom»
        </p>
      </div>

      {/* Featured Lead Story (Large Canvas Spread) */}
      {featuredNote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label={`Читать публикацию: ${featuredNote.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedNote(featuredNote);
            }
          }}
          onClick={() => setSelectedNote(featuredNote)}
          className="mb-12 border border-mist bg-white p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group hover:border-[#1E3A8A]/40 transition-all shadow-subtle hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2"
        >
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#F3EFE6] border border-mist/60 relative">
            <img
              src={featuredNote.photos[0] || './photos/post_174_1.jpg'}
              alt={featuredNote.title}
              className="w-full h-full object-cover object-center img-editorial"
              loading="lazy"
            />
            {/* Subtle watercolor tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[11px] font-mono text-ash uppercase">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A8A]/15 text-[#1E3A8A] font-semibold">
                  ИЗБРАННОЕ
                </span>
                <span>{featuredNote.category}</span>
                <span>•</span>
                <span>{featuredNote.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-ink group-hover:text-[#1E3A8A] transition-colors font-medium leading-snug">
                {featuredNote.title}
              </h3>

              <p className="text-xs sm:text-sm text-charcoal leading-relaxed line-clamp-4">
                {featuredNote.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-mist/80 flex items-center justify-between text-xs">
              <span className="font-mono text-ash">{featuredNote.date}</span>
              <span className="font-medium text-ink flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Читать публикацию</span>
                <ArrowRight className="w-4 h-4 text-[#1E3A8A]" />
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {gridNotes.map((note, idx) => {
          const accent = PIGMENT_ACCENTS[idx % PIGMENT_ACCENTS.length];
          return (
            <motion.article
              key={note.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Читать публикацию: ${note.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNote(note);
                }
              }}
              onClick={() => setSelectedNote(note)}
              className={`border border-mist bg-white p-4 flex flex-col justify-between cursor-pointer group transition-all shadow-subtle hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 ${accent.border}`}
            >
              <div>
                {/* Photo Crop */}
                <div className="aspect-[4/3] overflow-hidden bg-[#F3EFE6] border border-mist/60 mb-4 relative">
                  <img
                    src={note.photos[0] || './photos/post_360_1.jpg'}
                    alt={note.title}
                    className="w-full h-full object-cover object-center img-editorial"
                    loading="lazy"
                  />
                </div>

                {/* Meta with Custom Chromatic Badge */}
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase mb-2">
                  <span className={`px-2 py-0.5 rounded-full ${accent.badgeBg} ${accent.text} font-semibold`}>
                    {note.category}
                  </span>
                  <span className="text-ash">•</span>
                  <span className="text-ash">{note.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl text-ink group-hover:text-charcoal transition-colors font-medium leading-snug mb-2">
                  {note.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3">
                  {note.excerpt}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-mist/60 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-ash">{note.date}</span>
                <span className="font-medium text-ink flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Читать</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Channel Link Footer Strip with Watercolor Border */}
      <div className="mt-12 sm:mt-16 p-6 border border-mist bg-[#F5F5F2] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-serif italic text-lg sm:text-xl text-ink block">
            Больше терапевтических заметок и живых аудиосообщений
          </span>
          <p className="text-xs text-ash mt-0.5">
            Каждую неделю делимся практиками КПТ, книгами и говорим о бережном отношении к себе.
          </p>
        </div>
        <a
          href={psychologistProfile.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-white border border-mist hover:border-[#1E3A8A]/50 text-xs font-mono uppercase tracking-wider text-ink transition-all shadow-subtle shrink-0 flex items-center gap-1.5"
        >
          <span>Канал в Telegram</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Modal Reader */}
      <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
    </section>
  );
};
