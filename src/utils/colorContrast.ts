/**
 * WCAG AA Contrast Helper
 */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 10, g: 10, b: 10 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastTextColor(backgroundHex: string): string {
  try {
    const { r, g, b } = hexToRgb(backgroundHex);
    const lum = getLuminance(r, g, b);
    return lum > 0.45 ? '#171717' : '#ffffff';
  } catch {
    return '#ffffff';
  }
}

export function hexToRgba(hex: string, alpha: number): string {
  try {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(217, 119, 6, ${alpha})`;
  }
}
