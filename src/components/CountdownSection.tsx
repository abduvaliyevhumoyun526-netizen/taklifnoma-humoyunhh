import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, PartyPopper } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS, getCountdownUnitLabel } from '../utils/translations';

interface CountdownSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPassed: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const calculateTimeRemaining = (): TimeRemaining => {
    try {
      const [year, month, day] = settings.eventDate.split('-').map(Number);
      const [hour, minute] = (settings.startTime || '18:00').split(':').map(Number);

      const target = new Date(year, month - 1, day, hour, minute, 0);
      const now = new Date();

      const diff = target.getTime() - now.getTime();

      // Check if it's the celebration day (within 24 hours of start time)
      if (diff <= 0) {
        const passedHours = Math.abs(diff) / (1000 * 60 * 60);
        if (passedHours < 24) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPassed: false };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPassed: true };
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds, isToday: false, isPassed: false };
    } catch {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPassed: false };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [settings.eventDate, settings.startTime]);

  const units: Array<{
    key: 'days' | 'hours' | 'minutes' | 'seconds';
    val: number;
  }> = [
    { key: 'days', val: timeLeft.days },
    { key: 'hours', val: timeLeft.hours },
    { key: 'minutes', val: timeLeft.minutes },
    { key: 'seconds', val: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock
            className="w-4 h-4"
            style={{ color: settings.design.accentColor }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">
            {t.countdownTitle}
          </span>
        </div>

        {timeLeft.isToday ? (
          <div className="glass-card rounded-2xl p-8 border border-amber-500/30 max-w-lg mx-auto shadow-xl">
            <PartyPopper
              className="w-12 h-12 mx-auto mb-3 animate-bounce"
              style={{ color: settings.design.accentColor }}
            />
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {t.todayIsTheDay}
            </h3>
          </div>
        ) : timeLeft.isPassed ? (
          <div className="glass-card rounded-2xl p-8 border border-amber-500/20 max-w-lg mx-auto shadow-md">
            <p className="text-lg font-serif text-stone-700 dark:text-stone-300">
              {t.eventPassed}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto mt-6">
            {units.map(({ key, val }) => {
              const label = getCountdownUnitLabel(key, val, lang);
              return (
                <div
                  key={key}
                  className="glass-card rounded-2xl p-4 sm:p-6 border border-amber-500/20 shadow-lg flex flex-col items-center justify-center transform transition-transform hover:scale-105"
                >
                  <span
                    className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100"
                    style={{
                      fontFamily: `"${settings.design.headingFont}", serif`,
                    }}
                  >
                    {String(val).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-2 font-medium">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
};
