'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { useScheduleColumns } from '@/components/AdminDashboard/ScheduleManagment/useScheduleColumns';
import { querySailingsWithRoutesAndPorts } from '@/controllers/SchedulesController';
import { type SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';
import { setSailingActivityStatus } from '@/app/serverActions';
import { showNotification } from '@/modules/notifications/notifications';
import { SailingStatusParams } from '@/utils/types';
import { useState } from 'react';

export const ScheduleManagement = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { dataState, fetchDataFromServer } = useTableDataFetcher(
    querySailingsWithRoutesAndPorts,
    [],
    Messages.FailedGetSchedule
  );

  const onSailingStatusChange = async (sailingId: string, isActive: boolean) => {
    setIsUpdating(true);
    try {
      const data: SailingStatusParams = { sailingId, isActive };
      const actionResult = await setSailingActivityStatus(data);
      if (!actionResult.success) {
        return showNotification(false, actionResult.message || Messages.FailedChangeSailingStatus);
      }
      // update status for sailing without re-fetching
      const updatedSailing = dataState.data.data.find(
        (sailing: SailingWithShipStopAndPortsFrontend) => sailing._id === sailingId
      );
      if (updatedSailing) {
        updatedSailing.isActive = isActive;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error changing sailing status:', error);
      showNotification(false, (error as Error)?.message || Messages.FailedChangeSailingStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const columnDefs = useScheduleColumns({
    disableActions: dataState.isLoading || isUpdating,
    onSailingStatusChange
  });

  return (
    <div>
      <h2>Schedule</h2>
      <Table<SailingWithShipStopAndPortsFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'shipStops.0.arrivalOn', desc: true }]}
        stripedRows={false}
      />
    </div>
  );
};
