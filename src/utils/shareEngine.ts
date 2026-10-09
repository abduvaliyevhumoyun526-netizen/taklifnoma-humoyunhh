import LZString from 'lz-string';
import { InvitationSettings } from '../types/invitation';

/**
 * Filter out data URLs (base64 local image uploads) to keep the URL concise
 */
export function cleanSettingsForShare(settings: InvitationSettings): InvitationSettings {
  const isDataUrl = (str?: string) => str && str.startsWith('data:');

  const cleanHero = isDataUrl(settings.design.heroPhotoUrl)
    ? ''
    : settings.design.heroPhotoUrl;

  const cleanBg = isDataUrl(settings.design.bgPhotoUrl)
    ? ''
    : settings.design.bgPhotoUrl;

  const cleanGallery = settings.gallery.filter(item => !isDataUrl(item.url));

  return {
    ...settings,
    design: {
      ...settings.design,
      heroPhotoUrl: cleanHero,
      bgPhotoUrl: cleanBg,
    },
    gallery: cleanGallery,
  };
}

/**
 * Encodes settings to compressed URL-safe string
 */
export function encodeSettings(settings: InvitationSettings): string {
  const cleaned = cleanSettingsForShare(settings);
  const jsonStr = JSON.stringify(cleaned);
  const compressed = LZString.compressToEncodedURIComponent(jsonStr);
  return compressed;
}

/**
 * Decodes compressed URL string back to InvitationSettings
 */
export function decodeSettings(encoded: string): InvitationSettings | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(encoded);
    if (!jsonStr) return null;
    const parsed = JSON.parse(jsonStr) as InvitationSettings;
    return parsed;
  } catch (err) {
    console.error('Failed to decode invitation share data:', err);
    return null;
  }
}

/**
 * Generates full shareable URL with hash
 */
export function generateShareUrl(settings: InvitationSettings): {
  url: string;
  length: number;
  isTooLong: boolean;
} {
  const code = encodeSettings(settings);
  const baseUrl = window.location.origin + window.location.pathname;
  const fullUrl = `${baseUrl}#d=${code}`;
  const length = fullUrl.length;
  const isTooLong = length > 6000;

  return {
    url: fullUrl,
    length,
    isTooLong,
  };
}

/**
 * Extracts hash data if present
 */
export function getHashShareData(): string | null {
  const hash = window.location.hash;
  if (!hash) return null;
  const match = hash.match(/#d=([^&]+)/);
  return match ? match[1] : null;
}
