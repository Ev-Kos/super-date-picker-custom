import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

const UNIT_MAP: Record<string, dayjs.ManipulateType> = {
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
} as const;

export const parseTimeString = (str: string): string => {
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
      const parts = s.split('-')[1].split(/(?<=\d)(?=[a-z])/);
      const value = Number(parts[0]);
      const unitRaw = parts[1];
      const unit = unitRaw in UNIT_MAP ? UNIT_MAP[unitRaw] : (unitRaw as dayjs.ManipulateType);

      return dayjs().subtract(value, unit);
    }

    return dayjs(s);
  };

  return parseInternal(str).format('DD.MM.YYYY HH:mm:ss');
};
