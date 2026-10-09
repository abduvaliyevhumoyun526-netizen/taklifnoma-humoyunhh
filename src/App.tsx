/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, AlertCircle, RefreshCw } from 'lucide-react';
import {
  InvitationSettings,
  Language,
  ThemeMode,
} from './types/invitation';
import { DEFAULT_INVITATION_SETTINGS } from './utils/defaults';
import { decodeSettings, getHashShareData } from './utils/shareEngine';
import { TRANSLATIONS } from './utils/translations';
import { Navbar } from './components/Navbar';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { ParticleEffect } from './components/ParticleEffect';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { CountdownSection } from './components/CountdownSection';
import { TimelineSection } from './components/TimelineSection';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { RsvpSection } from './components/RsvpSection';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { CalendarSection } from './components/CalendarSection';
import { QrSection } from './components/QrSection';
import { FooterSection } from './components/FooterSection';
import { SettingsPanel } from './components/SettingsPanel';

const STORAGE_KEY_SETTINGS = 'taklifnoma_invitation_settings_v1';
const STORAGE_KEY_THEME = 'invitation_theme';
const STORAGE_KEY_LANG = 'invitation_lang';

export default function App() {
  // Check if hash has shared data (#d=...)
  const hashData = useMemo(() => getHashShareData(), []);
  const isGuestModeFromHash = Boolean(hashData);

  const [hasDecodeError, setHasDecodeError] = useState(false);
  const [isPreviewAsGuest, setIsPreviewAsGuest] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'event' | 'people' | 'datetime' | 'location' | 'rsvp' | 'design' | 'media' | 'extras' | 'share'>('event');
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [audioTrigger, setAudioTrigger] = useState(false);

  // Settings State: load from hash or localStorage or fallback to defaults
  const [settings, setSettings] = useState<InvitationSettings>(() => {
    if (hashData) {
      const decoded = decodeSettings(hashData);
      if (decoded) {
        return decoded;
      } else {
        setHasDecodeError(true);
      }
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read settings from localStorage:', e);
    }

    return DEFAULT_INVITATION_SETTINGS;
  });

  // Initial Language detection
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (saved && ['uz', 'en', 'ru'].includes(saved)) {
        return saved;
      }
    } catch {}

    if (hashData && settings.defaultLanguage) {
      return settings.defaultLanguage;
    }

    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'ru') return 'ru';
    if (browserLang === 'en') return 'en';
    return 'uz';
  });

  // Theme Mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) as ThemeMode;
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'auto';
  });

  // Apply Theme class to <html>
  useEffect(() => {
    const applyTheme = () => {
      const isDark =
        themeMode === 'dark' ||
        (themeMode === 'auto' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();

    if (themeMode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [themeMode]);

  // Handle language change & persist
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      document.documentElement.setAttribute('lang', lang);
    } catch {}
  };

  // Handle theme change & persist
  const handleThemeChange = (theme: ThemeMode) => {
    setThemeMode(theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {}
  };

  // Save settings in localStorage (debounced) only in Host Mode
  useEffect(() => {
    if (!isGuestModeFromHash) {
      const timer = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
        } catch (e) {
          console.warn('Could not save settings to localStorage:', e);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [settings, isGuestModeFromHash]);

  // Update dynamic document.title and meta description
  useEffect(() => {
    const couple =
      settings.person2 && settings.person2.trim()
        ? `${settings.person1} ${settings.separator} ${settings.person2}`
        : settings.person1;
    const title = `${couple} — ${
      currentLang === 'uz' ? 'Taklifnoma' : currentLang === 'ru' ? 'Пригласительный' : 'Invitation'
    }`;
    document.title = title;
  }, [settings, currentLang]);

  // CSS variables injection for dynamic themes & styling
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.design.primaryColor);
    root.style.setProperty('--accent-color', settings.design.accentColor);
    root.style.fontFamily = `"${settings.design.bodyFont}", sans-serif`;
  }, [settings.design]);

  const t = TRANSLATIONS[currentLang];

  // If hash was corrupted or invalid
  if (hasDecodeError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 text-center">
        <div className="glass-card rounded-2xl p-8 max-w-md border border-rose-500/30 shadow-xl space-y-4">
          <AlertCircle className="w-12 h-12 mx-auto text-rose-500" />
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {t.shareDataError}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {currentLang === 'uz'
              ? 'Havola to‘liq nusxalanmagan yoki eskirgan bo‘lishi mumkin.'
              : currentLang === 'ru'
              ? 'Ссылка может быть неполной или устаревшей.'
              : 'The invitation link might be corrupted or incomplete.'}
          </p>
          <button
            onClick={() => {
              window.location.hash = '';
              window.location.reload();
            }}
            className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.createYourOwn}</span>
          </button>
        </div>
      </div>
    );
  }

  const isGuestMode = isGuestModeFromHash || isPreviewAsGuest;

  return (
    <div className="relative min-h-screen transition-colors duration-300">
      {/* Interactive Envelope Intro (optional) */}
      {settings.extras.showEnvelopeIntro && !hasOpenedEnvelope && (
        <EnvelopeIntro
          settings={settings}
          lang={currentLang}
          onOpen={() => {
            setHasOpenedEnvelope(true);
            setAudioTrigger(true);
          }}
        />
      )}

      {/* Floating Header Navigation (Language & Theme) */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentTheme={themeMode}
        onThemeChange={handleThemeChange}
      />

      {/* Floating Audio Player (bottom-left) */}
      {settings.extras.showMusic && settings.musicUrl && (
        <MusicPlayer
          audioUrl={settings.musicUrl}
          trackTitle={settings.musicTitle}
          lang={currentLang}
          accentColor={settings.design.accentColor}
          autoPlayTrigger={audioTrigger}
        />
      )}

      {/* Lightweight Canvas Particle System */}
      <ParticleEffect
        effect={settings.design.decorativeEffect}
        accentColor={settings.design.accentColor}
      />

      {/* MAIN INVITATION CONTENT SECTIONS */}
      <main className="relative z-10 space-y-4">
        {/* 1. Hero Section */}
        <HeroSection settings={settings} lang={currentLang} />

        {/* 2. Welcome Section */}
        <WelcomeSection settings={settings} lang={currentLang} />

        {/* 3. Countdown Section */}
        {settings.extras.showCountdown && (
          <CountdownSection settings={settings} lang={currentLang} />
        )}

        {/* 4. Program / Timeline */}
        {settings.extras.showProgram && (
          <TimelineSection settings={settings} lang={currentLang} />
        )}

        {/* 5. Location Section */}
        {settings.extras.showLocation && (
          <LocationSection settings={settings} lang={currentLang} />
        )}

        {/* 6. Dress Code & Notes */}
        {(settings.extras.showDressCode || settings.extras.showGiftNote) && (
          <DressCodeSection settings={settings} lang={currentLang} />
        )}

        {/* 7. RSVP Section */}
        {settings.extras.showRsvp && (
          <RsvpSection settings={settings} lang={currentLang} />
        )}

        {/* 8. Gallery Section */}
        {settings.extras.showGallery && (
          <GallerySection settings={settings} lang={currentLang} />
        )}

        {/* 9. Video Section */}
        {settings.extras.showVideo && settings.videoUrl && (
          <VideoSection settings={settings} lang={currentLang} />
        )}

        {/* 10. Add to Calendar */}
        {settings.extras.showCalendar && (
          <CalendarSection settings={settings} lang={currentLang} />
        )}

        {/* 11. QR Code */}
        {settings.extras.showQrCode && (
          <QrSection settings={settings} lang={currentLang} />
        )}

        {/* 12. Footer */}
        <FooterSection
          settings={settings}
          lang={currentLang}
          isGuestMode={isGuestMode}
        />
      </main>

      {/* HOST MODE: Floating Actions & Gear Button */}
      {!isGuestMode && (
        <div className="fixed bottom-4 sm:bottom-5 right-3 sm:right-5 z-40 flex items-center gap-2">
          {/* Quick Share Link button */}
          <button
            onClick={() => {
              setSettingsTab('share');
              setIsSettingsOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-full glass-card border border-amber-500/40 shadow-xl text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-amber-500/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔗</span>
            <span className="hidden sm:inline">
              {currentLang === 'uz' ? 'Havola olish' : currentLang === 'ru' ? 'Ссылка' : 'Share Link'}
            </span>
          </button>

          {/* Quick Preview as Guest button */}
          <button
            onClick={() => setIsPreviewAsGuest(true)}
            className="px-3.5 py-2.5 rounded-full glass-card border border-amber-500/40 shadow-xl text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-amber-500/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            title={t.guestPreview}
          >
            <span>👁️</span>
            <span className="hidden sm:inline">{t.guestPreview}</span>
          </button>

          {/* Gear Settings Button */}
          <button
            onClick={() => {
              setSettingsTab('event');
              setIsSettingsOpen(true);
            }}
            aria-label={t.settings}
            title={t.settings}
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-full glass-card border border-amber-500/40 shadow-2xl flex items-center justify-center text-amber-700 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:rotate-90" />
          </button>
        </div>
      )}

      {/* Guest Preview exit banner */}
      {isPreviewAsGuest && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setIsPreviewAsGuest(false)}
            className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold shadow-2xl border border-amber-500/40 flex items-center gap-2 hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
          >
            <span>✕</span>
            <span>{currentLang === 'uz' ? 'Tahrirlashga qaytish' : currentLang === 'ru' ? 'Вернуться к редактированию' : 'Back to Editing'}</span>
          </button>
        </div>
      )}

      {/* Settings Slide-over Drawer (Host Mode Only) */}
      {!isGuestMode && (
        <SettingsPanel
          isOpen={isSettingsOpen}
          initialTab={settingsTab}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={setSettings}
          onResetDefaults={() => setSettings(DEFAULT_INVITATION_SETTINGS)}
          lang={currentLang}
          onPreviewAsGuest={() => {
            setIsSettingsOpen(false);
            setIsPreviewAsGuest(true);
          }}
        />
      )}
    </div>
  );
}
