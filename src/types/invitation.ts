export type Language = 'uz' | 'en' | 'ru';
export type ThemeMode = 'light' | 'dark' | 'auto';

export type EventType =
  | 'wedding'
  | 'nikoh'
  | 'engagement'
  | 'birthday'
  | 'anniversary'
  | 'other';

export type ProgramIcon =
  | 'rings'
  | 'camera'
  | 'banquet'
  | 'dancing'
  | 'mosque'
  | 'gift'
  | 'music'
  | 'heart';

export interface ProgramItem {
  id: string;
  time: string;
  title: {
    uz: string;
    en: string;
    ru: string;
  };
  description?: {
    uz: string;
    en: string;
    ru: string;
  };
  icon: ProgramIcon;
  enabled: boolean;
}

export interface LocationDetail {
  venueName: string;
  address: string;
  city: string;
  mapUrl: string;
  extraInfo?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export interface DesignConfig {
  preset: string;
  primaryColor: string;
  accentColor: string;
  headingFont: 'Playfair Display' | 'Cormorant Garamond' | 'Great Vibes' | 'Marcellus' | 'Lora';
  bodyFont: 'Inter' | 'Montserrat' | 'Nunito';
  decorativeEffect: 'particles' | 'petals' | 'sparkles' | 'none';
  bgStyle: 'gradient' | 'pattern' | 'photo';
  bgPattern: 'ikat' | 'geometric' | 'floral' | 'subtle';
  bgPhotoUrl?: string;
  heroPhotoUrl?: string;
}

export interface RsvpConfig {
  method: 'telegram' | 'whatsapp' | 'both';
  telegramUsername: string;
  phoneNumber: string;
  whatsappNumber: string;
  deadlineDate: string; // YYYY-MM-DD
  maxGuestsAllowed: number;
}

export interface ExtrasConfig {
  showCountdown: boolean;
  showProgram: boolean;
  showLocation: boolean;
  showDressCode: boolean;
  showGiftNote: boolean;
  showRsvp: boolean;
  showGallery: boolean;
  showMusic: boolean;
  showVideo: boolean;
  showCalendar: boolean;
  showQrCode: boolean;
  showFooterCredit: boolean;
  showEnvelopeIntro: boolean;
}

export interface InvitationSettings {
  // Event
  eventType: EventType;
  customEventTitle?: {
    uz: string;
    en: string;
    ru: string;
  };
  hostFamilyLine?: {
    uz: string;
    en: string;
    ru: string;
  };

  // People
  person1: string; // e.g. Groom or Celebrant
  person2?: string; // e.g. Bride (empty for birthday/jubilee)
  separator: '&' | 'va' | 'и' | '♥' | '•' | string;
  namesOrder: '1_2' | '2_1';
  ageBadge?: string; // e.g. "30" for Jubilee/Birthday
  parentsLine1?: {
    uz: string;
    en: string;
    ru: string;
  };
  parentsLine2?: {
    uz: string;
    en: string;
    ru: string;
  };

  // Date & Time
  eventDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  timeZone: string; // e.g. "Asia/Tashkent"
  program: ProgramItem[];

  // Location
  primaryLocation: LocationDetail;
  hasSecondaryLocation: boolean;
  secondaryLocation?: LocationDetail;

  // Custom Messages (Multilingual)
  welcomeMessage: {
    uz: string;
    en: string;
    ru: string;
  };
  thankYouMessage: {
    uz: string;
    en: string;
    ru: string;
  };

  // Dress Code & Notes
  dressCodeText: {
    uz: string;
    en: string;
    ru: string;
  };
  dressCodeColors: string[]; // hex codes
  giftWishesNote: {
    uz: string;
    en: string;
    ru: string;
  };

  // Contacts & RSVP
  rsvp: RsvpConfig;

  // Design
  design: DesignConfig;

  // Media
  gallery: GalleryItem[];
  musicUrl: string;
  musicTitle: string;
  videoUrl?: string; // YouTube embed / watch url

  // Extras
  extras: ExtrasConfig;

  // Share defaults
  defaultLanguage: Language;
}
