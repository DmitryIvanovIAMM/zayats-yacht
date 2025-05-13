'use client';

import { Table } from '@/components/Table/Table';
import { usePortsColumns } from '@/components/AdminDashboard/AdminPorts/usePortsColumns';
import { PortFrontend } from '@/models/PortFrontend';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { getFilteredPorts } from '@/controllers/PortsController';

export const AdminPorts = () => {
  const { dataState, fetchDataFromServer } = useTableDataFetcher<PortFrontend>(getFilteredPorts);

  const columnDefs = usePortsColumns();

  return (
    <div>
      <h2>Ports</h2>
      <Table<PortFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'portName', desc: false }]}
      />
    </div>
  );
};
