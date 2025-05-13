'use client';

import { useUserQuoteRequestsColumns } from '@/components/AdminDashboard/AdminUserRequests/useUserQuoteRequestsColumns';
import { Table } from '@/components/Table/Table';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { getFilteredQuoteRequests } from '@/controllers/QuoteRequestsController';

export const AdminUserRequests = () => {
  const { dataState, fetchDataFromServer } = useTableDataFetcher<QuoteRequestFrontend>(
    getFilteredQuoteRequests,
    ['receivedAt']
  );

  const columnDefs = useUserQuoteRequestsColumns();

  return (
    <div>
      <h2>User Requests</h2>
      <Table<QuoteRequestFrontend>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'receivedAt', desc: true }]}
      />
    </div>
  );
};
