import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gift } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface DressCodeSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const dressCodeText = settings.dressCodeText[lang] || settings.dressCodeText.uz;
  const giftNote = settings.giftWishesNote[lang] || settings.giftWishesNote.uz;

  return (
    <section className="relative py-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        {/* Dress code card */}
        {settings.extras.showDressCode && (
          <div className="glass-card rounded-3xl p-8 border border-amber-500/20 shadow-xl text-center">
            <div className="flex justify-center mb-3">
              <Sparkles
                className="w-5 h-5"
                style={{ color: settings.design.accentColor }}
              />
            </div>

            <h3
              className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2"
              style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
            >
              {t.dressCodeTitle}
            </h3>
            <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-6">
              {t.dressCodeSubtitle}
            </p>

            {/* Color Swatches Palette */}
            {settings.dressCodeColors && settings.dressCodeColors.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6">
                {settings.dressCodeColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-stone-800 shadow-md transform transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans max-w-lg mx-auto">
              {dressCodeText}
            </p>
          </div>
        )}

        {/* Gift & Wishes Note */}
        {settings.extras.showGiftNote && giftNote && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-lg text-center flex flex-col items-center">
            <Gift
              className="w-5 h-5 mb-2"
              style={{ color: settings.design.accentColor }}
            />
            <h4
              className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2"
              style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
            >
              {t.giftNoteTitle}
            </h4>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans max-w-lg">
              {giftNote}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};
