import { EventType, Language } from '../types/invitation';

export interface Translations {
  // Navigation & General
  language: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  themeAuto: string;
  settings: string;
  save: string;
  reset: string;
  close: string;
  openInvitation: string;
  openInvitationPrompt: string;
  tapToOpen: string;
  copyAddress: string;
  addressCopied: string;
  openGoogleMaps: string;
  openYandexMaps: string;
  copied: string;
  share: string;
  guestPreview: string;
  todayIsTheDay: string;
  eventPassed: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;

  // Sections
  welcomeTitle: string;
  countdownTitle: string;
  programTitle: string;
  programSubtitle: string;
  locationTitle: string;
  locationSubtitle: string;
  dressCodeTitle: string;
  dressCodeSubtitle: string;
  giftNoteTitle: string;
  rsvpTitle: string;
  rsvpSubtitle: string;
  rsvpClosed: string;
  rsvpDeadlineNote: string;
  galleryTitle: string;
  gallerySubtitle: string;
  calendarTitle: string;
  calendarSubtitle: string;
  addToGoogleCalendar: string;
  downloadIcs: string;
  qrTitle: string;
  qrSubtitle: string;
  downloadQr: string;
  hostedBy: string;

  // RSVP Form
  guestNameLabel: string;
  guestNamePlaceholder: string;
  attendeesLabel: string;
  attendeesCount: string;
  guestMessageLabel: string;
  guestMessagePlaceholder: string;
  btnAttending: string;
  btnDeclined: string;
  sendViaTelegram: string;
  sendViaWhatsapp: string;
  rsvpSuccessTitle: string;
  rsvpSuccessText: string;
  rsvpDeclinedTitle: string;
  rsvpDeclinedText: string;

  // Settings Panel Tabs & Labels
  tabEvent: string;
  tabPeople: string;
  tabDateTime: string;
  tabLocation: string;
  tabRsvp: string;
  tabDesign: string;
  tabMedia: string;
  tabExtras: string;
  tabShare: string;

  eventTypeLabel: string;
  customEventTitleLabel: string;
  hostFamilyLabel: string;
  person1Label: string;
  person2Label: string;
  separatorLabel: string;
  namesOrderLabel: string;
  ageBadgeLabel: string;
  parentsLine1Label: string;
  parentsLine2Label: string;
  eventDateLabel: string;
  eventTimeLabel: string;
  timeZoneLabel: string;
  programManagerLabel: string;
  addProgramItem: string;
  venueNameLabel: string;
  addressLabel: string;
  cityLabel: string;
  mapUrlLabel: string;
  secondLocationToggle: string;
  telegramUsernameLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  rsvpMethodLabel: string;
  rsvpDeadlineLabel: string;
  maxPlusGuestsLabel: string;
  presetThemeLabel: string;
  primaryColorLabel: string;
  accentColorLabel: string;
  headingFontLabel: string;
  bodyFontLabel: string;
  particleEffectLabel: string;
  bgStyleLabel: string;
  bgPatternLabel: string;
  heroPhotoLabel: string;
  uploadPhoto: string;
  orEnterUrl: string;
  galleryManagerLabel: string;
  addPhotoUrl: string;
  musicUrlLabel: string;
  musicTitleLabel: string;
  videoUrlLabel: string;
  generateShareLink: string;
  copyShareLink: string;
  nativeShare: string;
  exportJson: string;
  importJson: string;
  resetDefaultsConfirm: string;
  linkLengthNotice: string;
  linkTooLongWarning: string;
  localImageNotice: string;

  // Footer & Credits
  createYourOwn: string;
  withLove: string;

  // Errors
  errorRequired: string;
  invalidUrl: string;
  invalidTelegram: string;
  shareDataError: string;
  musicError: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  uz: {
    language: "Til",
    theme: "Mavzu",
    themeLight: "Yorug‘",
    themeDark: "Qorong‘i",
    themeAuto: "Avto",
    settings: "Sozlamalar",
    save: "Saqlash",
    reset: "Tiklash",
    close: "Yopish",
    openInvitation: "Taklifnomani ochish",
    openInvitationPrompt: "Aziz mehmonimiz, taklifnomani ochish uchun bosing",
    tapToOpen: "Ochish uchun bosing",
    copyAddress: "Manzilni nusxalash",
    addressCopied: "Manzil nusxalandi!",
    openGoogleMaps: "Google Xarita",
    openYandexMaps: "Yandeks Xarita",
    copied: "Nusxalandi!",
    share: "Ulashish",
    guestPreview: "Mehmon ko‘rinishi",
    todayIsTheDay: "Bugun bizning quvonchli kunimiz! 🎉",
    eventPassed: "Tantanali kunimizda biz bilan birga bo‘lganingiz uchun rahmat!",
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",

    welcomeTitle: "Hurmatli mehmonimiz!",
    countdownTitle: "Tantanagacha qolgan vaqt",
    programTitle: "Dastur rejasi",
    programSubtitle: "Tantananing asosiy vaqtlari va tartibi",
    locationTitle: "To‘yxona manzili",
    locationSubtitle: "Sizni tantanamizda kutib qolamiz",
    dressCodeTitle: "Dress-kod",
    dressCodeSubtitle: "Tavsiya etilgan libos ranglari",
    giftNoteTitle: "Tilaklar va sovg‘alar",
    rsvpTitle: "Tashrifingizni tasdiqlang",
    rsvpSubtitle: "Iltimos, tantanamizga kelishingizni oldindan bildiring",
    rsvpClosed: "Tashrifni tasdiqlash muddati tugagan",
    rsvpDeadlineNote: "Tashrifni tasdiqlashning oxirgi kuni:",
    galleryTitle: "Bizning lahzalarimiz",
    gallerySubtitle: "Eng yorqin va unutilmas xotiralar",
    calendarTitle: "Taqvimga qo‘shish",
    calendarSubtitle: "Muhim sanani o‘tkazib yubormaslik uchun taqvimingizga saqlang",
    addToGoogleCalendar: "Google Taqvim",
    downloadIcs: "iCal / Apple Taqvim (.ics)",
    qrTitle: "QR Kod",
    qrSubtitle: "Taklifnomani ochish yoki chop etish uchun QR kod",
    downloadQr: "QR kodni yuklab olish",
    hostedBy: "Taklif etuvchilar:",

    guestNameLabel: "Ismingiz va familiyangiz",
    guestNamePlaceholder: "Masalan: Jasur Karimov",
    attendeesLabel: "Kishilar soni",
    attendeesCount: "kishi",
    guestMessageLabel: "Ezg‘u tilagingiz yoki izoh (ixtiyoriy)",
    guestMessagePlaceholder: "Ezgu tilaklaringizni yozing...",
    btnAttending: "Albatta boraman",
    btnDeclined: "Afsus, bora olmayman",
    sendViaTelegram: "Telegram orqali yuborish",
    sendViaWhatsapp: "WhatsApp orqali yuborish",
    rsvpSuccessTitle: "Rahmat! Tashrifingiz tasdiqlandi",
    rsvpSuccessText: "Sizni tantanamizda quvonch bilan kutamiz!",
    rsvpDeclinedTitle: "Xabaringiz qabul qilindi",
    rsvpDeclinedText: "E’tiboringiz va ezgu niyatlaringiz uchun tashakkur!",

    tabEvent: "Tadbir",
    tabPeople: "Shaxslar",
    tabDateTime: "Sana & Vaqt",
    tabLocation: "Manzil",
    tabRsvp: "Aloqa & RSVP",
    tabDesign: "Dizayn",
    tabMedia: "Media",
    tabExtras: "Qo‘shimchalar",
    tabShare: "Ulashish",

    eventTypeLabel: "Tadbir turi",
    customEventTitleLabel: "Maxsus sarlavha (agar bo‘lsa)",
    hostFamilyLabel: "Xonadon / Taklif etuvchilar",
    person1Label: "1-shaxs ismi (Masalan: Kuyov / Sohib)",
    person2Label: "2-shaxs ismi (Masalan: Kelin)",
    separatorLabel: "Ajratuvchi belgi",
    namesOrderLabel: "Ismlar ketma-ketligi",
    ageBadgeLabel: "Yosh yoki nishon (Yubiley uchun)",
    parentsLine1Label: "Ota-onalar (1-qator)",
    parentsLine2Label: "Ota-onalar (2-qator)",
    eventDateLabel: "Tadbir sanasi",
    eventTimeLabel: "Boshlanish vaqti",
    timeZoneLabel: "Vaqt mintaqasi",
    programManagerLabel: "Dastur bosqichlari",
    addProgramItem: "+ Yangi bosqich qo‘shish",
    venueNameLabel: "To‘yxona / Maskanning nomi",
    addressLabel: "To‘liq manzil",
    cityLabel: "Shahar",
    mapUrlLabel: "Xarita havolasi (Google, Yandex, 2GIS)",
    secondLocationToggle: "Ikkinchi manzilni qo‘shish (FHDYo / Nikoh)",
    telegramUsernameLabel: "Telegram foydalanuvchi nomi (@ siz)",
    phoneLabel: "Telefon raqami",
    whatsappLabel: "WhatsApp raqami",
    rsvpMethodLabel: "RSVP usuli",
    rsvpDeadlineLabel: "Oxirgi muddat (ixtiyoriy)",
    maxPlusGuestsLabel: "Maksimal birga keluvchilar (+mehmon)",
    presetThemeLabel: "Tayyor dizayn andozalari",
    primaryColorLabel: "Asosiy rang",
    accentColorLabel: "Urg‘u rangi (Oltin / Kumush)",
    headingFontLabel: "Sarlavha shrifti",
    bodyFontLabel: "Matn shrifti",
    particleEffectLabel: "Harakatlanuvchi bezaklar",
    bgStyleLabel: "Fon uslubi",
    bgPatternLabel: "Fon naqshi",
    heroPhotoLabel: "Bosh sahifa fotosurati",
    uploadPhoto: "Surat yuklash",
    orEnterUrl: "yoki URL kiriting",
    galleryManagerLabel: "Galereya rasmlari (12 tagacha)",
    addPhotoUrl: "+ Rasm qo‘shish",
    musicUrlLabel: "Musiqa havolasi (MP3)",
    musicTitleLabel: "Musiqa nomi",
    videoUrlLabel: "Video havolasi (YouTube)",
    generateShareLink: "Ulashish havolasini yaratish",
    copyShareLink: "Havolani nusxalash",
    nativeShare: "Do‘stlarga ulashish",
    exportJson: "Sozlamalarni yuklab olish (JSON)",
    importJson: "Sozlamalarni tiklash (JSON)",
    resetDefaultsConfirm: "Barcha sozlamalar boshlang‘ich holatiga qaytarilsinmi?",
    linkLengthNotice: "Havola uzunligi:",
    linkTooLongWarning: "Diqqat: havola juda uzun bo‘lib ketishi mumkin. URL fotosuratlardan foydalanish tavsiya etiladi.",
    localImageNotice: "Qurilmadan yuklangan fotosuratlar faqat ushbu brauzerda saqlanadi. Ulashish havolasiga faqat internet URL manzillari qo‘shiladi.",

    createYourOwn: "O‘z taklifnomangizni yarating",
    withLove: "Mehr va ehtirom bilan,",

    errorRequired: "Ushbu maydon to‘ldirilishi shart",
    invalidUrl: "Noto‘g‘ri URL manzili",
    invalidTelegram: "Telegram foydalanuvchi nomini @ siz kiriting",
    shareDataError: "Taklifnoma havolasi ma’lumotlarida xatolik yuz berdi.",
    musicError: "Musiqani yuklashda xatolik yuz berdi.",
  },

  en: {
    language: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeAuto: "Auto",
    settings: "Settings",
    save: "Save",
    reset: "Reset",
    close: "Close",
    openInvitation: "Open Invitation",
    openInvitationPrompt: "Our dear guest, tap to open the invitation",
    tapToOpen: "Tap to open",
    copyAddress: "Copy Address",
    addressCopied: "Address copied!",
    openGoogleMaps: "Google Maps",
    openYandexMaps: "Yandex Maps",
    copied: "Copied!",
    share: "Share",
    guestPreview: "Guest View",
    todayIsTheDay: "Today is our celebration day! 🎉",
    eventPassed: "Thank you for celebrating this special day with us!",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",

    welcomeTitle: "Honored Guests!",
    countdownTitle: "Counting Down to the Big Day",
    programTitle: "Schedule of Events",
    programSubtitle: "Key moments and itinerary of our celebration",
    locationTitle: "Venue & Location",
    locationSubtitle: "We look forward to welcoming you",
    dressCodeTitle: "Dress Code",
    dressCodeSubtitle: "Suggested color palette for our celebration",
    giftNoteTitle: "Wishes & Gifts",
    rsvpTitle: "RSVP",
    rsvpSubtitle: "Please let us know if you can make it",
    rsvpClosed: "RSVP is now closed",
    rsvpDeadlineNote: "Kindly respond by:",
    galleryTitle: "Our Moments",
    gallerySubtitle: "Treasured memories and highlights",
    calendarTitle: "Save the Date",
    calendarSubtitle: "Add this special date to your digital calendar",
    addToGoogleCalendar: "Google Calendar",
    downloadIcs: "iCal / Apple Calendar (.ics)",
    qrTitle: "QR Code",
    qrSubtitle: "Scan to open or print this invitation",
    downloadQr: "Download QR Code",
    hostedBy: "Hosted by:",

    guestNameLabel: "Your Full Name",
    guestNamePlaceholder: "e.g. John Doe",
    attendeesLabel: "Number of Attendees",
    attendeesCount: "guest(s)",
    guestMessageLabel: "Warm Wishes or Note (Optional)",
    guestMessagePlaceholder: "Leave your wishes for the couple...",
    btnAttending: "I will attend",
    btnDeclined: "Regretfully decline",
    sendViaTelegram: "Confirm via Telegram",
    sendViaWhatsapp: "Confirm via WhatsApp",
    rsvpSuccessTitle: "Thank you! RSVP Confirmed",
    rsvpSuccessText: "We cannot wait to celebrate with you!",
    rsvpDeclinedTitle: "Response Received",
    rsvpDeclinedText: "Thank you for letting us know and for your warm thoughts!",

    tabEvent: "Event",
    tabPeople: "People",
    tabDateTime: "Date & Time",
    tabLocation: "Location",
    tabRsvp: "Contacts & RSVP",
    tabDesign: "Design",
    tabMedia: "Media",
    tabExtras: "Extras",
    tabShare: "Sharing",

    eventTypeLabel: "Event Type",
    customEventTitleLabel: "Custom Event Title (Optional)",
    hostFamilyLabel: "Host / Family Line",
    person1Label: "Person 1 (e.g. Groom / Host)",
    person2Label: "Person 2 (e.g. Bride)",
    separatorLabel: "Separator",
    namesOrderLabel: "Display Order",
    ageBadgeLabel: "Age or Badge (For Birthday/Jubilee)",
    parentsLine1Label: "Parents (Line 1)",
    parentsLine2Label: "Parents (Line 2)",
    eventDateLabel: "Event Date",
    eventTimeLabel: "Start Time",
    timeZoneLabel: "Time Zone",
    programManagerLabel: "Program Timeline",
    addProgramItem: "+ Add Event Item",
    venueNameLabel: "Venue Name",
    addressLabel: "Full Address",
    cityLabel: "City",
    mapUrlLabel: "Map Link (Google / Yandex / 2GIS)",
    secondLocationToggle: "Add Secondary Location",
    telegramUsernameLabel: "Telegram Username (without @)",
    phoneLabel: "Phone Number",
    whatsappLabel: "WhatsApp Number",
    rsvpMethodLabel: "RSVP Method",
    rsvpDeadlineLabel: "RSVP Deadline Date",
    maxPlusGuestsLabel: "Max Additional Guests (+guests)",
    presetThemeLabel: "Template Preset",
    primaryColorLabel: "Primary Color",
    accentColorLabel: "Accent Color (Gold / Silver)",
    headingFontLabel: "Heading Font",
    bodyFontLabel: "Body Font",
    particleEffectLabel: "Decorative Motion Effect",
    bgStyleLabel: "Background Style",
    bgPatternLabel: "Pattern Motif",
    heroPhotoLabel: "Hero Cover Photo",
    uploadPhoto: "Upload Photo",
    orEnterUrl: "or enter URL",
    galleryManagerLabel: "Gallery Photos (Up to 12)",
    addPhotoUrl: "+ Add Photo",
    musicUrlLabel: "Background Audio URL (MP3)",
    musicTitleLabel: "Track Title",
    videoUrlLabel: "Video Link (YouTube)",
    generateShareLink: "Generate Share Link",
    copyShareLink: "Copy Link",
    nativeShare: "Share via Apps",
    exportJson: "Export Settings (JSON)",
    importJson: "Import Settings (JSON)",
    resetDefaultsConfirm: "Are you sure you want to reset all settings to defaults?",
    linkLengthNotice: "Link length:",
    linkTooLongWarning: "Warning: Share link might be too long for some apps. Using URL images instead of device uploads is recommended.",
    localImageNotice: "Photos uploaded from your device are stored locally and will NOT be included in the share link. Please use online URLs for shared images.",

    createYourOwn: "Create your own invitation",
    withLove: "With heartfelt warmth,",

    errorRequired: "This field is required",
    invalidUrl: "Please enter a valid URL",
    invalidTelegram: "Enter Telegram username without @",
    shareDataError: "Could not load invitation details from link.",
    musicError: "Unable to play background audio.",
  },

  ru: {
    language: "Язык",
    theme: "Тема",
    themeLight: "Светлая",
    themeDark: "Темная",
    themeAuto: "Авто",
    settings: "Настройки",
    save: "Сохранить",
    reset: "Сброс",
    close: "Закрыть",
    openInvitation: "Открыть приглашение",
    openInvitationPrompt: "Дорогой гость, нажмите, чтобы открыть приглашение",
    tapToOpen: "Нажмите, чтобы открыть",
    copyAddress: "Скопировать адрес",
    addressCopied: "Адрес скопирован!",
    openGoogleMaps: "Google Карты",
    openYandexMaps: "Яндекс Карты",
    copied: "Скопировано!",
    share: "Поделиться",
    guestPreview: "Вид гостя",
    todayIsTheDay: "Сегодня наш праздничный день! 🎉",
    eventPassed: "Спасибо, что разделили этот счастливый день вместе с нами!",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",

    welcomeTitle: "Дорогие гости!",
    countdownTitle: "До торжества осталось",
    programTitle: "Программа торжества",
    programSubtitle: "Ключевые моменты и расписание праздника",
    locationTitle: "Место проведения",
    locationSubtitle: "С нетерпением ждем вас на нашем празднике",
    dressCodeTitle: "Дресс-код",
    dressCodeSubtitle: "Рекомендуемая палитра нарядов",
    giftNoteTitle: "Пожелания и подарки",
    rsvpTitle: "Подтверждение присутствия",
    rsvpSubtitle: "Пожалуйста, подтвердите ваше участие заранее",
    rsvpClosed: "Прием подтверждений завершен",
    rsvpDeadlineNote: "Просим ответить до:",
    galleryTitle: "Наши мгновения",
    gallerySubtitle: "Яркие и незабываемые моменты",
    calendarTitle: "Добавить в календарь",
    calendarSubtitle: "Сохраните событие в свой календарь, чтобы не пропустить",
    addToGoogleCalendar: "Google Календарь",
    downloadIcs: "iCal / Apple Календарь (.ics)",
    qrTitle: "QR-код",
    qrSubtitle: "Для открытия или печати пригласительного",
    downloadQr: "Скачать QR-код",
    hostedBy: "Приглашают:",

    guestNameLabel: "Ваше имя и фамилия",
    guestNamePlaceholder: "Например: Алишер Усманов",
    attendeesLabel: "Количество гостей",
    attendeesCount: "чел.",
    guestMessageLabel: "Тёплые пожелания или комментарий (необязательно)",
    guestMessagePlaceholder: "Напишите ваши добрые пожелания...",
    btnAttending: "Обязательно приду",
    btnDeclined: "К сожалению, не смогу",
    sendViaTelegram: "Подтвердить через Telegram",
    sendViaWhatsapp: "Подтвердить через WhatsApp",
    rsvpSuccessTitle: "Спасибо! Присутствие подтверждено",
    rsvpSuccessText: "Мы будем очень рады видеть вас!",
    rsvpDeclinedTitle: "Ответ принят",
    rsvpDeclinedText: "Благодарим за внимание и тёплые пожелания!",

    tabEvent: "Событие",
    tabPeople: "Персоны",
    tabDateTime: "Дата и время",
    tabLocation: "Локация",
    tabRsvp: "Контакты & RSVP",
    tabDesign: "Дизайн",
    tabMedia: "Медиа",
    tabExtras: "Опции",
    tabShare: "Поделиться",

    eventTypeLabel: "Тип события",
    customEventTitleLabel: "Свой заголовок (если есть)",
    hostFamilyLabel: "Семья / Организаторы",
    person1Label: "Имя 1 (Жених / Именинник)",
    person2Label: "Имя 2 (Невеста)",
    separatorLabel: "Разделитель",
    namesOrderLabel: "Порядок имен",
    ageBadgeLabel: "Возраст или юбилейная дата",
    parentsLine1Label: "Родители (Строка 1)",
    parentsLine2Label: "Родители (Строка 2)",
    eventDateLabel: "Дата события",
    eventTimeLabel: "Время начала",
    timeZoneLabel: "Часовой пояс",
    programManagerLabel: "Этапы программы",
    addProgramItem: "+ Добавить этап",
    venueNameLabel: "Название зала / ресторана",
    addressLabel: "Точный адрес",
    cityLabel: "Город",
    mapUrlLabel: "Ссылка на карту (Google, Яндекс, 2GIS)",
    secondLocationToggle: "Добавить вторую локацию (Никах / ЗАГС)",
    telegramUsernameLabel: "Имя пользователя Telegram (без @)",
    phoneLabel: "Номер телефона",
    whatsappLabel: "Номер WhatsApp",
    rsvpMethodLabel: "Способ RSVP",
    rsvpDeadlineLabel: "Крайний срок подтверждения",
    maxPlusGuestsLabel: "Максимум спутников (+гости)",
    presetThemeLabel: "Готовый стиль",
    primaryColorLabel: "Основной цвет",
    accentColorLabel: "Акцентный цвет (Золото / Серебро)",
    headingFontLabel: "Шрифт заголовков",
    bodyFontLabel: "Основной шрифт",
    particleEffectLabel: "Декоративные частицы",
    bgStyleLabel: "Стиль фона",
    bgPatternLabel: "Узор фона",
    heroPhotoLabel: "Главное фото обложки",
    uploadPhoto: "Загрузить фото",
    orEnterUrl: "или ввести URL",
    galleryManagerLabel: "Фотографии галереи (до 12)",
    addPhotoUrl: "+ Добавить фото",
    musicUrlLabel: "Ссылка на музыку (MP3)",
    musicTitleLabel: "Название композиции",
    videoUrlLabel: "Ссылка на видео (YouTube)",
    generateShareLink: "Создать ссылку приглашения",
    copyShareLink: "Копировать ссылку",
    nativeShare: "Поделиться в приложениях",
    exportJson: "Экспорт настроек (JSON)",
    importJson: "Импорт настроек (JSON)",
    resetDefaultsConfirm: "Вы уверены, что хотите сбросить все настройки к начальным?",
    linkLengthNotice: "Длина ссылки:",
    linkTooLongWarning: "Внимание: ссылка может быть слишком длинной. Рекомендуется использовать интернет-ссылки на фото вместо локальных файлов.",
    localImageNotice: "Фотографии, загруженные с устройства, хранятся только в этом браузере и НЕ передаются в ссылке. Используйте URL-ссылки для отправки гостям.",

    createYourOwn: "Создайте своё приглашение",
    withLove: "С любовью и уважением,",

    errorRequired: "Обязательное поле",
    invalidUrl: "Некорректная ссылка",
    invalidTelegram: "Введите логин Telegram без знака @",
    shareDataError: "Не удалось загрузить данные приглашения по ссылке.",
    musicError: "Не удалось загрузить аудиозапись.",
  },
};

/**
 * Event-type aware headline generator
 */
export function getEventHeadline(
  eventType: EventType,
  lang: Language,
  customTitle?: string
): string {
  if (customTitle && customTitle.trim()) {
    return customTitle;
  }

  const headlines: Record<EventType, Record<Language, string>> = {
    wedding: {
      uz: "Sizni to'yimizga taklif qilamiz",
      en: "We invite you to our wedding",
      ru: "Приглашаем вас на нашу свадьбу",
    },
    nikoh: {
      uz: "Sizni nikoh to'yimizga taklif qilamiz",
      en: "We invite you to our Nikah ceremony",
      ru: "Приглашаем вас на наш никах",
    },
    engagement: {
      uz: "Sizni unashtiruv marosimimizga taklif qilamiz",
      en: "We invite you to our engagement celebration",
      ru: "Приглашаем вас на нашу помолвку",
    },
    birthday: {
      uz: "Sizni tug'ilgan kunimga taklif qilaman",
      en: "You are cordially invited to my birthday celebration",
      ru: "Приглашаю вас отпраздновать мой день рождения",
    },
    anniversary: {
      uz: "Sizni yubiley kechamizga taklif qilamiz",
      en: "We invite you to celebrate our anniversary",
      ru: "Приглашаем вас на наш юбилей",
    },
    other: {
      uz: "Sizni tantanamizga taklif qilamiz",
      en: "We cordially invite you to our celebration",
      ru: "Приглашаем вас на наше торжество",
    },
  };

  return headlines[eventType]?.[lang] || headlines.wedding[lang];
}

/**
 * Proper countdown unit label with Russian & Uzbek pluralization rules
 */
export function getCountdownUnitLabel(
  unit: 'days' | 'hours' | 'minutes' | 'seconds',
  value: number,
  lang: Language
): string {
  if (lang === 'uz') {
    const labels = {
      days: 'Kun',
      hours: 'Soat',
      minutes: 'Daqiqa',
      seconds: 'Soniya',
    };
    return labels[unit];
  }

  if (lang === 'en') {
    const isSingle = value === 1;
    const labels = {
      days: isSingle ? 'Day' : 'Days',
      hours: isSingle ? 'Hour' : 'Hours',
      minutes: isSingle ? 'Minute' : 'Minutes',
      seconds: isSingle ? 'Second' : 'Seconds',
    };
    return labels[unit];
  }

  // Russian pluralization (1 день, 2 дня, 5 дней)
  const abs = Math.abs(value) % 100;
  const last = abs % 10;
  let formIndex = 2; // 0 = 1 день, 1 = 2 дня, 2 = 5 дней
  if (abs > 10 && abs < 20) {
    formIndex = 2;
  } else if (last > 1 && last < 5) {
    formIndex = 1;
  } else if (last === 1) {
    formIndex = 0;
  }

  const forms: Record<string, [string, string, string]> = {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
  };

  return forms[unit][formIndex];
}
