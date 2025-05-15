import { useMemo, useState } from 'react';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';
import { RouteTable } from '@/components/AdminDashboard/ScheduleManagment/RouteTable';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { displaySmUp } from '@/components/Table/Filters/styles';
import type { SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';
import { createColumnHelper } from '@tanstack/table-core';
import { ShipStopWithPortFrontend } from '@/models/ShipStopFrontend';
import { formatInMonthDayYear } from '@/utils/date-time';

const columnHelper = createColumnHelper<SailingWithShipStopAndPortsFrontend>();

export const useScheduleColumns = () => {
  return useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: 'Sailing Name',
        cell: ({ row }: { row: any }) => (
          <div data-testid="schedule-sailing-name" style={{ fontWeight: 'bold' }}>
            {row.original.name}
          </div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      {
        _id: 'route',
        header: 'Route',
        accessor: 'shipStops',
        accessorKey: 'shipStops',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }: { row: any }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isExpanded, setIsExpanded] = useState(false);

          return (
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
              data-testid="schedules-sailing-route-data"
            >
              {isExpanded ? (
                <RouteTable
                  shipStops={(row.original.shipStops as ShipStopWithPortFrontend[]) || []}
                />
              ) : (
                <div style={{ padding: '5px' }}>
                  {`${formatInMonthDayYear(row.original.shipStops[0].arrivalOn)}, ${row.original.shipStops[0].port.portName} `}
                  -
                  {` ${formatInMonthDayYear(row.original.shipStops[row.original.shipStops.length - 1].departureOn)}, ${row.original.shipStops[row.original.shipStops.length - 1].port.portName}`}
                </div>
              )}
              <div>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
                  data-testid="collapse-button"
                  style={{ marginTop: -10 }}
                >
                  {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
            </div>
          );
        },
        meta: {
          headerSx: { ...displaySmUp, width: '60%', maxWidth: '60%' },
          columnSx: { ...displaySmUp, verticalAlign: 'top', width: '60%', maxWidth: '60%' }
        }
      } /*,
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
              alt={`Image of ${row.original.portName}`}
            />
          </div>
        ),
        meta: {
          headerSx: { width: '140px' },
          columnSx: { verticalAlign: 'top', width: '140px' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }*/
    ];
  }, []);
};
