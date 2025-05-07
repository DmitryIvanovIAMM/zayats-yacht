'use client';

import { useQuoteRequests } from '@/components/AdminUserRequests/useQuoteRequests';
import { useUserQuoteRequestsColumns } from '@/components/AdminUserRequests/useUserQuoteRequestsColumns';
import { Table } from '@/components/Table/Table';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';

export const AdminUserRequests = () => {
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
