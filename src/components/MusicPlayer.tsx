import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, AlertCircle } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { Language } from '../types/invitation';

interface MusicPlayerProps {
  audioUrl: string;
  trackTitle: string;
  lang: Language;
  accentColor: string;
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioUrl,
  trackTitle,
  lang,
  accentColor,
  autoPlayTrigger,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio();
    audio.src = audioUrl;
    audio.loop = true;
    audio.preload = 'auto';

    audio.onerror = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audioRef.current = audio;

    const handleVisibility = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [audioUrl]);

  // If user opened envelope, attempt to start playing smoothly
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying && !hasError) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browser prevented autoplay
        });
    }
  }, [autoPlayTrigger, hasError]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.warn('Playback blocked or failed:', err);
          setHasError(true);
        });
    }
  };

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
      <div className="relative">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`relative w-12 h-12 rounded-full glass-panel shadow-xl flex items-center justify-center border transition-all duration-300 transform active:scale-90 cursor-pointer ${
            isPlaying ? 'border-amber-400' : 'border-stone-400/30'
          }`}
          style={{
            boxShadow: isPlaying ? `0 0 16px ${accentColor}55` : undefined,
          }}
        >
          {/* Vinyl spinning rings */}
          <div
            className={`w-9 h-9 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            <div
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: accentColor || '#d97706' }}
            />
          </div>

          {/* Floating icon badge */}
          <div className="absolute -top-1 -right-1 bg-white dark:bg-stone-800 rounded-full p-1 shadow border border-amber-500/20 text-stone-800 dark:text-stone-100">
            {hasError ? (
              <AlertCircle className="w-3 h-3 text-red-500" />
            ) : isPlaying ? (
              <Volume2 className="w-3 h-3 text-amber-500" />
            ) : (
              <VolumeX className="w-3 h-3 text-stone-400" />
            )}
          </div>
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute left-14 bottom-1 w-max max-w-xs px-3 py-1.5 rounded-lg glass-panel text-xs text-stone-800 dark:text-stone-200 border border-amber-500/20 shadow-lg pointer-events-none transition-all">
            <div className="flex items-center gap-1.5 font-medium">
              <Music className="w-3 h-3 text-amber-500" />
              <span>{hasError ? t.musicError : trackTitle || 'Background Music'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
