import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { Language, ThemeMode } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeChange,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
      {/* Language Switcher Pill */}
      <nav
        aria-label={t.language}
        className="glass-panel rounded-full p-1 shadow-lg flex items-center border border-amber-500/20"
      >
        {(['uz', 'en', 'ru'] as Language[]).map(lang => {
          const isActive = currentLang === lang;
          return (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              aria-label={`Switch to ${lang.toUpperCase()}`}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 uppercase tracking-wider ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm scale-105'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {lang}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle Pill */}
      <div
        role="group"
        aria-label={t.theme}
        className="glass-panel rounded-full p-1 shadow-lg flex items-center border border-amber-500/20"
      >
        <button
          onClick={() => onThemeChange('light')}
          title={t.themeLight}
          aria-label={t.themeLight}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            currentTheme === 'light'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onThemeChange('dark')}
          title={t.themeDark}
          aria-label={t.themeDark}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            currentTheme === 'dark'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onThemeChange('auto')}
          title={t.themeAuto}
          aria-label={t.themeAuto}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            currentTheme === 'auto'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
