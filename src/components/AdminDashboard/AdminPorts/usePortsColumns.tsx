import { useMemo } from 'react';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';
import { displaySmUp } from '@/components/Table/Filters/styles';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import { PATHS, toPath } from '@/helpers/paths';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getSrcImageNameByStorageName } from '@/utils/views';

export interface PortsColumnsProps {
  handleStartDeletePort: (portId: string) => void;
  isUpdating: boolean;
}

export const usePortsColumns = ({ handleStartDeletePort, isUpdating }: PortsColumnsProps) => {
  return useMemo(() => {
    return [
      {
        _id: 'portName',
        header: 'Port Name',
        accessor: 'portName',
        accessorKey: 'portName',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ports-port-name">{row.original.portName}</div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        _id: 'destinationName',
        header: 'Destination Name',
        accessor: 'destinationName',
        accessorKey: 'destinationName',
        cell: ({ row }: { row: any }) => (
          <div data-testid="ports-destination-name">{row.original.destinationName}</div>
        ),
        meta: {
          headerSx: { ...displaySmUp },
          columnSx: { ...displaySmUp, verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        _id: 'imageFileName',
        header: 'Image',
        accessor: 'imageFileName',
        accessorKey: 'imageFileName',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }: { row: any }) => (
          <div data-testid="ports-image-file-name">
            <Image
              src={getSrcImageNameByStorageName(row.original.imageFileName)}
              width={100}
              height={100}
              alt={`Image of ${row.original.portName}`}
            />
          </div>
        ),
        meta: {
          headerSx: { width: '140px' },
          columnSx: { verticalAlign: 'top', width: '140px' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        _id: 'actions-cell',
        header: '',
        accessorKey: 'actions-cell',
        enableSorting: false,
        cell: ({ row }: { row: any }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton
                component="a"
                href={toPath(PATHS.editPort, { id: row.original._id })}
                data-testid="port-edit-button"
                disabled={isUpdating}
              >
                <EditIcon sx={{ fontSize: '28px' }} color="secondary" />
              </IconButton>
              <IconButton
                onClick={() => handleStartDeletePort(row.original._id)}
                data-testid="port-delete-button"
                disabled={isUpdating}
              >
                <DeleteForeverIcon sx={{ fontSize: '28px' }} color="error" />
              </IconButton>
            </div>
          );
        },
        meta: {
          headerSx: { width: '102px', maxWidth: '102px' },
          columnSx: { width: '102px', maxWidth: '102px' }
        }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleStartDeletePort]);
};
