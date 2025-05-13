import { useMemo } from 'react';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';
import { displayMdUp, displaySmUp } from '@/components/Table/Filters/styles';
import Image from 'next/image';
import { PortFrontend } from '@/models/PortFrontend';

export const usePortsColumns = () => {
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
          columnSx: { ...displaySmUp, erticalAlign: 'top' },
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
              src={`/images/${row.original.imageFileName}`}
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
        ),
        meta: {
          headerSx: { width: '140px' },
          columnSx: { verticalAlign: 'top', width: '140px' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }
    ];
  }, []);
};
