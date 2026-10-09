import React from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Download, ExternalLink } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface CalendarSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const googleCalUrl = getGoogleCalendarUrl(settings, lang);

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 border border-amber-500/20 shadow-xl text-center"
      >
        <div className="flex justify-center mb-3">
          <CalendarPlus
            className="w-5 h-5"
            style={{ color: settings.design.accentColor }}
          />
        </div>

        <h3
          className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.calendarTitle}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-8 max-w-md mx-auto">
          {t.calendarSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-xl font-medium text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer text-sm"
            style={{ backgroundColor: settings.design.primaryColor }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.addToGoogleCalendar}</span>
          </a>

          <button
            onClick={() => downloadIcsFile(settings, lang)}
            className="py-3.5 px-6 rounded-xl font-medium glass-panel border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-amber-500/10 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer text-sm"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>{t.downloadIcs}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
