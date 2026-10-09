import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface EnvelopeIntroProps {
  settings: InvitationSettings;
  lang: Language;
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  settings,
  lang,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  const initials =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1[0]} & ${settings.person2[0]}`
      : settings.person1.slice(0, 2).toUpperCase();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-sm w-full text-center"
        >
          {/* Decorative halo glow */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-all"
            style={{ backgroundColor: settings.design.accentColor }}
          />

          <div className="relative glass-card rounded-2xl p-8 border border-amber-500/30 shadow-2xl flex flex-col items-center">
            {/* Wax seal emblem */}
            <motion.div
              animate={isOpening ? { scale: [1, 1.2, 0], rotate: [0, 10, -10] } : {}}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-300/40 relative cursor-pointer group mb-5"
              style={{
                backgroundColor: settings.design.primaryColor,
                boxShadow: `0 0 25px ${settings.design.accentColor}55`,
              }}
              onClick={handleOpen}
            >
              <div className="text-white font-serif font-bold text-lg tracking-widest">
                {initials}
              </div>
              <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
            </motion.div>

            {/* Names preview */}
            <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100 font-semibold mb-2">
              {settings.person1}{' '}
              {settings.person2 && (
                <>
                  <span className="text-amber-500">{settings.separator}</span>{' '}
                  {settings.person2}
                </>
              )}
            </h2>

            <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 font-sans">
              {t.openInvitationPrompt}
            </p>

            {/* Action button */}
            <button
              onClick={handleOpen}
              className="w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform active:scale-95 group text-white cursor-pointer"
              style={{
                backgroundColor: settings.design.primaryColor,
                border: `1px solid ${settings.design.accentColor}66`,
              }}
            >
              <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>{t.openInvitation}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
