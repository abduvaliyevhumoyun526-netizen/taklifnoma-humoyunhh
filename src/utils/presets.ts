import { DesignConfig } from '../types/invitation';

export interface StylePreset {
  id: string;
  name: {
    uz: string;
    en: string;
    ru: string;
  };
  primaryColor: string;
  accentColor: string;
  bgGradientLight: string;
  bgGradientDark: string;
  cardBgLight: string;
  cardBgDark: string;
  defaultBgPattern: 'ikat' | 'geometric' | 'floral' | 'subtle';
  defaultEffect: 'particles' | 'petals' | 'sparkles' | 'none';
  headingFont: 'Playfair Display' | 'Cormorant Garamond' | 'Great Vibes' | 'Marcellus' | 'Lora';
  bodyFont: 'Inter' | 'Montserrat' | 'Nunito';
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'emerald-gold',
    name: {
      uz: 'Zumrad & Oltin (Emerald & Gold)',
      en: 'Emerald & Gold',
      ru: 'Изумруд и Золото',
    },
    primaryColor: '#064e3b',
    accentColor: '#d97706',
    bgGradientLight: 'linear-gradient(135deg, #f7faf8 0%, #edf5f0 50%, #fdfbf7 100%)',
    bgGradientDark: 'linear-gradient(135deg, #071711 0%, #0c2017 50%, #05100c 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.88)',
    cardBgDark: 'rgba(12, 32, 23, 0.82)',
    defaultBgPattern: 'ikat',
    defaultEffect: 'particles',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
  },
  {
    id: 'royal-blue-silver',
    name: {
      uz: 'Qirollik Ko‘ki & Kumush (Royal Blue & Silver)',
      en: 'Royal Blue & Silver',
      ru: 'Королевский Синий и Серебро',
    },
    primaryColor: '#1e3a8a',
    accentColor: '#94a3b8',
    bgGradientLight: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f1f5f9 100%)',
    bgGradientDark: 'linear-gradient(135deg, #0b1329 0%, #111d42 50%, #070d1e 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.88)',
    cardBgDark: 'rgba(17, 29, 66, 0.82)',
    defaultBgPattern: 'geometric',
    defaultEffect: 'sparkles',
    headingFont: 'Playfair Display',
    bodyFont: 'Montserrat',
  },
  {
    id: 'blush-rose',
    name: {
      uz: 'Atirgul & Marvarid (Blush Rose)',
      en: 'Blush Rose',
      ru: 'Нежная Роза и Жемчуг',
    },
    primaryColor: '#881337',
    accentColor: '#fb7185',
    bgGradientLight: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fdf8f6 100%)',
    bgGradientDark: 'linear-gradient(135deg, #230811 0%, #350d1a 50%, #17040b 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.9)',
    cardBgDark: 'rgba(53, 13, 26, 0.82)',
    defaultBgPattern: 'floral',
    defaultEffect: 'petals',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Nunito',
  },
  {
    id: 'classic-black-gold',
    name: {
      uz: 'Klassik Qora & Oltin (Black & Gold)',
      en: 'Classic Black & Gold',
      ru: 'Классический Черный и Золото',
    },
    primaryColor: '#18181b',
    accentColor: '#eab308',
    bgGradientLight: 'linear-gradient(135deg, #fafafa 0%, #f4f4f5 50%, #fdfcf7 100%)',
    bgGradientDark: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #050507 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.92)',
    cardBgDark: 'rgba(24, 24, 27, 0.85)',
    defaultBgPattern: 'subtle',
    defaultEffect: 'particles',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
  },
  {
    id: 'terracotta-sand',
    name: {
      uz: 'Terrakotta & Qum (Samarqand Naqshi)',
      en: 'Terracotta & Sand (Uzbek ornament)',
      ru: 'Терракота и Песок (Узбекский орнамент)',
    },
    primaryColor: '#7c2d12',
    accentColor: '#d97706',
    bgGradientLight: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fef3c7 100%)',
    bgGradientDark: 'linear-gradient(135deg, #240e07 0%, #37170c 50%, #1a0804 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.9)',
    cardBgDark: 'rgba(55, 23, 12, 0.82)',
    defaultBgPattern: 'ikat',
    defaultEffect: 'particles',
    headingFont: 'Lora',
    bodyFont: 'Inter',
  },
  {
    id: 'minimal-white',
    name: {
      uz: 'Minimal Oq & Fil Suyagi (Minimal White)',
      en: 'Minimal White',
      ru: 'Минималистичный Белый',
    },
    primaryColor: '#292524',
    accentColor: '#78716c',
    bgGradientLight: 'linear-gradient(135deg, #ffffff 0%, #fafaf9 50%, #f5f5f4 100%)',
    bgGradientDark: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #141210 100%)',
    cardBgLight: 'rgba(255, 255, 255, 0.95)',
    cardBgDark: 'rgba(41, 37, 36, 0.85)',
    defaultBgPattern: 'subtle',
    defaultEffect: 'none',
    headingFont: 'Marcellus',
    bodyFont: 'Inter',
  },
];

export function getPresetById(id: string): StylePreset {
  return STYLE_PRESETS.find(p => p.id === id) || STYLE_PRESETS[0];
}
