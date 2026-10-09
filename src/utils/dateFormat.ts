import { Language } from '../types/invitation';

export function formatEventDate(dateStr: string, lang: Language): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const localeMap: Record<Language, string> = {
      uz: 'uz-UZ',
      en: 'en-US',
      ru: 'ru-RU',
    };

    const locale = localeMap[lang] || 'uz-UZ';

    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatted = formatter.format(date);
    // Capitalize first letter
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string, lang: Language): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const localeMap: Record<Language, string> = {
      uz: 'uz-UZ',
      en: 'en-US',
      ru: 'ru-RU',
    };

    return new Intl.DateTimeFormat(localeMap[lang], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}
