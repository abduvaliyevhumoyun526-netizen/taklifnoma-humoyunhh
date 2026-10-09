import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QrCode, Download } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';
import { generateQrDataUrl, downloadQrImage } from '../utils/qr';
import { generateShareUrl } from '../utils/shareEngine';

interface QrSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const QrSection: React.FC<QrSectionProps> = ({ settings, lang }) => {
  const t = TRANSLATIONS[lang];
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    const { url } = generateShareUrl(settings);
    generateQrDataUrl(url, settings.design.primaryColor || '#064e3b').then(dataUrl => {
      setQrUrl(dataUrl);
    });
  }, [settings]);

  if (!qrUrl) return null;

  return (
    <section className="relative py-16 px-4 max-w-sm mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-xl flex flex-col items-center"
      >
        <div className="flex justify-center mb-2">
          <QrCode
            className="w-5 h-5"
            style={{ color: settings.design.accentColor }}
          />
        </div>

        <h3
          className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-1"
          style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
        >
          {t.qrTitle}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-5">
          {t.qrSubtitle}
        </p>

        {/* QR Frame */}
        <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-200 mb-5 max-w-[220px]">
          <img
            src={qrUrl}
            alt="Invitation QR Code"
            className="w-full h-auto aspect-square object-contain rounded-lg"
          />
        </div>

        <button
          onClick={() => downloadQrImage(qrUrl, `qr-${settings.person1}.png`)}
          className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold glass-panel border border-amber-500/30 text-stone-800 dark:text-stone-200 hover:bg-amber-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4 text-amber-600" />
          <span>{t.downloadQr}</span>
        </button>
      </motion.div>
    </section>
  );
};
