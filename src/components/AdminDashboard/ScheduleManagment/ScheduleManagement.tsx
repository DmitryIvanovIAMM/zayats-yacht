'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { useScheduleColumns } from '@/components/AdminDashboard/ScheduleManagment/useScheduleColumns';
import { querySailingsWithRoutesAndPorts } from '@/controllers/SchedulesController';
import { type SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';

export const ScheduleManagement = () => {
  const { dataState, fetchDataFromServer } = useTableDataFetcher(
    querySailingsWithRoutesAndPorts,
    [],
    Messages.FailedGetSchedule
  );

  const columnDefs = useScheduleColumns();

  return (
    <div>
      <h2>Schedule</h2>
      <Table<SailingWithShipStopAndPortsFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'portName', desc: false }]}
      />
    </div>
  );
};
