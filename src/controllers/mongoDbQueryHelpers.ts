import { INVALID_DATE } from '@/utils/date-time';

export interface RegexQuery {
  $regex: string;
  $options?: string;
}
export type FiltersQuery = Record<string, RegexQuery>;
export type FiltersFromQuery = Record<string, string | undefined>;

const sanitizeRegularExpression = (expression: string) => {
  if (expression) {
    return expression.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
  return null;
};

export const getFiltersQuery = (filters: FiltersFromQuery, regexOptions = ''): FiltersQuery => {
  return (
    Object.entries(filters)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, filterValue]) => !!filterValue)
      .reduce((acc, [filterKey, filter]) => {
        // do not touch dates
        if (new Date(parseInt(filter as string)).toString() !== INVALID_DATE) {
          acc[filterKey] = {
            $regex: filter,
            $options: regexOptions
          };
        } else {
          acc[filterKey] = {
            $regex: new RegExp('\\b' + sanitizeRegularExpression(filter)),
            $options: regexOptions
          };
        }
        return acc;
      }, {})
  );
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

export type SortingQueryItem = Record<string, 1 | -1>;
/*
 * filter all defined filters
 * map the sort value to a number (1 for ascending order or -1 for descending order)
 * */
export const getSortingQuery = (
  sortBy: string | string[] = '',
  defaultSorting = '_id.asc'
): Record<string, 1 | -1> => {
  const sortByWithDefault: string[] =
    typeof sortBy === 'string'
      ? sortBy?.length > 0
        ? [sortBy]
        : [defaultSorting]
      : Array.isArray(sortBy) && sortBy.length > 0
        ? sortBy
        : [defaultSorting];

  const sortMap: Record<string, 1 | -1> = {};
  sortByWithDefault.forEach((item) => {
    const itemWithDefault = item?.length > 0 ? item : defaultSorting;
    const splitBySeparator = itemWithDefault.split('.');
    const order = splitBySeparator[splitBySeparator.length - 1] as SortOrder;
    const fieldNameParts = splitBySeparator.slice(0, splitBySeparator.length - 1);
    sortMap[fieldNameParts.join('.')] = order === 'desc' ? -1 : 1;
  });
  return sortMap;
};
