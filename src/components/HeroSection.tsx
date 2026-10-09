import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { getEventHeadline } from '../utils/translations';
import { formatEventDate } from '../utils/dateFormat';
import { MonogramFrame } from './Ornaments';

interface HeroSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, lang }) => {
  const headline = getEventHeadline(
    settings.eventType,
    lang,
    settings.customEventTitle?.[lang]
  );

  const formattedDate = formatEventDate(settings.eventDate, lang);

  const initials =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1[0]} & ${settings.person2[0]}`
      : settings.person1.slice(0, 2).toUpperCase();

  const isTwoPersons = Boolean(settings.person2 && settings.person2.trim());

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      {/* Background Hero Layer */}
      {settings.design.heroPhotoUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={settings.design.heroPhotoUrl}
            alt="Hero background"
            className="w-full h-full object-cover object-center filter brightness-[0.78] dark:brightness-[0.45] transition-all duration-700 transform scale-105"
          />
          {/* Subtle gradient overlays for contrast and luxury vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-stone-900/40 to-stone-950/70" />
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${settings.design.accentColor}25 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Main Content Card / Floating Container */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Initials Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-6 drop-shadow-md"
        >
          <MonogramFrame
            initials={initials}
            size={110}
            color={settings.design.accentColor || '#d97706'}
          />
        </motion.div>

        {/* Subtitle / Invitation Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-5 border border-amber-500/20 shadow-sm"
        >
          <Sparkles
            className="w-3.5 h-3.5"
            style={{ color: settings.design.accentColor }}
          />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-stone-800 dark:text-stone-200">
            {headline}
          </span>
          <Sparkles
            className="w-3.5 h-3.5"
            style={{ color: settings.design.accentColor }}
          />
        </motion.div>

        {/* Names Header with Custom Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mb-6"
        >
          {isTwoPersons ? (
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-stone-900 dark:text-stone-50 leading-tight"
              style={{
                fontFamily: `"${settings.design.headingFont}", serif`,
              }}
            >
              {settings.namesOrder === '2_1' ? (
                <>
                  <span>{settings.person2}</span>
                  <span
                    className="mx-3 italic font-normal"
                    style={{ color: settings.design.accentColor }}
                  >
                    {settings.separator}
                  </span>
                  <span>{settings.person1}</span>
                </>
              ) : (
                <>
                  <span>{settings.person1}</span>
                  <span
                    className="mx-3 italic font-normal"
                    style={{ color: settings.design.accentColor }}
                  >
                    {settings.separator}
                  </span>
                  <span>{settings.person2}</span>
                </>
              )}
            </h1>
          ) : (
            <div className="flex flex-col items-center">
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-stone-900 dark:text-stone-50"
                style={{
                  fontFamily: `"${settings.design.headingFont}", serif`,
                }}
              >
                {settings.person1}
              </h1>
              {settings.ageBadge && (
                <span
                  className="mt-3 px-4 py-1 text-sm font-semibold rounded-full text-white shadow-md"
                  style={{ backgroundColor: settings.design.primaryColor }}
                >
                  {settings.ageBadge}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Event Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex items-center gap-2.5 text-base sm:text-lg font-medium text-stone-700 dark:text-stone-200 mb-8"
        >
          <Calendar
            className="w-5 h-5"
            style={{ color: settings.design.accentColor }}
          />
          <span className="tracking-wide">{formattedDate}</span>
          <span className="opacity-50">•</span>
          <span>{settings.startTime}</span>
        </motion.div>

        {/* Venue Preview */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-sans tracking-wide max-w-md"
        >
          {settings.primaryLocation.venueName} — {settings.primaryLocation.city}
        </motion.p>
      </div>

      {/* Animated Scroll Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }}
      >
        <ChevronDown className="w-6 h-6 text-stone-700 dark:text-stone-300" />
      </motion.div>
    </section>
  );
};
