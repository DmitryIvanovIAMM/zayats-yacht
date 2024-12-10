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
