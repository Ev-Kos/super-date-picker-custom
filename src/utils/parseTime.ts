const TIME_PERIOD: Record<string, string> = {
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
} as const;

const setToWeekStart = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  date.setDate(date.getDate() - diff);
};

const startOf = (date: Date, period: string): Date => {
  const result = new Date(date);

  switch (period) {
    case 'second':
      result.setMilliseconds(0);
      break;
    case 'minute':
      result.setSeconds(0, 0);
      break;
    case 'hour':
      result.setMinutes(0, 0, 0);
      break;
    case 'day':
      result.setHours(0, 0, 0, 0);
      break;
    case 'week':
      setToWeekStart(result);
      result.setHours(0, 0, 0, 0);
      break;
    case 'month':
      result.setDate(1);
      result.setHours(0, 0, 0, 0);
      break;
    case 'year':
      result.setMonth(0, 1);
      result.setHours(0, 0, 0, 0);
      break;
  }

  return result;
};

const subtract = (date: Date, value: number, period: string): Date => {
  const result = new Date(date);

  switch (period) {
    case 'second':
      result.setSeconds(result.getSeconds() - value);
      break;
    case 'minute':
      result.setMinutes(result.getMinutes() - value);
      break;
    case 'hour':
      result.setHours(result.getHours() - value);
      break;
    case 'day':
      result.setDate(result.getDate() - value);
      break;
    case 'week':
      result.setDate(result.getDate() - value * 7);
      break;
    case 'month':
      result.setMonth(result.getMonth() - value);
      break;
    case 'year':
      result.setFullYear(result.getFullYear() - value);
      break;
  }

  return result;
};

const formatDate = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const parseTime = (date: string): string => {
  if (date.length === 0) return '';

  const parseDate = (str: string): Date => {
    if (str === 'now') return new Date();

    if (str.includes('/')) {
      const [base, modifier] = str.split('/');
      const baseDate = parseDate(base);
      if (isNaN(baseDate.getTime())) return baseDate;

      if (modifier in TIME_PERIOD) {
        return startOf(baseDate, TIME_PERIOD[modifier]);
      }
      return baseDate;
    }

    if (str.startsWith('now-')) {
      const rest = str.substring(4);
      const valid = rest.match(/^(\d+)([a-zA-Z])$/);
      if (valid) {
        const value = Number(valid[1]);
        const unitChar = valid[2];

        if (unitChar in TIME_PERIOD) {
          return subtract(new Date(), value, TIME_PERIOD[unitChar]);
        }
      }
      return new Date(NaN);
    }

    const parsed = new Date(str);
    return isNaN(parsed.getTime()) ? new Date(NaN) : parsed;
  };

  const result = parseDate(date);
  return isNaN(result.getTime()) ? '' : formatDate(result);
};

export const getYearLabel = (count: number) => {
  return count === 1 ? 'Год назад' : count >= 2 && count <= 4 ? 'Года назад' : 'Лет назад';
};

export const getMonthLabel = (count: number) => {
  return count === 1 ? 'Месяц назад' : count >= 2 && count <= 4 ? 'Месяца назад' : 'Месяцев назад';
};

export const getWeekLabel = (count: number) => {
  return count === 1 ? 'Неделю назад' : count >= 2 && count <= 4 ? 'Недели назад' : 'Недель назад';
};

export const getDayLabel = (count: number) => {
  return count === 1 ? 'День назад' : count >= 2 && count <= 4 ? 'Дня назад' : 'Дней назад';
};

export const getHourLabel = (count: number) => {
  return count === 1 ? 'Час назад' : count >= 2 && count <= 4 ? 'Часа назад' : 'Часов назад';
};

export const getMinuteLabel = (count: number) => {
  return count === 1 ? 'Минуту назад' : count >= 2 && count <= 4 ? 'Минуты назад' : 'Минут назад';
};

export const getSecondLabel = (count: number) => {
  return count === 1
    ? 'Секунду назад'
    : count >= 2 && count <= 4
      ? 'Секунды назад'
      : 'Секунд назад';
};
