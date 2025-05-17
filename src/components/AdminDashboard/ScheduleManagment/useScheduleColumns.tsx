import { useEffect, useMemo, useState } from 'react';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';
import { RouteTable } from '@/components/AdminDashboard/ScheduleManagment/RouteTable';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { displaySmUp } from '@/components/Table/Filters/styles';
import type { SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';
import { createColumnHelper } from '@tanstack/table-core';
import { ShipStopWithPortFrontend } from '@/models/ShipStopFrontend';
import { formatInLongMonthDayYear, formatInMonthDayYear } from '@/utils/date-time';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const transformSx = {
  transform: 'rotateX(360deg)',
  transition: '1500ms ease-in-out'
};

export interface ScheduleColumnsProps {
  expandedSailings: string[];
  handleExpandSailing: (sailingId: string) => void;
  disableActions?: boolean;
  onSailingStatusChange: (sailingId: string, status: boolean) => void;
  handleStartDeleteSailing: (sailingId: string) => void;
  updateSailingId?: string | null;
}

const columnHelper = createColumnHelper<SailingWithShipStopAndPortsFrontend & { _id: string }>();

export const useScheduleColumns = ({
  expandedSailings,
  handleExpandSailing,
  disableActions = false,
  onSailingStatusChange,
  handleStartDeleteSailing,
  updateSailingId = null
}: ScheduleColumnsProps) => {
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
          columnSx: { verticalAlign: 'top', paddingTop: '10px' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      }),
      {
        _id: 'shipStops[0].arrivalOn',
        header: 'Starts On',
        accessorKey: 'shipStops.0.arrivalOn',
        cell: ({ row }: { row: any }) => {
          return <>{`${formatInMonthDayYear(row.original.shipStops[0].arrivalOn)}`}</>;
        },
        meta: {
          columnSx: { verticalAlign: 'top', paddingTop: '10px' }
        }
      },
      {
        _id: 'route',
        header: 'Route',
        accessor: 'shipStops',
        accessorKey: 'shipStops',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }: { row: any }) => {
          const isExpanded = expandedSailings.includes(row.original._id);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isActive, setIsActive] = useState(
            row.original._id === updateSailingId && isExpanded
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setTimeout(() => {
              setIsActive(false);
            }, 100);
          }, []);

          return (
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
              data-testid="schedules-sailing-route-data"
            >
              {isExpanded ? (
                <div
                  data-testid="scheule-sailingt-data-expanded"
                  style={
                    !isActive
                      ? {
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          ...transformSx
                        }
                      : { width: '100%', display: 'flex', justifyContent: 'space-between' }
                  }
                >
                  <RouteTable
                    shipStops={(row.original.shipStops as ShipStopWithPortFrontend[]) || []}
                  />
                </div>
              ) : (
                <div data-testid="scheule-sailingt-data-collapsed">
                  {`${formatInLongMonthDayYear(row.original.shipStops[0].arrivalOn)}, ${row.original.shipStops[0].port.portName} `}
                  -
                  {` ${formatInLongMonthDayYear(row.original.shipStops[row.original.shipStops.length - 1].departureOn)}, ${row.original.shipStops[row.original.shipStops.length - 1].port.portName}`}
                </div>
              )}
              <div>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => handleExpandSailing(row.original._id)}
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
          columnSx: {
            ...displaySmUp,
            verticalAlign: 'top',
            width: '60%',
            maxWidth: '60%',
            paddingTop: '10px'
          }
        }
      },
      {
        _id: 'actionCCell',
        header: '',
        accessorKey: 'actionCCell',
        enableSorting: false,
        cell: ({ row }: { row: any }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox
                checked={row.original.isActive}
                onChange={() => onSailingStatusChange(row.original._id, !row.original.isActive)}
                disabled={disableActions}
                data-testid="schedule-sailing-active-checkbox"
                color="secondary"
                size="medium"
                inputProps={{
                  'data-testid': 'schedule-sailing-active-checkbox-input'
                }}
              />
              <IconButton onClick={() => handleStartDeleteSailing(row.original._id)}>
                <DeleteForeverIcon sx={{ fontSize: '28px' }} color="error" />
              </IconButton>
            </div>
          );
        }
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedSailings, disableActions, updateSailingId]);
};
