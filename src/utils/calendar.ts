import { InvitationSettings, Language } from '../types/invitation';
import { getEventHeadline } from './translations';

function formatIcsDateTime(dateStr: string, timeStr: string): string {
  // dateStr is YYYY-MM-DD, timeStr is HH:mm
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = (timeStr || '18:00').replace(/:/g, '') + '00';
  return `${cleanDate}T${cleanTime}`;
}

export function generateIcsContent(settings: InvitationSettings, lang: Language): string {
  const headline = getEventHeadline(
    settings.eventType,
    lang,
    settings.customEventTitle?.[lang]
  );
  const names =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1} ${settings.separator} ${settings.person2}`
      : settings.person1;

  const title = `${headline} — ${names}`;
  const startDt = formatIcsDateTime(settings.eventDate, settings.startTime);

  // Estimate end time ~ 5 hours later
  const [startHour, startMin] = settings.startTime.split(':').map(Number);
  const endHour = ((startHour || 18) + 5) % 24;
  const endDt = `${settings.eventDate.replace(/-/g, '')}T${String(endHour).padStart(2, '0')}${String(startMin || 0).padStart(2, '0')}00`;

  const venue = settings.primaryLocation.venueName;
  const address = `${settings.primaryLocation.address}, ${settings.primaryLocation.city}`;
  const description = `${settings.welcomeMessage[lang]}\n\nVenue: ${venue}\nAddress: ${address}`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Taklifnoma//Digital Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:invitation-${Date.now()}@taklifnoma.uz`,
    `DTSTAMP:${formatIcsDateTime(new Date().toISOString().slice(0, 10), '00:00')}Z`,
    `DTSTART;TZID=${settings.timeZone || 'Asia/Tashkent'}:${startDt}`,
    `DTEND;TZID=${settings.timeZone || 'Asia/Tashkent'}:${endDt}`,
    `SUMMARY:${title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n').replace(/,/g, '\\,')}`,
    `LOCATION:${address.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    // 1-day reminder
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${title.replace(/,/g, '\\,')} tomorrow!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n');
}

export function downloadIcsFile(settings: InvitationSettings, lang: Language): void {
  const content = generateIcsContent(settings, lang);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `invitation-${settings.person1}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(settings: InvitationSettings, lang: Language): string {
  const headline = getEventHeadline(
    settings.eventType,
    lang,
    settings.customEventTitle?.[lang]
  );
  const names =
    settings.person2 && settings.person2.trim()
      ? `${settings.person1} ${settings.separator} ${settings.person2}`
      : settings.person1;

  const title = encodeURIComponent(`${headline} — ${names}`);
  const startDt = formatIcsDateTime(settings.eventDate, settings.startTime);
  const [startHour, startMin] = settings.startTime.split(':').map(Number);
  const endHour = ((startHour || 18) + 5) % 24;
  const endDt = `${settings.eventDate.replace(/-/g, '')}T${String(endHour).padStart(2, '0')}${String(startMin || 0).padStart(2, '0')}00`;

  const details = encodeURIComponent(
    `${settings.welcomeMessage[lang]}\n\nVenue: ${settings.primaryLocation.venueName}`
  );
  const location = encodeURIComponent(
    `${settings.primaryLocation.venueName}, ${settings.primaryLocation.address}, ${settings.primaryLocation.city}`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDt}/${endDt}&details=${details}&location=${location}&ctz=${settings.timeZone || 'Asia/Tashkent'}`;
}
