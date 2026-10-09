import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';
import { OrnamentalDivider } from './Ornaments';

interface WelcomeSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ settings, lang }) => {
  const t = TRANSLATIONS[lang];
  const welcomeText = settings.welcomeMessage[lang] || settings.welcomeMessage.uz;
  const hostFamily = settings.hostFamilyLine?.[lang];
  const parents1 = settings.parentsLine1?.[lang];
  const parents2 = settings.parentsLine2?.[lang];

  return (
    <section className="relative py-20 px-4 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 sm:p-12 border border-amber-500/20 shadow-xl relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: settings.design.accentColor }}
        />

        <div className="flex justify-center mb-4">
          <Heart
            className="w-5 h-5 fill-current"
            style={{ color: settings.design.accentColor }}
          />
        </div>

        <h2
          className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 font-semibold mb-6"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.welcomeTitle}
        </h2>

        {/* Heartfelt invitation text */}
        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-6 font-normal">
          {welcomeText}
        </p>

        {/* Traditional Ornamental Filigree Divider */}
        <OrnamentalDivider
          color={settings.design.accentColor || '#d97706'}
          className="w-56 h-6 my-4 mx-auto"
        />

        {/* Host / Family Attribution */}
        {hostFamily && (
          <div className="mt-4">
            <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 block mb-1">
              {t.hostedBy}
            </span>
            <span
              className="text-base sm:text-lg font-serif font-medium text-stone-900 dark:text-stone-200"
              style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
            >
              {hostFamily}
            </span>
          </div>
        )}

        {/* Parents information lines if provided */}
        {(parents1 || parents2) && (
          <div className="mt-5 pt-5 border-t border-amber-500/10 flex flex-col sm:flex-row justify-center gap-4 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {parents1 && <div>{parents1}</div>}
            {parents1 && parents2 && <span className="hidden sm:inline opacity-40">•</span>}
            {parents2 && <div>{parents2}</div>}
          </div>
        )}
      </motion.div>
    </section>
  );
};
