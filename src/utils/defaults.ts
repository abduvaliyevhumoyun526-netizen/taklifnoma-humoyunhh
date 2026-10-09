import { InvitationSettings } from '../types/invitation';

export const DEFAULT_INVITATION_SETTINGS: InvitationSettings = {
  eventType: 'wedding',
  customEventTitle: {
    uz: '',
    en: '',
    ru: '',
  },
  hostFamilyLine: {
    uz: 'Aliyevlar va Karimovlar xonadoni',
    en: 'Aliyev & Karimov Families',
    ru: 'Семьи Алиевых и Каримовых',
  },

  person1: 'Aziz',
  person2: 'Madina',
  separator: '&',
  namesOrder: '1_2',
  ageBadge: '',
  parentsLine1: {
    uz: 'Farhod & Dilnoza Aliyevlar',
    en: 'Farhod & Dilnoza Aliyev',
    ru: 'Фарход и Дильноза Алиевы',
  },
  parentsLine2: {
    uz: 'Rustam & Feruza Karimovlar',
    en: 'Rustam & Feruza Karimov',
    ru: 'Рустам и Феруза Каримовы',
  },

  eventDate: '2026-12-20',
  startTime: '18:00',
  timeZone: 'Asia/Tashkent',

  program: [
    {
      id: 'p-nikoh',
      time: '16:00',
      title: {
        uz: 'Nikoh marosimi',
        en: 'Nikah Ceremony',
        ru: 'Священный обряд Никах',
      },
      description: {
        uz: 'Yaqinlar davrasida nikoh o‘qilishi',
        en: 'Blessing and marriage vows with immediate family',
        ru: 'Благословение союза в кругу самых близких',
      },
      icon: 'rings',
      enabled: true,
    },
    {
      id: 'p-photos',
      time: '17:00',
      title: {
        uz: 'Foto sessiya & Mehmonlarni kutib olish',
        en: 'Photo Session & Welcome Drink',
        ru: 'Фотосессия и встреча гостей',
      },
      description: {
        uz: 'Yodgorlik suratlari va furshyet',
        en: 'Commemorative photos and welcome reception',
        ru: 'Памятные фотографии и праздничный фуршет',
      },
      icon: 'camera',
      enabled: true,
    },
    {
      id: 'p-banquet',
      time: '18:00',
      title: {
        uz: 'Tantanali to‘y oqshomi',
        en: 'Wedding Banquet & Reception',
        ru: 'Торжественный свадебный банкет',
      },
      description: {
        uz: 'Kelin-kuyovning tantanali kirib kelishi va dasturxon',
        en: 'Grand entrance of the couple and festive dinner',
        ru: 'Торжественный вход молодожёнов и праздничный ужин',
      },
      icon: 'banquet',
      enabled: true,
    },
    {
      id: 'p-dancing',
      time: '21:00',
      title: {
        uz: 'Raqslar va shirinliklar',
        en: 'Dancing & Cake Cutting',
        ru: 'Танцевальная программа и торт',
      },
      description: {
        uz: 'To‘y torti va yorqin kuy-qo‘shiqlar',
        en: 'Celebration cake cutting and open dance floor',
        ru: 'Праздничный торт и зажигательные танцы',
      },
      icon: 'dancing',
      enabled: true,
    },
  ],

  primaryLocation: {
    venueName: '"Registon" Tantanalar Saroyi',
    address: 'Amir Temur shoh ko‘chasi, 12-uy',
    city: 'Toshkent shahri, O‘zbekiston',
    mapUrl: 'https://maps.google.com/?q=Tashkent+Registan+Banquet+Hall',
    extraInfo: 'Katta avtoturargoh va bosh kirish orqali',
  },
  hasSecondaryLocation: false,
  secondaryLocation: {
    venueName: 'Minor Masjidi',
    address: 'Kichik halqa yo‘li, Toshkent',
    city: 'Tashkent',
    mapUrl: 'https://maps.google.com/?q=Minor+Mosque+Tashkent',
    extraInfo: 'Nikoh marosimi uchun',
  },

  welcomeMessage: {
    uz: 'Hayotimizdagi eng baxtli va unutilmas kunda biz bilan birga bo‘lib, quvonchimizga sherik bo‘lishingizni chin yurakdan istaymiz. Sizning tashrifingiz biz uchun katta sharaf va baxtdir!',
    en: 'We would be deeply honored by your presence as we celebrate our love and begin this beautiful new chapter together. Having you with us will make our day truly complete!',
    ru: 'С огромной радостью и трепетом в сердце приглашаем вас разделить с нами самый счастливый и незабываемый день создания нашей семьи. Ваше присутствие станет для нас лучшим подарком!',
  },

  thankYouMessage: {
    uz: 'Sizni tantanamizda kutib qolamiz! Mehr va hurmat ila, Aziz & Madina.',
    en: 'We look forward to celebrating with you! With love, Aziz & Madina.',
    ru: 'С нетерпением ждем встречи с вами! С любовью, Азиз и Мадина.',
  },

  dressCodeText: {
    uz: 'Klassik / Black Tie yoki kechki liboslar. Pastel va zumrad ranglar ma’qul ko‘riladi.',
    en: 'Black Tie / Formal Evening Attire. Emerald green and champagne tones are warmly encouraged.',
    ru: 'Black Tie или вечерний стиль. Будем рады палитре в изумрудных, золотистых и пастельных тонах.',
  },
  dressCodeColors: ['#064e3b', '#047857', '#d97706', '#fbbf24', '#f5f5f4'],

  giftWishesNote: {
    uz: 'Eng katta sovg‘a — bu sizning tabassumingiz va samimiy duolaringizdir. Gullar o‘rniga ezgu tilaklaringizni kutamiz.',
    en: 'Your warm presence and heartfelt blessings are the greatest gifts of all.',
    ru: 'Ваше искреннее присутствие и добрые улыбки — самый ценный подарок для нас.',
  },

  rsvp: {
    method: 'both',
    telegramUsername: 'username_example',
    phoneNumber: '+998901234567',
    whatsappNumber: '+998901234567',
    deadlineDate: '2026-12-10',
    maxGuestsAllowed: 4,
  },

  design: {
    preset: 'emerald-gold',
    primaryColor: '#064e3b',
    accentColor: '#d97706',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Inter',
    decorativeEffect: 'particles',
    bgStyle: 'pattern',
    bgPattern: 'ikat',
    heroPhotoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  },

  gallery: [
    {
      id: 'g-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'Love in the air',
    },
    {
      id: 'g-2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      caption: 'Pure happiness',
    },
    {
      id: 'g-3',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      caption: 'Memories together',
    },
    {
      id: 'g-4',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      caption: 'Golden hour',
    },
    {
      id: 'g-5',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      caption: 'Our story begins',
    },
    {
      id: 'g-6',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      caption: 'Forever & Always',
    },
  ],

  // Romantic piano music (royalty-free mp3)
  musicUrl: 'https://cdn.freesound.org/previews/415/415804_5121236-lq.mp3',
  musicTitle: 'Romantic Wedding Piano Waltz',
  videoUrl: '',

  extras: {
    showCountdown: true,
    showProgram: true,
    showLocation: true,
    showDressCode: true,
    showGiftNote: true,
    showRsvp: true,
    showGallery: true,
    showMusic: true,
    showVideo: false,
    showCalendar: true,
    showQrCode: true,
    showFooterCredit: true,
    showEnvelopeIntro: true,
  },

  defaultLanguage: 'uz',
};
