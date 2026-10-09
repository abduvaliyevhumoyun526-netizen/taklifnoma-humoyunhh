import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Settings,
  Calendar,
  Users,
  Clock,
  MapPin,
  Send,
  Palette,
  Image as ImageIcon,
  Sliders,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Download,
  AlertTriangle,
  QrCode,
  Eye,
  Info,
} from 'lucide-react';
import {
  InvitationSettings,
  Language,
  EventType,
  ProgramItem,
  ProgramIcon,
} from '../types/invitation';
import { TRANSLATIONS } from '../utils/translations';
import { STYLE_PRESETS, getPresetById } from '../utils/presets';
import { generateShareUrl } from '../utils/shareEngine';
import { generateQrDataUrl, downloadQrImage } from '../utils/qr';
import { compressImageFile } from '../utils/imageCompressor';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: InvitationSettings;
  onUpdateSettings: (updater: (prev: InvitationSettings) => InvitationSettings) => void;
  onResetDefaults: () => void;
  lang: Language;
  onPreviewAsGuest: () => void;
  initialTab?: TabType;
}

type TabType =
  | 'event'
  | 'people'
  | 'datetime'
  | 'location'
  | 'rsvp'
  | 'design'
  | 'media'
  | 'extras'
  | 'share';

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetDefaults,
  lang,
  onPreviewAsGuest,
  initialTab,
}) => {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<TabType>(initialTab || 'event');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [msgLangTab, setMsgLangTab] = useState<Language>('uz');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const jsonImportRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Compute share link info live
  const shareInfo = generateShareUrl(settings);

  const handleShareCopy = () => {
    try {
      navigator.clipboard.writeText(shareInfo.url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${settings.person1} & ${settings.person2 || ''} Invitation`,
          text: settings.welcomeMessage[lang],
          url: shareInfo.url,
        });
      } catch {
        handleShareCopy();
      }
    } else {
      handleShareCopy();
    }
  };

  const handleShowQr = async () => {
    const dataUrl = await generateQrDataUrl(
      shareInfo.url,
      settings.design.primaryColor || '#064e3b'
    );
    setQrCodeData(dataUrl);
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      onUpdateSettings(prev => ({
        ...prev,
        design: {
          ...prev.design,
          heroPhotoUrl: compressed,
        },
      }));
    } catch (err) {
      console.error('Failed to compress image:', err);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const file = files[0];
      const compressed = await compressImageFile(file);
      if (settings.gallery.length >= 8) return;
      onUpdateSettings(prev => ({
        ...prev,
        gallery: [
          ...prev.gallery,
          {
            id: `g-${Date.now()}`,
            url: compressed,
            caption: 'Our memory',
          },
        ],
      }));
    } catch (err) {
      console.error('Failed to upload gallery image:', err);
    }
  };

  const handleAddPhotoByUrl = () => {
    if (!newPhotoUrl.trim()) return;
    if (settings.gallery.length >= 8) return;
    onUpdateSettings(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        {
          id: `g-${Date.now()}`,
          url: newPhotoUrl.trim(),
          caption: 'Our memory',
        },
      ],
    }));
    setNewPhotoUrl('');
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(settings, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `invitation-config-${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onUpdateSettings(() => parsed);
        alert(lang === 'uz' ? 'Sozlamalar tiklandi!' : lang === 'ru' ? 'Настройки импортированы!' : 'Settings imported successfully!');
      } catch (err) {
        alert(lang === 'uz' ? 'Fayl formati noto‘g‘ri' : lang === 'ru' ? 'Неверный формат файла' : 'Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const applyPreset = (presetId: string) => {
    const p = getPresetById(presetId);
    onUpdateSettings(prev => ({
      ...prev,
      design: {
        ...prev.design,
        preset: p.id,
        primaryColor: p.primaryColor,
        accentColor: p.accentColor,
        headingFont: p.headingFont,
        bodyFont: p.bodyFont,
        bgPattern: p.defaultBgPattern,
        decorativeEffect: p.defaultEffect,
      },
    }));
  };

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: 'event', label: t.tabEvent, icon: <Calendar className="w-4 h-4" /> },
    { id: 'people', label: t.tabPeople, icon: <Users className="w-4 h-4" /> },
    { id: 'datetime', label: t.tabDateTime, icon: <Clock className="w-4 h-4" /> },
    { id: 'location', label: t.tabLocation, icon: <MapPin className="w-4 h-4" /> },
    { id: 'rsvp', label: t.tabRsvp, icon: <Send className="w-4 h-4" /> },
    { id: 'design', label: t.tabDesign, icon: <Palette className="w-4 h-4" /> },
    { id: 'media', label: t.tabMedia, icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'extras', label: t.tabExtras, icon: <Sliders className="w-4 h-4" /> },
    { id: 'share', label: t.tabShare, icon: <Share2 className="w-4 h-4" /> },
  ];

  const isSinglePersonEvent =
    settings.eventType === 'birthday' || settings.eventType === 'anniversary';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full sm:w-[480px] h-full bg-white dark:bg-stone-900 border-l border-amber-500/20 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  {t.settings}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 cursor-pointer"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Horizontal Tabs Scrollable */}
            <div className="flex items-center gap-1 overflow-x-auto p-2 border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950/40 no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB: EVENT */}
              {activeTab === 'event' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.eventTypeLabel}
                    </label>
                    <select
                      value={settings.eventType}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          eventType: e.target.value as EventType,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="wedding">To‘y / Wedding / Свадьба</option>
                      <option value="nikoh">Nikoh / Nikah Ceremony / Никах</option>
                      <option value="engagement">Unashtiruv / Engagement / Помолвка</option>
                      <option value="birthday">Tug‘ilgan kun / Birthday / День рождения</option>
                      <option value="anniversary">Yubiley / Anniversary / Юбилей</option>
                      <option value="other">Boshqa / Other / Другое</option>
                    </select>
                  </div>

                  {/* Multilingual custom title override */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.customEventTitleLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {(['uz', 'en', 'ru'] as Language[]).map(l => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setMsgLangTab(l)}
                          className={`py-1 text-xs font-bold uppercase rounded-md ${
                            msgLangTab === l
                              ? 'bg-amber-600 text-white'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder={`Custom title in ${msgLangTab.toUpperCase()}...`}
                      value={settings.customEventTitle?.[msgLangTab] || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          customEventTitle: {
                            ...prev.customEventTitle,
                            [msgLangTab]: e.target.value,
                          } as any,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  {/* Host / Family line */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.hostFamilyLabel} ({msgLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={settings.hostFamilyLine?.[msgLangTab] || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          hostFamilyLine: {
                            ...prev.hostFamilyLine,
                            [msgLangTab]: e.target.value,
                          } as any,
                        }))
                      }
                      placeholder="e.g. Aliyevlar xonadoni / Aliyev family"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* TAB: PEOPLE */}
              {activeTab === 'people' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {isSinglePersonEvent ? 'Ism (Celebrant)' : t.person1Label}
                    </label>
                    <input
                      type="text"
                      value={settings.person1}
                      onChange={e =>
                        onUpdateSettings(prev => ({ ...prev, person1: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  {!isSinglePersonEvent && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                          {t.person2Label}
                        </label>
                        <input
                          type="text"
                          value={settings.person2 || ''}
                          onChange={e =>
                            onUpdateSettings(prev => ({ ...prev, person2: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                            {t.separatorLabel}
                          </label>
                          <select
                            value={settings.separator}
                            onChange={e =>
                              onUpdateSettings(prev => ({ ...prev, separator: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                          >
                            <option value="&">&</option>
                            <option value="va">va</option>
                            <option value="и">и</option>
                            <option value="♥">♥</option>
                            <option value="•">•</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                            {t.namesOrderLabel}
                          </label>
                          <select
                            value={settings.namesOrder}
                            onChange={e =>
                              onUpdateSettings(prev => ({
                                ...prev,
                                namesOrder: e.target.value as any,
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                          >
                            <option value="1_2">1 & 2</option>
                            <option value="2_1">2 & 1</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {isSinglePersonEvent && (
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.ageBadgeLabel}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 30, 50, 60"
                        value={settings.ageBadge || ''}
                        onChange={e =>
                          onUpdateSettings(prev => ({ ...prev, ageBadge: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.parentsLine1Label} ({msgLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Farhod & Dilnoza Aliyevlar"
                      value={settings.parentsLine1?.[msgLangTab] || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          parentsLine1: {
                            ...prev.parentsLine1,
                            [msgLangTab]: e.target.value,
                          } as any,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.parentsLine2Label} ({msgLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rustam & Feruza Karimovlar"
                      value={settings.parentsLine2?.[msgLangTab] || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          parentsLine2: {
                            ...prev.parentsLine2,
                            [msgLangTab]: e.target.value,
                          } as any,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* TAB: DATE & TIME */}
              {activeTab === 'datetime' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.eventDateLabel}
                      </label>
                      <input
                        type="date"
                        value={settings.eventDate}
                        onChange={e =>
                          onUpdateSettings(prev => ({ ...prev, eventDate: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.eventTimeLabel}
                      </label>
                      <input
                        type="time"
                        value={settings.startTime}
                        onChange={e =>
                          onUpdateSettings(prev => ({ ...prev, startTime: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.timeZoneLabel}
                    </label>
                    <select
                      value={settings.timeZone}
                      onChange={e =>
                        onUpdateSettings(prev => ({ ...prev, timeZone: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    >
                      <option value="Asia/Tashkent">Asia/Tashkent (UTC+5)</option>
                      <option value="Asia/Samarkand">Asia/Samarkand (UTC+5)</option>
                      <option value="Europe/Moscow">Europe/Moscow (UTC+3)</option>
                      <option value="UTC">UTC (UTC+0)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>

                  {/* Program Timeline Items */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase text-stone-700 dark:text-stone-300">
                        {t.programManagerLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItem: ProgramItem = {
                            id: `p-${Date.now()}`,
                            time: '19:00',
                            title: {
                              uz: 'Yangi bosqich',
                              en: 'New Event Item',
                              ru: 'Новый этап',
                            },
                            icon: 'heart',
                            enabled: true,
                          };
                          onUpdateSettings(prev => ({
                            ...prev,
                            program: [...prev.program, newItem],
                          }));
                        }}
                        className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        {t.addProgramItem}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {settings.program.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="checkbox"
                              checked={item.enabled}
                              onChange={e => {
                                const val = e.target.checked;
                                onUpdateSettings(prev => ({
                                  ...prev,
                                  program: prev.program.map(p =>
                                    p.id === item.id ? { ...p, enabled: val } : p
                                  ),
                                }));
                              }}
                              className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                            />
                            <input
                              type="time"
                              value={item.time}
                              onChange={e => {
                                const val = e.target.value;
                                onUpdateSettings(prev => ({
                                  ...prev,
                                  program: prev.program.map(p =>
                                    p.id === item.id ? { ...p, time: val } : p
                                  ),
                                }));
                              }}
                              className="px-2 py-1 rounded border border-stone-300 dark:border-stone-700 text-xs w-24 bg-white dark:bg-stone-900"
                            />
                            <select
                              value={item.icon}
                              onChange={e => {
                                const val = e.target.value as ProgramIcon;
                                onUpdateSettings(prev => ({
                                  ...prev,
                                  program: prev.program.map(p =>
                                    p.id === item.id ? { ...p, icon: val } : p
                                  ),
                                }));
                              }}
                              className="px-2 py-1 rounded border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-900"
                            >
                              <option value="rings">Rings</option>
                              <option value="camera">Camera</option>
                              <option value="banquet">Banquet</option>
                              <option value="dancing">Dancing</option>
                              <option value="mosque">Mosque</option>
                              <option value="heart">Heart</option>
                              <option value="gift">Gift</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateSettings(prev => ({
                                  ...prev,
                                  program: prev.program.filter(p => p.id !== item.id),
                                }));
                              }}
                              className="text-stone-400 hover:text-rose-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            placeholder="Title (UZ / active)"
                            value={item.title[lang] || item.title.uz}
                            onChange={e => {
                              const val = e.target.value;
                              onUpdateSettings(prev => ({
                                ...prev,
                                program: prev.program.map(p =>
                                  p.id === item.id
                                    ? {
                                        ...p,
                                        title: {
                                          ...p.title,
                                          [lang]: val,
                                        },
                                      }
                                    : p
                                ),
                              }));
                            }}
                            className="w-full px-2 py-1 rounded border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-900"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: LOCATION */}
              {activeTab === 'location' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.venueNameLabel}
                    </label>
                    <input
                      type="text"
                      value={settings.primaryLocation.venueName}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          primaryLocation: {
                            ...prev.primaryLocation,
                            venueName: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.addressLabel}
                    </label>
                    <input
                      type="text"
                      value={settings.primaryLocation.address}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          primaryLocation: {
                            ...prev.primaryLocation,
                            address: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.cityLabel}
                    </label>
                    <input
                      type="text"
                      value={settings.primaryLocation.city}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          primaryLocation: {
                            ...prev.primaryLocation,
                            city: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.mapUrlLabel}
                    </label>
                    <input
                      type="url"
                      value={settings.primaryLocation.mapUrl}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          primaryLocation: {
                            ...prev.primaryLocation,
                            mapUrl: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      Qo‘shimcha ma’lumot (Parking / Floor)
                    </label>
                    <input
                      type="text"
                      value={settings.primaryLocation.extraInfo || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          primaryLocation: {
                            ...prev.primaryLocation,
                            extraInfo: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  {/* Toggle secondary location */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.hasSecondaryLocation}
                        onChange={e =>
                          onUpdateSettings(prev => ({
                            ...prev,
                            hasSecondaryLocation: e.target.checked,
                          }))
                        }
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span>{t.secondLocationToggle}</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB: RSVP */}
              {activeTab === 'rsvp' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.rsvpMethodLabel}
                    </label>
                    <select
                      value={settings.rsvp.method}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          rsvp: { ...prev.rsvp, method: e.target.value as any },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    >
                      <option value="both">Telegram & WhatsApp</option>
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.telegramUsernameLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="username_example (without @)"
                      value={settings.rsvp.telegramUsername}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          rsvp: {
                            ...prev.rsvp,
                            telegramUsername: e.target.value.replace(/^@/, ''),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.whatsappLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="+998901234567"
                      value={settings.rsvp.whatsappNumber}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          rsvp: { ...prev.rsvp, whatsappNumber: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.rsvpDeadlineLabel}
                      </label>
                      <input
                        type="date"
                        value={settings.rsvp.deadlineDate}
                        onChange={e =>
                          onUpdateSettings(prev => ({
                            ...prev,
                            rsvp: { ...prev.rsvp, deadlineDate: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.maxPlusGuestsLabel}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={settings.rsvp.maxGuestsAllowed}
                        onChange={e =>
                          onUpdateSettings(prev => ({
                            ...prev,
                            rsvp: {
                              ...prev.rsvp,
                              maxGuestsAllowed: parseInt(e.target.value) || 0,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DESIGN */}
              {activeTab === 'design' && (
                <div className="space-y-5">
                  {/* Preset Templates */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-2">
                      {t.presetThemeLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {STYLE_PRESETS.map(preset => {
                        const isSelected = settings.design.preset === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset.id)}
                            className={`p-2.5 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                                : 'border-stone-200 dark:border-stone-800 hover:border-amber-500/40'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: preset.primaryColor }}
                              />
                              <span
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: preset.accentColor }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                              {preset.name[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.primaryColorLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settings.design.primaryColor}
                          onChange={e =>
                            onUpdateSettings(prev => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                primaryColor: e.target.value,
                              },
                            }))
                          }
                          className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
                          {settings.design.primaryColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.accentColorLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settings.design.accentColor}
                          onChange={e =>
                            onUpdateSettings(prev => ({
                              ...prev,
                              design: {
                                ...prev.design,
                                accentColor: e.target.value,
                              },
                            }))
                          }
                          className="w-9 h-9 rounded-lg border-0 cursor-pointer"
                        />
                        <span className="text-xs font-mono text-stone-600 dark:text-stone-400">
                          {settings.design.accentColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.headingFontLabel}
                      </label>
                      <select
                        value={settings.design.headingFont}
                        onChange={e =>
                          onUpdateSettings(prev => ({
                            ...prev,
                            design: {
                              ...prev.design,
                              headingFont: e.target.value as any,
                            },
                          }))
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      >
                        <option value="Playfair Display">Playfair Display</option>
                        <option value="Cormorant Garamond">Cormorant Garamond</option>
                        <option value="Great Vibes">Great Vibes</option>
                        <option value="Marcellus">Marcellus</option>
                        <option value="Lora">Lora</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                        {t.bodyFontLabel}
                      </label>
                      <select
                        value={settings.design.bodyFont}
                        onChange={e =>
                          onUpdateSettings(prev => ({
                            ...prev,
                            design: {
                              ...prev.design,
                              bodyFont: e.target.value as any,
                            },
                          }))
                        }
                        className="w-full px-2.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Nunito">Nunito</option>
                      </select>
                    </div>
                  </div>

                  {/* Decorative Effect */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.particleEffectLabel}
                    </label>
                    <select
                      value={settings.design.decorativeEffect}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            decorativeEffect: e.target.value as any,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm"
                    >
                      <option value="particles">Zarralar (Floating Gold Particles)</option>
                      <option value="petals">Atirgul yaproqlari (Falling Petals)</option>
                      <option value="sparkles">Yulduzlar (Sparkles)</option>
                      <option value="none">O‘chirilgan (None)</option>
                    </select>
                  </div>

                  {/* Hero Photo Upload or URL */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.heroPhotoLabel}
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t.uploadPhoto}</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroUpload}
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={settings.design.heroPhotoUrl || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          design: {
                            ...prev.design,
                            heroPhotoUrl: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB: MEDIA */}
              {activeTab === 'media' && (
                <div className="space-y-5">
                  {/* Gallery */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold uppercase text-stone-700 dark:text-stone-300">
                        {t.galleryManagerLabel} ({settings.gallery.length}/8)
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={settings.gallery.length >= 8}
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline disabled:opacity-40 cursor-pointer"
                        >
                          + {t.uploadPhoto}
                        </button>
                        <input
                          ref={galleryFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGalleryUpload}
                        />
                      </div>
                    </div>

                    {/* Add by URL */}
                    <div className="flex gap-2 mb-3">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={newPhotoUrl}
                        onChange={e => setNewPhotoUrl(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                      <button
                        type="button"
                        disabled={!newPhotoUrl.trim() || settings.gallery.length >= 8}
                        onClick={handleAddPhotoByUrl}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-semibold cursor-pointer"
                      >
                        {t.addPhotoUrl}
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2">
                      * URL rasmlar ulashish havolasiga kiritiladi. Qurilmadan yuklangan rasmlar esa faqat ushbu brauzerda saqlanadi.
                    </p>

                    <div className="space-y-2">
                      {settings.gallery.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 flex items-center gap-2"
                        >
                          <img
                            src={item.url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <input
                            type="text"
                            value={item.caption || ''}
                            placeholder="Caption..."
                            onChange={e => {
                              const val = e.target.value;
                              onUpdateSettings(prev => ({
                                ...prev,
                                gallery: prev.gallery.map(g =>
                                  g.id === item.id ? { ...g, caption: val } : g
                                ),
                              }));
                            }}
                            className="flex-1 px-2 py-1 text-xs rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                          />
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              onUpdateSettings(prev => {
                                const arr = [...prev.gallery];
                                const tmp = arr[idx];
                                arr[idx] = arr[idx - 1];
                                arr[idx - 1] = tmp;
                                return { ...prev, gallery: arr };
                              });
                            }}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === settings.gallery.length - 1}
                            onClick={() => {
                              onUpdateSettings(prev => {
                                const arr = [...prev.gallery];
                                const tmp = arr[idx];
                                arr[idx] = arr[idx + 1];
                                arr[idx + 1] = tmp;
                                return { ...prev, gallery: arr };
                              });
                            }}
                            className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateSettings(prev => ({
                                ...prev,
                                gallery: prev.gallery.filter(g => g.id !== item.id),
                              }));
                            }}
                            className="p-1 text-stone-400 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audio */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.musicUrlLabel}
                    </label>
                    <input
                      type="url"
                      value={settings.musicUrl}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          musicUrl: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs mb-2"
                    />

                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.musicTitleLabel}
                    </label>
                    <input
                      type="text"
                      value={settings.musicTitle}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          musicTitle: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>

                  {/* Video link */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      {t.videoUrlLabel}
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={settings.videoUrl || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          videoUrl: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB: EXTRAS */}
              {activeTab === 'extras' && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase text-stone-700 dark:text-stone-300 block mb-2">
                    Bo‘limlarni yoqish / o‘chirish (Toggles)
                  </span>

                  {[
                    { key: 'showEnvelopeIntro', label: 'Konvertli kirish (Envelope Animation)' },
                    { key: 'showCountdown', label: 'Ortga hisoblash (Countdown)' },
                    { key: 'showProgram', label: 'Dastur rejasi (Timeline)' },
                    { key: 'showLocation', label: 'Manzil & Xarita (Location)' },
                    { key: 'showDressCode', label: 'Dress-kod (Dress Code)' },
                    { key: 'showGiftNote', label: 'Tilaklar & Sovg‘alar (Gift Note)' },
                    { key: 'showRsvp', label: 'Tashrifni tasdiqlash (RSVP)' },
                    { key: 'showGallery', label: 'Galereya (Photo Gallery)' },
                    { key: 'showVideo', label: 'Video (YouTube Embed)' },
                    { key: 'showCalendar', label: 'Taqvimga qo‘shish (Add to Calendar)' },
                    { key: 'showQrCode', label: 'QR Kod (QR for Print)' },
                    { key: 'showFooterCredit', label: 'Futerda havola (Footer Credit Link)' },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 cursor-pointer"
                    >
                      <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                        {label}
                      </span>
                      <input
                        type="checkbox"
                        checked={(settings.extras as any)[key]}
                        onChange={e => {
                          const val = e.target.checked;
                          onUpdateSettings(prev => ({
                            ...prev,
                            extras: {
                              ...prev.extras,
                              [key]: val,
                            },
                          }));
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  ))}

                  {/* Welcome Message text per language */}
                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                    <label className="block text-xs font-semibold uppercase text-stone-700 dark:text-stone-300 mb-1">
                      Taklif matni (Welcome Message) ({msgLangTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={3}
                      value={settings.welcomeMessage[msgLangTab] || ''}
                      onChange={e =>
                        onUpdateSettings(prev => ({
                          ...prev,
                          welcomeMessage: {
                            ...prev.welcomeMessage,
                            [msgLangTab]: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs resize-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB: SHARING */}
              {activeTab === 'share' && (
                <div className="space-y-4">
                  {/* Share Link Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        {t.generateShareLink}
                      </span>
                      <span className="text-xs font-mono text-stone-500">
                        {shareInfo.length} chars
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Ushbu havolani nusxalab mehmonga yuboring. Mehmon uchun sozlamalar paneli ko‘rinmaydi.
                    </p>

                    {shareInfo.isTooLong && (
                      <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{t.linkTooLongWarning}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleShareCopy}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        {copiedShare ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{t.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>{t.copyShareLink}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="py-2.5 px-4 rounded-xl glass-panel border border-amber-500/30 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Local image note */}
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{t.localImageNotice}</span>
                  </div>

                  {/* Guest Preview */}
                  <button
                    type="button"
                    onClick={onPreviewAsGuest}
                    className="w-full py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 glass-panel text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-500/10 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.guestPreview}</span>
                  </button>

                  {/* QR Code generator */}
                  <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                    <button
                      type="button"
                      onClick={handleShowQr}
                      className="w-full py-2 px-3 rounded-lg bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>{t.qrTitle} (Generate PNG)</span>
                    </button>

                    {qrCodeData && (
                      <div className="flex flex-col items-center pt-2">
                        <img
                          src={qrCodeData}
                          alt="QR Code"
                          className="w-36 h-36 rounded-lg shadow-sm border mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => downloadQrImage(qrCodeData, 'share-qr.png')}
                          className="text-xs font-semibold text-amber-600 underline cursor-pointer"
                        >
                          {t.downloadQr}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Export & Import JSON */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center justify-center gap-1.5 hover:bg-stone-500/10 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.exportJson}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => jsonImportRef.current?.click()}
                      className="py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300 flex items-center justify-center gap-1.5 hover:bg-stone-500/10 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{t.importJson}</span>
                    </button>
                    <input
                      ref={jsonImportRef}
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleImportJson}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(t.resetDefaultsConfirm)) {
                    onResetDefaults();
                  }
                }}
                className="py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{t.save}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
