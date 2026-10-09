import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface FooterSectionProps {
  settings: InvitationSettings;
  lang: Language;
  isGuestMode: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  settings,
  lang,
  isGuestMode,
}) => {
  const t = TRANSLATIONS[lang];
  const thankYouText = settings.thankYouMessage[lang] || settings.thankYouMessage.uz;

  const names =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1} ${settings.separator} ${settings.person2}`
      : settings.person1;

  const handleCreateOwn = () => {
    // Strip hash to enter fresh Host Mode
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <footer className="relative py-16 px-4 text-center border-t border-amber-500/10 mt-12 bg-black/5 dark:bg-black/20">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-center">
          <Heart
            className="w-4 h-4 fill-current animate-pulse"
            style={{ color: settings.design.accentColor }}
          />
        </div>

        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans italic">
          {thankYouText}
        </p>

        <div className="pt-2">
          <span
            className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-wider"
            style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
          >
            {names}
          </span>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.eventDate.split('-')[0]}
          </p>
        </div>

        {/* Discreet link for guests to create their own invitation */}
        {settings.extras.showFooterCredit && isGuestMode && (
          <div className="pt-6">
            <button
              onClick={handleCreateOwn}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{t.createYourOwn}</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
