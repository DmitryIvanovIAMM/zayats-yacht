import {
  Box,
  Table as MUITable,
  Paper,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  type TableBodyProps
} from '@mui/material';
import { TableSortLabelOwnProps } from '@mui/material/TableSortLabel/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues
} from '@tanstack/react-table';
import uniq from 'lodash/uniq';
import React, { ChangeEvent, MouseEvent, ReactElement, useMemo, useState, useEffect } from 'react';
import { DataFetcherArgs, MutableTableRefObject } from './types';
import { AppEnv } from '@/utils/appEnv';

export const oddRowsGrayColor = {
  '&:nth-of-type(odd)': {
    backgroundColor: 'action.hover'
  }
};

interface TableProps<TableData extends { _id: string }> extends MutableTableRefObject<TableData> {
  //dataFetcherUrl: string;
  data: any;
  isLoading: boolean;
  fetchData: (dataFetcherArgs: DataFetcherArgs) => void;
  columnDefs: ColumnDef<TableData, string>[];
  //dataFetcher: DataFetcher<TableData>;
  noDataText?: string;
  initialPageSize?: number;
  initialFilters?: ColumnFiltersState;
  initialSortBy?: SortingState;
  rowPerPageOptions?: number[];
  manualFiltering?: boolean;
  manualSorting?: boolean;
  renderRowSubComponent?: (row: any) => ReactElement;
  getRowStyles?: (row: any) => any;
  stripedRows?: boolean;
}

const getRowsLabel = ({ from, to, count }: { from: number; to: number; count: number }) => {
  return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`} rows`;
};

export const rowsPerPageOptions = [10, 50, 100];

/**
 * @param columnDefs - column definitions created with [columnHelpers](https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers)
 * @param data - data to show in the table, should be in the format:
 * `{ data: [], total: 0 }`
 * Function will receive all needed arguments (e.g. pagination related data, filtering related data, etc.)
 * @param isLoading - show that data is loading just now.
 * @param fetchData - the functions to update table data
 * @param noDataText - text to show when there is no data
 * @param initialPageSize - how many items to show on each page.
 * @param initialFilters - initial filter to apply
 * @param initialSortBy - initial sorting for the table
 * @param manualFiltering - allow Table component to do server-side filtering
 * @param manualSorting - allow Table component to do server-side sorting
 * @param renderRowSubComponent - function to render subcomponent for each row when it expanded
 * @param getRowStyles - function to get styles for each row
 * @param stripedRows - if true, odd rows will have gray background
 */
export function Table<TableData extends { _id: string }>({
  columnDefs,
  data,
  isLoading,
  fetchData,
  noDataText = 'No Records...',
  initialPageSize = 50,
  initialFilters = [],
  initialSortBy = [],
  manualFiltering = true,
  manualSorting = true,
  renderRowSubComponent = undefined,
  getRowStyles = () => ({}),
  stripedRows = true
}: TableProps<TableData>) {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize
  });
  const [columnFiltersState, setColumnFilters] = useState<ColumnFiltersState>(initialFilters);
  const [sortingState, setSortingState] = useState<SortingState>(initialSortBy);

  const total = data?.total ?? 0;
  const rowPerPageOptions = uniq([initialPageSize, ...rowsPerPageOptions]).sort((a, b) => a - b);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const sorting = useMemo(() => sortingState, [sortingState]);
  const columnFilters = useMemo(() => columnFiltersState, [columnFiltersState]);
  const tableData = useMemo(() => {
    return data?.data ?? [];
  }, [data?.data]);

  const table = useReactTable<TableData>({
    data: tableData,
    columns: columnDefs,
    enableSortingRemoval: false,
    state: {
      pagination,
      columnFilters,
      sorting
    },
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    onSortingChange: setSortingState,
    // https://github.com/TanStack/table/issues/3900
    onColumnFiltersChange: (filtersState) => {
      if (pageIndex !== 0) {
        setPagination((paginationState) => ({ ...paginationState, pageIndex: 0 }));
      }
      setColumnFilters(filtersState);
    },
    getCoreRowModel: getCoreRowModel(),
    sortDescFirst: false,
    debugTable: process.env.APP_ENV === AppEnv.DEV,
    manualFiltering: manualFiltering,
    getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(), // needed for client-side filtering
    manualSorting: manualSorting,
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(), //client-side sorting
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    enableExpanding: true
  });
  const handlePageChange = (_: MouseEvent<HTMLButtonElement> | null, newPageIndex: number) => {
    setPagination((oldPagination) => ({ ...oldPagination, pageIndex: newPageIndex }));
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    table.setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    // for PaginationTypes.ClientSide used to store filters state if fetchData is provided
    // for PaginationTypes.ServerSide used to fetch data
    if (fetchData) {
      fetchData({
        pagination,
        filters: columnFilters,
        sortBy: sorting
      });
    }
  }, [
    //fetchData,
    pagination.pageIndex,
    pagination.pageSize
    // columnFilters,
    // sorting,
    // manualFiltering,
    // manualSorting
  ]);
  const tableBodyProps = isLoading
    ? {
        role: 'progressbar',
        'aria-label': 'Loading table data',
        'aria-live': 'polite' as TableBodyProps['aria-live']
      }
    : {};

  return (
    <Paper>
      <TableContainer>
        {/* It seems that sometimes MUI table incorrectly calculate table width
            producing horizontal scrollbar with 1 pixel of additional width.
            Reduce table width for MUI to avoid unnecessary scrollbar           */}
        <MUITable size="small" sx={{ tableLayout: 'auto', width: 'calc(100% - 1px)' }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow
                  key={headerGroup.id}
                  sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)', background: '#F5F6FA' }}
                >
                  {headerGroup.headers.map((header) => {
                    const headerLabel = header.column.columnDef.header;
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    const filter = header.column.columnDef.meta?.filter;

                    return header.column.getCanSort() ? (
                      <TableCell
                        component="th"
                        key={header.id}
                        sx={{
                          verticalAlign: 'initial',
                          padding: '5px',
                          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-ignore
                          ...(header.column.columnDef.meta?.headerSx ?? {})
                        }}
                      >
                        <TableSortLabel
                          component="div"
                          active={!!header.column.getIsSorted()}
                          direction={
                            header.column.getIsSorted()
                              ? (header.column.getIsSorted() as TableSortLabelOwnProps['direction'])
                              : undefined
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Box>{flexRender(headerLabel, header.getContext())}</Box>
                          {header.column.getIsSorted() ? (
                            <Box component="span" sx={visuallyHidden}>
                              {(header.column.getIsSorted() as TableSortLabelOwnProps['direction']) ===
                              'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                        <Box>{header.column.getCanFilter() ? filter?.(header.column) : null}</Box>
                      </TableCell>
                    ) : (
                      <TableCell
                        component="th"
                        key={header.id}
                        sx={{
                          verticalAlign: 'initial',
                          padding: '5px',
                          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-ignore
                          ...(header.column.columnDef.meta?.headerSx ?? {})
                        }}
                      >
                        <Box>{flexRender(headerLabel, header.getContext())}</Box>
                        <Box>{header.column.getCanFilter() ? filter?.(header.column) : null}</Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>

          <TableBody aria-busy={isLoading} {...tableBodyProps}>
            {isLoading &&
              Array.from(new Array(pagination.pageSize)).map((_, index) => (
                <TableRow style={{ height: 40 }} key={index} sx={oddRowsGrayColor}>
                  <TableCell colSpan={table.getAllColumns().length} align="center" size="small">
                    <Skeleton variant="rectangular" data-testid="loading-skeleton" />
                  </TableCell>
                </TableRow>
              ))}
            {table.getRowModel().rows.map((row, i) => {
              return (
                <React.Fragment key={`key_${i}_0`}>
                  <TableRow
                    key={row.id}
                    sx={
                      stripedRows
                        ? { ...oddRowsGrayColor, ...getRowStyles(row) }
                        : { ...getRowStyles(row) }
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          component="td"
                          data-testid={`cell-${cell.id}`}
                          sx={{
                            verticalAlign: 'initial',
                            padding: '5px',
                            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            ...(cell.column.columnDef.meta?.columnSx ?? {})
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.getIsExpanded() && renderRowSubComponent ? (
                    <tr>{renderRowSubComponent(row)}</tr>
                  ) : null}
                </React.Fragment>
              );
            })}
            {(total ?? 0) === 0 && !isLoading && (
              <TableRow sx={oddRowsGrayColor}>
                <TableCell colSpan={columnDefs.length} align="center">
                  {noDataText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MUITable>
      </TableContainer>
      {total > pagination.pageSize && (
        <TablePagination
          data-testid="table-pagination"
          labelDisplayedRows={getRowsLabel}
          component="nav"
          role="navigation"
          aria-label="Table pagination"
          rowsPerPageOptions={rowPerPageOptions}
          colSpan={columnDefs.length}
          count={total}
          rowsPerPage={pagination.pageSize}
          page={pagination.pageIndex}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
