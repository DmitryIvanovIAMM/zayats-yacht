import { monthDateRange, months } from '@/utils/date-time';
/*
  Months are 0 based
  new Date(2020, 0, 1) //gives January, 1 2020
  Date args will go back if arg is 0. To get last day of month can do:
  new Date(2020, 1, 0) //gives January, 31 2020
*/

export function getMonthsRange(endMonthIndex: number, value: monthDateRange, year: number) {
  const startMonthIndex = value.startDate.getMonth();
  const startYear = value.startDate.getFullYear();
  /* Reverse selection (e.g. Nov, Jan within the same year or Nov 2021, Jan 2020)*/
  if (startYear > year || (startYear === year && startMonthIndex > endMonthIndex)) {
    return {
      startDate: new Date(year, endMonthIndex, 1),
      endDate: new Date(startYear, startMonthIndex + 1, 0)
    };
  } else {
    return {
      startDate: new Date(startYear, startMonthIndex, 1),
      endDate: new Date(year, endMonthIndex + 1, 0)
    };
  }
}

export function oneMonthRange({ startDate, endDate }: monthDateRange) {
  return (
    startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()
  );
}

export function getLabelText({ startDate, endDate }: monthDateRange) {
  if (oneMonthRange({ startDate, endDate })) {
    const monthName = months[startDate.getMonth()];
    return `${monthName} '${startDate.getFullYear()}`;
  } else {
    const startMonthName = months[startDate.getMonth()];
    const endMonthName = months[endDate.getMonth()];

    const year =
      startDate.getFullYear() === endDate.getFullYear()
        ? startDate.getFullYear()
        : `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
    return `${startMonthName} - ${endMonthName} '${year}`;
  }
}

export function getOneMonthRange(monthIndex: number, year: number): monthDateRange {
  return {
    startDate: new Date(year, monthIndex, 1),
    endDate: new Date(year, monthIndex + 1, 0)
  };
}

export function clickedSameMonth(value: monthDateRange, monthIndex: number, year: number) {
  return (
    oneMonthRange(value) &&
    value.startDate.getMonth() === monthIndex &&
    value.startDate.getFullYear() === year
  );
}

export function monthInRange(value: monthDateRange, monthIndex: number, year: number) {
  const startMonthIndex = value.startDate.getMonth();
  const endMonthIndex = value.endDate.getMonth();
  const startMonthYear = value.startDate.getFullYear();
  const endMonthYear = value.endDate.getFullYear();

  // range within one year (first)
  if (monthIndex > startMonthIndex && monthIndex < endMonthIndex && year === startMonthYear) {
    return true;
  }

  // range within one year (second)
  if (monthIndex > startMonthIndex && monthIndex < endMonthIndex && year === endMonthYear) {
    return true;
  }

  // range from first year when range from two year selected
  if (monthIndex > startMonthIndex && year < endMonthYear && startMonthYear !== endMonthYear) {
    return true;
  }

  // range to last year when range from two year selected
  if (monthIndex < endMonthIndex && year > startMonthYear && startMonthYear !== endMonthYear) {
    return true;
  }
}
