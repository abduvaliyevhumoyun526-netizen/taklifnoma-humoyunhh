import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface GallerySectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos = settings.gallery;

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
  }, [activePhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
  }, [activePhotoIndex, photos.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    },
    [activePhotoIndex, handleNext, handlePrev]
  );

  useEffect(() => {
    if (activePhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhotoIndex, handleKeyDown]);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <ImageIcon
            className="w-5 h-5"
            style={{ color: settings.design.accentColor }}
          />
        </div>
        <h2
          className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100 font-semibold mb-3"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.galleryTitle}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          {t.gallerySubtitle}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        {photos.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => setActivePhotoIndex(idx)}
            className="relative group aspect-4/5 rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-amber-500/15"
          >
            <img
              src={item.url}
              alt={item.caption || `Photo ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              {item.caption && (
                <span className="text-xs text-white font-medium drop-shadow">
                  {item.caption}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/70 text-white hover:bg-stone-800 transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/70 text-white hover:bg-stone-800 transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Center Image View */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].caption || 'Lightbox view'}
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              {photos[activePhotoIndex].caption && (
                <p className="mt-3 text-sm text-stone-300 font-sans tracking-wide">
                  {photos[activePhotoIndex].caption}
                </p>
              )}
              <span className="text-xs text-stone-400 mt-1">
                {activePhotoIndex + 1} / {photos.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
