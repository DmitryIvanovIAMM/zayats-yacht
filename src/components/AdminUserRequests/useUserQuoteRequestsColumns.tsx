import { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TextColumnFilter } from '@/components/Table/Filters/TextColumnFilter';

export const useUserQuoteRequestsColumns = () => {
  return useMemo(() => {
    return [
      {
        _id: 'fromName',
        header: 'From Name',
        accessor: 'fromName',
        accessorKey: 'fromName',
        cell: ({ row }: { row: any }) => (
          <div data-testid="quote-request-from-name">{row.original.fromName}</div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        header: 'From Email',
        accessor: 'fromEmail',
        accessorKey: 'fromEmail',
        cell: ({ row }: { row: any }) => (
          <div data-testid="quote-request-from-email">
            <a href={`mailto:${row.original.fromEmail}`}>{row.original.fromEmail}</a>
          </div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        header: 'Received At',
        accessor: 'receivedAt',
        accessorKey: 'receivedAt',
        cell: ({ row }: { row: any }) => (
          <div data-testid="quote-request-received-at">{row.original.receivedAt}</div>
        ),
        meta: {
          columnSx: { verticalAlign: 'top' },
          filter: (column: any) => <TextColumnFilter column={column} />
        }
      },
      {
        header: 'Request',
        accessor: 'requestObject',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }: { row: any }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isExpanded, setIsExpanded] = useState(false);

          return (
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              {isExpanded ? (
                <div style={{ width: '100%' }}>
                  {row.original?.requestObject && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(row.original.requestObject, null, 2)}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  {row.original?.requestObject && (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(row.original.requestObject, null, 2).slice(0, 50)}...
                    </div>
                  )}
                </div>
              )}
              <div>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
                  data-testid="collapseButton"
                  style={{ marginTop: -10 }}
                >
                  {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
            </div>
          );
        },
        meta: {
          columnSx: { verticalAlign: 'top' }
        }
      }
    ];
  }, []);
};
