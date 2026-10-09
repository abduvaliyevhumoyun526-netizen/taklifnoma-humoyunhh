import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Camera,
  UtensilsCrossed,
  Music,
  Gift,
  Building,
  Sparkles,
} from 'lucide-react';
import { InvitationSettings, Language, ProgramIcon } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface TimelineSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const activeItems = settings.program.filter(item => item.enabled);

  const getIcon = (iconType: ProgramIcon) => {
    switch (iconType) {
      case 'rings':
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'camera':
        return <Camera className="w-5 h-5" />;
      case 'banquet':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'dancing':
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'gift':
        return <Gift className="w-5 h-5" />;
      case 'mosque':
        return <Building className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  if (activeItems.length === 0) return null;

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <h2
          className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100 font-semibold mb-3"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.programTitle}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          {t.programSubtitle}
        </p>
      </div>

      <div className="relative">
        {/* Central Vertical Timeline Rule */}
        <div
          className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${settings.design.accentColor}66, transparent)`,
          }}
        />

        <div className="space-y-10 md:space-y-12">
          {activeItems.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const title = item.title[lang] || item.title.uz;
            const desc = item.description ? (item.description[lang] || item.description.uz) : '';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex items-center md:justify-between ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Content Card */}
                <div className="ml-14 md:ml-0 md:w-[44%]">
                  <div className="glass-card rounded-2xl p-5 sm:p-6 border border-amber-500/20 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white tracking-wider"
                        style={{ backgroundColor: settings.design.primaryColor }}
                      >
                        {item.time}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-serif font-semibold text-stone-900 dark:text-stone-100"
                      style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
                    >
                      {title}
                    </h3>

                    {desc && (
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Timeline Center Badge Icon */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-stone-900 z-10 transition-transform hover:scale-110"
                  style={{ backgroundColor: settings.design.accentColor }}
                >
                  {getIcon(item.icon)}
                </div>

                {/* Empty spacer for alternating desktop layout */}
                <div className="hidden md:block md:w-[44%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
