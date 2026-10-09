import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, XCircle, Plus, Minus, SendHorizontal } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';
import { formatShortDate } from '../utils/dateFormat';

interface RsvpSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ settings, lang }) => {
  const t = TRANSLATIONS[lang];
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [guestMessage, setGuestMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState<null | 'attending' | 'declined'>(null);
  const [nameError, setNameError] = useState(false);

  const maxGuests = Math.max(1, (settings.rsvp.maxGuestsAllowed || 0) + 1);

  // Check deadline
  const isDeadlinePassed = Boolean(
    settings.rsvp.deadlineDate &&
    new Date(settings.rsvp.deadlineDate + 'T23:59:59').getTime() < Date.now()
  );

  const formattedDate = formatShortDate(settings.eventDate, lang);
  const coupleNames =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1} ${settings.separator} ${settings.person2}`
      : settings.person1;

  const buildMessage = (status: 'attending' | 'declined'): string => {
    const isAttending = status === 'attending';

    if (lang === 'uz') {
      const statusText = isAttending
        ? `albatta boramiz (${guestCount} kishi)`
        : 'afsuski bora olmaymiz';
      return `Assalomu alaykum! Men ${guestName || 'Mehmon'}. ${formattedDate} kuni bo‘lib o‘tadigan ${coupleNames} ning tantanasiga ${statusText}.${guestMessage ? ` Tilaklarim: "${guestMessage}"` : ''}`;
    }

    if (lang === 'ru') {
      const statusText = isAttending
        ? `с радостью приду (${guestCount} чел.)`
        : 'к сожалению, не смогу прийти';
      return `Здравствуйте! Это ${guestName || 'Гость'}. По поводу торжества ${coupleNames} (${formattedDate}): ${statusText}.${guestMessage ? ` Пожелания: "${guestMessage}"` : ''}`;
    }

    // en
    const statusText = isAttending
      ? `will attend with pleasure (${guestCount} guest(s))`
      : 'regretfully decline';
    return `Hello! This is ${guestName || 'Guest'}. Regarding the celebration of ${coupleNames} on ${formattedDate}: I ${statusText}.${guestMessage ? ` Message: "${guestMessage}"` : ''}`;
  };

  const handleSend = (status: 'attending' | 'declined', channel: 'telegram' | 'whatsapp') => {
    if (!guestName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);

    const message = buildMessage(status);
    const encoded = encodeURIComponent(message);

    if (channel === 'telegram') {
      const username = settings.rsvp.telegramUsername.replace(/^@/, '');
      const url = `https://t.me/${username}?text=${encoded}`;
      window.open(url, '_blank');
    } else {
      const cleanPhone = settings.rsvp.whatsappNumber.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
      window.open(url, '_blank');
    }

    setHasSubmitted(status);
  };

  return (
    <section className="relative py-20 px-4 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/25 shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Send
              className="w-5 h-5"
              style={{ color: settings.design.accentColor }}
            />
          </div>
          <h2
            className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2"
            style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
          >
            {t.rsvpTitle}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {t.rsvpSubtitle}
          </p>

          {settings.rsvp.deadlineDate && (
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-2">
              {t.rsvpDeadlineNote}{' '}
              {formatShortDate(settings.rsvp.deadlineDate, lang)}
            </p>
          )}
        </div>

        {isDeadlinePassed ? (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-base font-serif font-semibold text-stone-800 dark:text-stone-200">
              {t.rsvpClosed}
            </p>
          </div>
        ) : hasSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-3"
          >
            {hasSubmitted === 'attending' ? (
              <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500 animate-bounce" />
            ) : (
              <XCircle className="w-14 h-14 mx-auto text-stone-400" />
            )}
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {hasSubmitted === 'attending'
                ? t.rsvpSuccessTitle
                : t.rsvpDeclinedTitle}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto">
              {hasSubmitted === 'attending'
                ? t.rsvpSuccessText
                : t.rsvpDeclinedText}
            </p>
            <button
              onClick={() => setHasSubmitted(null)}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 underline mt-4 cursor-pointer"
            >
              {lang === 'uz' ? 'Qaytadan yuborish' : lang === 'ru' ? 'Отправить снова' : 'Send again'}
            </button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {/* Guest Name input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                {t.guestNameLabel} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={guestName}
                onChange={e => {
                  setGuestName(e.target.value);
                  if (nameError) setNameError(false);
                }}
                placeholder={t.guestNamePlaceholder}
                className={`w-full px-4 py-3 rounded-xl glass-panel text-stone-900 dark:text-stone-100 border focus:outline-hidden focus:ring-2 transition-all ${
                  nameError
                    ? 'border-rose-500 focus:ring-rose-400'
                    : 'border-stone-300/60 dark:border-stone-700 focus:ring-amber-500'
                }`}
              />
              {nameError && (
                <p className="text-xs text-rose-500 mt-1">{t.errorRequired}</p>
              )}
            </div>

            {/* Attendees Stepper */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                {t.attendeesLabel}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={guestCount <= 1}
                  onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                  className="w-11 h-11 rounded-xl glass-panel border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 py-2.5 rounded-xl glass-panel border border-stone-300 dark:border-stone-700 text-center font-bold text-stone-900 dark:text-stone-100">
                  {guestCount} {t.attendeesCount}
                </div>
                <button
                  type="button"
                  disabled={guestCount >= maxGuests}
                  onClick={() => setGuestCount(prev => Math.min(maxGuests, prev + 1))}
                  className="w-11 h-11 rounded-xl glass-panel border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-200 disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Note / Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                {t.guestMessageLabel}
              </label>
              <textarea
                rows={2}
                value={guestMessage}
                onChange={e => setGuestMessage(e.target.value)}
                placeholder={t.guestMessagePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl glass-panel text-stone-900 dark:text-stone-100 border border-stone-300/60 dark:border-stone-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all resize-none text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              {/* Telegram buttons */}
              {(settings.rsvp.method === 'telegram' || settings.rsvp.method === 'both') &&
                settings.rsvp.telegramUsername && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSend('attending', 'telegram')}
                      className="w-full py-3 px-4 rounded-xl font-medium text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer text-sm"
                      style={{ backgroundColor: settings.design.primaryColor }}
                    >
                      <SendHorizontal className="w-4 h-4" />
                      <span>{t.btnAttending} (TG)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSend('declined', 'telegram')}
                      className="w-full py-3 px-4 rounded-xl font-medium glass-panel border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-500/10 transition-all cursor-pointer text-sm"
                    >
                      <span>{t.btnDeclined}</span>
                    </button>
                  </div>
                )}

              {/* WhatsApp buttons */}
              {(settings.rsvp.method === 'whatsapp' || settings.rsvp.method === 'both') &&
                settings.rsvp.whatsappNumber && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSend('attending', 'whatsapp')}
                      className="w-full py-3 px-4 rounded-xl font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer text-sm"
                    >
                      <SendHorizontal className="w-4 h-4" />
                      <span>{t.btnAttending} (WA)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSend('declined', 'whatsapp')}
                      className="w-full py-3 px-4 rounded-xl font-medium glass-panel border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-500/10 transition-all cursor-pointer text-sm"
                    >
                      <span>{t.btnDeclined}</span>
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
