'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { ShipFrontend } from '@/models/ShipFrontend';
import { useShipsColumns } from '@/components/AdminDashboard/Ships/useShipsColumns';
import { getFilteredShips } from '@/controllers/ShipsController';

export const AdminShips = () => {
  const { dataState, fetchDataFromServer } = useTableDataFetcher<ShipFrontend>(
    getFilteredShips,
    [],
    Messages.FailedGetPorts
  );

  const columnDefs = useShipsColumns();

  return (
    <div>
      <h2>Ships</h2>
      <Table<ShipFrontend>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'name', desc: false }]}
      />
    </div>
  );
};
