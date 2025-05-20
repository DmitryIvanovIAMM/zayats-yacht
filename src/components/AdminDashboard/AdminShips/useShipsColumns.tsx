import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/table-core';
import { ShipFrontend } from '@/models/ShipFrontend';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';
import { displayMdUp, displaySmUp } from '@/components/Table/Filters/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { PATHS, toPath } from '@/helpers/paths';

const columnHelper = createColumnHelper<ShipFrontend>();

export const useShipsColumns = () => {
  return useMemo(() => {
    // use as base ShipFrontend and shipFields
    return [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ship-name" style={{ fontWeight: 'bold' }}>
            {row.original.name}
          </div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }: { row: any }) => <div data-testid="ship-type">{row.original.type}</div>,
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('builder', {
        header: 'Builder',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ship-builder">{row.original.builder}</div>
        ),
        meta: {
          headerSx: { ...displaySmUp },
          columnSx: { ...displaySmUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('flag', {
        header: 'Flag',
        cell: ({ row }: { row: any }) => <div data-testid="ship-flag">{row.original.flag}</div>,
        meta: {
          headerSx: { ...displaySmUp },
          columnSx: { ...displaySmUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('homePort', {
        header: 'Home Port',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ship-home-port">{row.original.homePort}</div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('class', {
        header: 'Class',
        cell: ({ row }: { row: any }) => <div data-testid="ship-class">{row.original.class}</div>,
        meta: {
          headerSx: { ...displayMdUp },
          columnSx: { ...displayMdUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('imoNo', {
        header: 'IMO No',
        cell: ({ row }: { row: any }) => <div data-testid="ship-imo-no">{row.original.imoNo}</div>,
        meta: {
          headerSx: { ...displayMdUp },
          columnSx: { ...displayMdUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      columnHelper.accessor('callSign', {
        header: 'Call Sign',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ship-call-sign">{row.original.callSign}</div>
        ),
        meta: {
          headerSx: { ...displayMdUp },
          columnSx: { ...displayMdUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      {
        _id: 'actions-cell',
        header: '',
        accessorKey: 'actions-cell',
        enableSorting: false,
        cell: ({ row }: { row: any }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton
                content="href"
                href={toPath(PATHS.editShip, { id: row.original._id })}
                data-testid="schedule-sailing-delete-button"
              >
                <EditIcon sx={{ fontSize: '28px' }} color="secondary" />
              </IconButton>
            </div>
          );
        }
      }
    ];
  }, []);
};
