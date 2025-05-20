'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { ShipFrontend } from '@/models/ShipFrontend';
import { useShipsColumns } from '@/components/AdminDashboard/AdminShips/useShipsColumns';
import { getFilteredShips } from '@/controllers/ShipsController';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';

export const AdminShips = () => {
  const { dataState, fetchDataFromServer } = useTableDataFetcher<ShipFrontend>(
    getFilteredShips,
    [],
    Messages.FailedGetShips
  );

  const columnDefs = useShipsColumns();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Ships</h2>
        <Button
          href={PATHS.addShip}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark', margin: '0 0 10px 0' }}
          size={'small'}
          style={{ height: '31px' }}
        >
          Add Ship
        </Button>
      </div>
      <Table<ShipFrontend>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'name', desc: false }]}
      />
    </>
  );
};
