export const maxComputerDate = new Date(2037, 11, 31, 23, 59, 59);
export const INVALID_DATE = 'Invalid Date';

export const monthDayYearDateFormat = 'MMM d, yyyy';

export const nowUTC = () => {
  const date = new Date();
  const nowUtc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return new Date(nowUtc);
};

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

/**
 * returns date formatted like `Short month name day, year`
 *
 * @export
 * @param {Date} date
 * @returns {String}
 */
export function getInternationalDateFormat(date: Date | string): string {
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = months[newDate.getUTCMonth()];
  const day = newDate.getUTCDate();
  return `${month} ${day}, ${year}`;
}

export interface MonthDateRange {
  startDate: Date;
  endDate: Date;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export function formatInLongMonthDayYear(date: Date | string): string {
  if (date === undefined || date === '') {
    return '-';
  }
  return new Date(date).toLocaleString(undefined, {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }); // December 06, 2025
}
export function formatInMonthDayYear(date: Date | string): string {
  if (date === undefined || date === '') {
    return '-';
  }
  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: '2-digit',
    year: 'numeric'
  }); // 12/06/2025
}

// this function checks only incoming parameter is Date
// with valid Data value
export function isValidDate(date: Date | string): boolean {
  return date instanceof Date && !isNaN(date.valueOf());
}

export const datesDifferenceInDays = (date1: Date | string, date2: Date | string) => {
  const firstDay = new Date(date1).getTime();
  const lastDay = new Date(date2).getTime();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((firstDay - lastDay) / oneDay));
};
