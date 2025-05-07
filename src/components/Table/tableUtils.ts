import { addMinutes } from '@/utils/date-time';
import { SortingState, ColumnFiltersState } from '@tanstack/react-table';

const isDateValue = (maybeDate: Date | unknown): boolean => {
  //return isDate(maybeDate);
  return maybeDate instanceof Date && !isNaN(maybeDate.valueOf());
};

/* this function is used to remove the date frontend offset from the filters,
   it is applicable only to filters in format ColumnFilter[]
   and now used only for filters in Table component
 */
export const removeDateOffsetFromFilters = (
  allFilters: ColumnFiltersState,
  dateFilterIds: string[]
) => {
  return allFilters.map((filter) => {
    if (dateFilterIds.includes(filter.id) && isDateValue(filter.value)) {
      const dateOffset = (filter?.value as Date)?.getTimezoneOffset();
      return {
        ...filter,
        value: addMinutes(filter.value as Date, -dateOffset)
      };
    }

    return filter;
  });
};

export const getFiltersQueryParameters = (filters: ColumnFiltersState) => {
  return filters.reduce<Record<string, string>>((acc, { id, value }) => {
    acc[id] = value as string;
    return acc;
  }, {});
};

export const replaceUnderlinesInFilterStates = (filterState: ColumnFiltersState) => {
  return filterState.map((filter) => {
    return {
      ...filter,
      id: filter.id.replace(/_/g, '.')
    };
  });
};

export const replaceUnderlinesInSortingState = (sortingState: SortingState) => {
  return sortingState.map((sort) => {
    return {
      ...sort,
      id: sort.id.replace(/_/g, '.')
    };
  });
};

export const mapReactTableSortToApiSort = (sortItems: SortingState) => {
  return sortItems.map((sortItem) => {
    return `${sortItem.id}.${sortItem.desc ? 'desc' : 'asc'}`;
  });
};
