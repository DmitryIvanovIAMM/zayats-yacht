'use client';

import { useQuoteRequests } from '@/components/AdminUserRequests/useQuoteRequests';
import { useEffect } from 'react';
import { useUserQuoteRequestsColumns } from '@/components/AdminUserRequests/useUserQuoteRequestsColumns';
import { Table } from '@/components/Table/Table';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { initialDataFetcherArgs } from '@/components/Table/types';

export const AdminUserRequests = () => {
  // eslint-disable-next-line no-console
  console.log('AdminUserRequests()');
  const { quoteRequestsState, getQuoteRequests } = useQuoteRequests();

  const columnDefs = useUserQuoteRequestsColumns();

  return (
    <div>
      <h2>User Requests</h2>
      <Table<QuoteRequestFrontend>
        columnDefs={columnDefs}
        data={quoteRequestsState.data}
        isLoading={quoteRequestsState.isLoading}
        fetchData={getQuoteRequests}
        initialSortBy={[{ id: 'receivedAt', desc: true }]}
      />
    </div>
  );
};
