import React from 'react';
import { motion } from 'motion/react';
import { Video } from 'lucide-react';
import { InvitationSettings, Language } from '../types/invitation';

interface VideoSectionProps {
  settings: InvitationSettings;
  lang: Language;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ settings }) => {
  if (!settings.videoUrl || !settings.extras.showVideo) return null;

  // Extract YouTube embed id
  const getEmbedUrl = (url: string) => {
    try {
      const match =
        url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match && match[1]) {
        return `https://www.youtube-nocookie.com/embed/${match[1]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(settings.videoUrl);

  return (
    <section className="relative py-16 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Video
            className="w-5 h-5"
            style={{ color: settings.design.accentColor }}
          />
          <h3
            className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100"
            style={{ fontFamily: `"${settings.design.headingFont}", serif` }}
          >
            Video
          </h3>
        </div>

        <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden shadow-lg bg-stone-900">
          <iframe
            src={embedUrl}
            title="Event Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </motion.div>
    </section>
  );
};
