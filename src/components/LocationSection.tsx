import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Info } from 'lucide-react';
import { InvitationSettings, Language, LocationDetail } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';

interface LocationSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  settings,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (address: string, id: string) => {
    try {
      navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const renderLocationCard = (loc: LocationDetail, id: string, label?: string) => {
    const fullAddress = `${loc.address}, ${loc.city}`;
    const encodedAddress = encodeURIComponent(`${loc.venueName}, ${fullAddress}`);
    const googleMapsUrl = loc.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    const yandexMapsUrl = `https://yandex.com/maps/?text=${encodedAddress}`;

    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-xl overflow-hidden relative">
        {label && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white mb-3"
            style={{ backgroundColor: settings.design.primaryColor }}
          >
            {label}
          </span>
        )}

        <h3
          className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {loc.venueName}
        </h3>

        <div className="flex items-start gap-2 text-stone-700 dark:text-stone-300 mb-4 font-sans text-sm sm:text-base">
          <MapPin
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: settings.design.accentColor }}
          />
          <div>
            <p className="font-medium">{loc.address}</p>
            <p className="text-stone-500 dark:text-stone-400">{loc.city}</p>
          </div>
        </div>

        {loc.extraInfo && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 text-stone-700 dark:text-stone-300 text-xs sm:text-sm mb-6">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{loc.extraInfo}</span>
          </div>
        )}

        {/* Stylized Aesthetic Map Graphic (Self-contained, fast, reliable, zero API key) */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 bg-stone-100 dark:bg-stone-900 border border-stone-300/40 dark:border-stone-800 flex items-center justify-center group shadow-inner">
          {/* Subtle map grid vector lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`mapGrid-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#mapGrid-${id})`} />
            {/* Organic road curves */}
            <path d="M-10 80 Q 150 120 300 40 T 600 120" fill="none" stroke="currentColor" strokeWidth="6" strokeOpacity="0.4" />
            <path d="M120 -10 Q 180 100 240 240" fill="none" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3" />
          </svg>

          {/* Glowing Animated Pin */}
          <div className="relative flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl text-white transform -translate-y-2 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: settings.design.accentColor }}
            >
              <MapPin className="w-6 h-6 animate-bounce" />
            </div>
            {/* Radar ripple ring */}
            <div
              className="absolute -bottom-1 w-8 h-2.5 rounded-full opacity-40 blur-xs"
              style={{ backgroundColor: settings.design.accentColor }}
            />
            <span className="mt-2 text-xs font-semibold px-2.5 py-1 rounded-md glass-panel shadow text-stone-800 dark:text-stone-200">
              {loc.venueName}
            </span>
          </div>
        </div>

        {/* Action Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-md text-white hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: settings.design.primaryColor }}
          >
            <Navigation className="w-4 h-4" />
            <span>{t.openGoogleMaps}</span>
          </a>

          <a
            href={yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-md bg-stone-800 text-white hover:bg-stone-900 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{t.openYandexMaps}</span>
          </a>

          <button
            onClick={() => handleCopy(`${loc.venueName}, ${fullAddress}`, id)}
            className="py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all glass-panel border border-amber-500/20 text-stone-800 dark:text-stone-200 hover:bg-amber-500/10 cursor-pointer"
          >
            {copiedId === id ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">{t.addressCopied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyAddress}</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-serif text-stone-900 dark:text-stone-100 font-semibold mb-3"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.locationTitle}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          {t.locationSubtitle}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {renderLocationCard(settings.primaryLocation, 'primary')}

        {settings.hasSecondaryLocation && settings.secondaryLocation && (
          renderLocationCard(
            settings.secondaryLocation,
            'secondary',
            lang === 'uz' ? 'Qo‘shimcha manzil' : lang === 'ru' ? 'Вторая локация' : 'Secondary Venue'
          )
        )}
      </motion.div>
    </section>
  );
};
