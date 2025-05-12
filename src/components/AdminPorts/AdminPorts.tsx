'use client';

import { useUserQuoteRequestsColumns } from '@/components/AdminUserRequests/useUserQuoteRequestsColumns';
import { Table } from '@/components/Table/Table';
import { usePorts } from '@/components/AdminPorts/usePorts';
import { initialDataFetcherArgs } from '@/components/Table/types';

export const AdminPorts = () => {
  console.log('AdminUserRequests()');
  const { portsState, getPorts } = usePorts();
  console.log(' portsState: ', portsState);
  getPorts(initialDataFetcherArgs);

  const columnDefs = useUserQuoteRequestsColumns();

  return (
    <div>
      <h2>Ports</h2>
      {/*<Table<QuoteRequestFrontend>*/}
      {/*  columnDefs={columnDefs}*/}
      {/*  data={quoteRequestsState.data}*/}
      {/*  isLoading={quoteRequestsState.isLoading}*/}
      {/*  fetchData={getQuoteRequests}*/}
      {/*  initialSortBy={[{ id: 'receivedAt', desc: true }]}*/}
      {/*/>*/}
    </div>
  );
};
