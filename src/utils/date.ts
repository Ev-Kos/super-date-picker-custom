import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const UNIT_MAP: Record<string, dayjs.ManipulateType> = {
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
} as const;

export const parseTimeString = (str: string): string => {
  if (str.length === 0) return '';

  const parseInternal = (s: string): dayjs.Dayjs => {
    if (s === 'now') return dayjs();

    if (s.includes('/')) {
      const [base, modifier] = s.split('/');
      const date = base === 'now' ? dayjs() : parseInternal(base);

      if (modifier in UNIT_MAP) {
        return date.startOf(UNIT_MAP[modifier]);
      }
      return date;
    }

    if (s.startsWith('now-')) {
      const rest = s.substring(4);
      const match = rest.match(/^(\d+)([a-zA-Z])$/);
      if (match) {
        const value = Number(match[1]);
        const unitRaw = match[2];
        const unit = unitRaw in UNIT_MAP ? UNIT_MAP[unitRaw] : (unitRaw as dayjs.ManipulateType);
        return dayjs().subtract(value, unit);
      }
      return dayjs('');
    }

    return dayjs(s);
  };

  const result = parseInternal(str);
  return result.isValid() ? result.format('DD.MM.YYYY HH:mm:ss') : '';
};
