import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import {
  Paper,
  SxProps,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { tableStyles } from '../../stylesheets/tableStyle';
import {
  Column,
  Filters,
  FilterValue,
  IdType,
  SortingRule,
  useFilters,
  usePagination,
  useRowState,
  useSortBy,
  useTable,
  useExpanded
} from 'react-table';
import CustomFilterColumn from './filters/CustomFilterColumn';
import { Skeleton } from '@mui/material';
import { adminSectionTableRowDefaultStyle } from '@efacity/frontend-shared';

interface AdditionalOptions {
  columnStyles?: React.CSSProperties;
  headerStyles?: React.CSSProperties;
  headerSx?: SxProps;
  columnSx?: SxProps;
  isExpanded?: boolean;
}

export const initialRowsPerPage = 50;
export const rowsPerPageOptions = [10, initialRowsPerPage, initialRowsPerPage * 2];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EnhancedColumn<D extends {}> = Column<D> & AdditionalOptions;

export enum PaginationTypes {
  ClientSide,
  ServerSide
}

export type FetchDataOptions = PaginationOptions & FiltersOptions & SortOptions;

export const initialFetchDataOptions = {
  pageIndex: 0,
  pageSize: initialRowsPerPage,
  filters: [],
  sortBy: []
};

export interface SortOptions {
  sortBy: SortingRule<any>[];
}

export interface FiltersOptions {
  filters: Filters<any>;
}

export interface PaginationOptions {
  pageIndex: number;
  pageSize: number;
}

interface TablePropsBase<D> {
  initialSortBy?: SortingRule<D>[];
  initialFilters?: { id: IdType<D>; value: FilterValue }[];
  columns: EnhancedColumn<D>[];
  loadingSkeletonHeight?: number;
  data: any;
  loading: boolean;
  noDataText?: string;
  getInitialRowState?: (row: any) => any;
  pageSize?: number;
  skeletonSize?: number;
  renderRowSubComponent?: (row: any) => ReactElement;
}

export interface TablePropsServerSide<D> extends TablePropsBase<D> {
  paginationType?: PaginationTypes.ServerSide;
  pageCount: number;
  getRowProps?: (row: any) => any;
  fetchData: (fetchDataOptions: FetchDataOptions) => void;
}

export interface TablePropsClientSide<D> extends TablePropsBase<D> {
  paginationType?: PaginationTypes.ClientSide;
  pageCount?: never;
  getRowProps?: (row: any) => any;
  fetchData?: (fetchDataOptions: FetchDataOptions) => void;
}

export type TableProps<D> = TablePropsClientSide<D> | TablePropsServerSide<D>;

export interface TableState {
  pageIndex: number;
  pageSize: number;
  filters: any[];
}

const Table = <D extends object>({
  columns,
  data,
  loading,
  loadingSkeletonHeight = 40,
  fetchData,
  paginationType = PaginationTypes.ClientSide,
  noDataText = 'No Records...',
  getRowProps = () => ({}),
  getInitialRowState = () => ({}),
  initialSortBy = [],
  initialFilters = [],
  pageCount: controlledPageCount,
  pageSize = initialRowsPerPage,
  skeletonSize = initialRowsPerPage,
  renderRowSubComponent
}: PropsWithChildren<TableProps<D>>): ReactElement => {
  const defaultFilterColumn = React.useMemo<Partial<Column<D>>>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => ({
      Filter: CustomFilterColumn
    }),
    []
  );

  const {
    state,
    gotoPage,
    setPageSize,
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    filteredRows,
    pageCount
  } = useTable<D>(
    {
      columns,
      data,
      defaultColumn: defaultFilterColumn,
      manualPagination: paginationType === PaginationTypes.ServerSide,
      manualFilters: paginationType === PaginationTypes.ServerSide,
      manualSortBy: paginationType === PaginationTypes.ServerSide,
      disableMultiSort: true,
      disableSortRemove: true,
      initialRowStateAccessor: (row) => {
        return { isLoading: false, ...getInitialRowState(row) };
      },
      initialState: {
        pageIndex: 0,
        sortBy: initialSortBy,
        filters: initialFilters,
        pageSize: pageSize || initialRowsPerPage
      },
      autoResetPage: false,
      // https://github.com/TanStack/table/issues/2321
      // used only when pagination type === PaginationTypes.ServerSide,
      // but should be also initialized for PaginationTypes.ClientSide
      pageCount: controlledPageCount || -1,
      maxMultiSortColCount: 3
    },
    useFilters,
    useSortBy,
    useRowState,
    useExpanded,
    usePagination
  );

  const count = paginationType === PaginationTypes.ClientSide ? filteredRows.length : pageCount;
  const handlePageChange = (event: any, newPage: number) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    // for PaginationTypes.ClientSide used to store filters state if fetchData is provided
    // for PaginationTypes.ServerSide used to fetch data
    if (fetchData) {
      fetchData({
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        filters: state.filters,
        sortBy: state.sortBy
      });
    }
  }, [fetchData, state.pageIndex, state.pageSize, state.filters, state.sortBy, paginationType]);

  useEffect(
    () => {
      gotoPage(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.href, gotoPage]
  );

  const getRowsLabel = ({ from, to, count }) => {
    return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`} rows`;
  };

  return (
    <Paper sx={tableStyles.tableContainer}>
      <TableContainer style={{ margin: 0 }}>
        <MuiTable aria-label="dense table" sx={tableStyles.table} {...getTableProps()} stickyHeader>
          <TableHead sx={tableStyles.tableHead}>
            {headerGroups.map((headerGroup) => {
              const { key, ...rest } = headerGroup.getHeaderGroupProps();
              return (
                <TableRow {...rest} key={key}>
                  {headerGroup.headers.map((column) => {
                    const customStyles = (column as any).headerStyles;
                    const headerSx = (column as any).headerSx;
                    const sortProps = column.getSortByToggleProps();
                    const { key, ...rest } = column.getHeaderProps();
                    const defaultStyles = {
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'initial',
                      ...adminSectionTableRowDefaultStyle
                    };
                    return (
                      <TableCell
                        {...rest}
                        key={key}
                        style={customStyles ? { ...defaultStyles, ...customStyles } : defaultStyles}
                        sx={headerSx ? { ...headerSx } : {}}
                      >
                        {column.render('Header')}
                        {column.canSort && (
                          <TableSortLabel
                            {...sortProps}
                            active={column.isSorted}
                            // react-table has an unsorted state which is not treated here
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                          />
                        )}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {column.canFilter && column.render('Filter')}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading &&
              Array.from(new Array(skeletonSize)).map((_, index) => (
                <TableRow
                  style={{ height: loadingSkeletonHeight, ...adminSectionTableRowDefaultStyle }}
                  key={index}
                >
                  <TableCell colSpan={columns.length} align="center" size="small">
                    <Skeleton variant="rectangular" data-testid="loading-skeleton" />
                  </TableCell>
                </TableRow>
              ))}
            {page.length > 0 &&
              !loading &&
              page.map((row, i) => {
                prepareRow(row);
                const { key, ...rest } = row.getRowProps(getRowProps(row));
                return (
                  <React.Fragment key={`key_${i}_0`}>
                    <TableRow {...rest} key={key} data-testid="table-row">
                      {row.cells.map((cell) => {
                        const columnStyles = (cell.column as any).columnStyles;
                        const columnSx = (cell.column as any).columnSx;
                        const defaultStyles = adminSectionTableRowDefaultStyle;
                        const { key, ...rest } = cell.getCellProps();
                        return (
                          <TableCell
                            style={
                              columnStyles ? { ...defaultStyles, ...columnStyles } : defaultStyles
                            }
                            sx={columnSx ? { ...columnSx } : {}}
                            {...rest}
                            key={key}
                          >
                            {cell.render('Cell')}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {/*https://stackoverflow.com/questions/53186063/how-can-i-specific-expanded-data-row-in-react-table*/}
                    {row.isExpanded ? <tr>{renderRowSubComponent(row)}</tr> : null}
                  </React.Fragment>
                );
              })}

            {page.length === 0 && !loading && (
              <TableRow style={{ height: 35 }}>
                <TableCell colSpan={columns.length} align="center">
                  {noDataText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {count > state.pageSize && (
        <TablePagination
          data-testid="table-pagination"
          labelDisplayedRows={getRowsLabel}
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          colSpan={columns.length}
          count={count}
          rowsPerPage={state.pageSize}
          page={state.pageIndex}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default Table;
