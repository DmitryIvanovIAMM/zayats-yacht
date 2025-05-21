'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { useScheduleColumns } from '@/components/AdminDashboard/ScheduleManagement/useScheduleColumns';
import { querySailingsWithRoutesAndPorts } from '@/controllers/SchedulesController';
import { type SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';
import { deleteSailingByAdminAction, setSailingActivityByAdminStatus } from '@/app/serverActions';
import { showNotification } from '@/modules/notifications/notifications';
import { SailingStatusParams } from '@/utils/types';
import { useState } from 'react';
import {
  ConfirmationModal,
  defaultConfirmationModalProps
} from '@/components/ConfirmationModal/ConfirmationModal';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';

export const ScheduleManagement = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSailingId, setUpdateSailingId] = useState<string | null>(null);
  const [expandedSailings, setExpandedSailings] = useState<string[]>([]);
  const [confirmationModalState, setConfirmationModalState] = useState(
    defaultConfirmationModalProps
  );

  const { dataState, setDataState, fetchDataFromServer } = useTableDataFetcher(
    querySailingsWithRoutesAndPorts,
    [],
    Messages.FailedGetSchedule
  );

  const onSailingStatusChange = async (sailingId: string, isActive: boolean) => {
    // eslint-disable-next-line no-console
    console.log('onSailingStatusChange().  sailingId: ', sailingId, 'isActive: ', isActive);
    setIsUpdating(true);
    setUpdateSailingId(null);
    try {
      const data: SailingStatusParams = { sailingId, isActive };
      const actionResult = await setSailingActivityByAdminStatus(data);
      if (!actionResult.success) {
        return showNotification(false, actionResult.message || Messages.FailedChangeSailingStatus);
      }
      // update status for sailing via setDataState() to rerender table
      setDataState((state) => ({
        ...state,
        data: {
          ...state.data,
          data: state.data.data.map((sailing) =>
            sailing._id === sailingId ? { ...sailing, isActive } : sailing
          )
        }
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error changing sailing status:', error);
      showNotification(false, (error as Error)?.message || Messages.FailedChangeSailingStatus);
    } finally {
      setIsUpdating(false);
      setUpdateSailingId(sailingId);
    }
  };

  const handleStartDeleteSailing = (sailingId: string) => {
    console.log('handleStartDeleteSailing(). dataState.data.data: ', dataState.data.data);
    const sailingToBeDeleted = dataState.data.data.find((sailing) => sailing._id === sailingId);
    if (!sailingToBeDeleted) {
      return;
    }
    setConfirmationModalState({
      open: true,
      onClose: () => setConfirmationModalState(defaultConfirmationModalProps),
      onConfirm: () => handleDeleteSailing(sailingId),
      title: 'Confirm Action',
      message: `Are you sure you want to delete "${sailingToBeDeleted.name}" sailing?`
    });
  };

  const handleDeleteSailing = async (sailingId: string) => {
    // eslint-disable-next-line no-console
    console.log('handleDeleteSailing().  sailingId: ', sailingId);

    setConfirmationModalState(defaultConfirmationModalProps);
    setIsUpdating(true);
    setUpdateSailingId(null);
    try {
      const actionResult = await deleteSailingByAdminAction(sailingId);
      if (!actionResult.success) {
        return showNotification(false, actionResult.message || Messages.FailedDeleteSailing);
      }
      // delete sailing via setDataState() to rerender table
      setDataState((state) => ({
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((sailing) => sailing._id !== sailingId),
          total: state.data.total - 1
        }
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error delete Sailing:', error);
      showNotification(false, (error as Error)?.message || Messages.FailedDeleteSailing);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExpandSailing = (sailingId: string) => {
    if (expandedSailings.includes(sailingId)) {
      setExpandedSailings((prev: string[]) => prev.filter((id) => id !== sailingId));
      setUpdateSailingId(null);
    } else {
      setUpdateSailingId(sailingId);
      setExpandedSailings((prev: string[]) => [...prev, sailingId]);
    }
  };

  const columnDefs = useScheduleColumns({
    expandedSailings,
    handleExpandSailing,
    disableActions: dataState.isLoading || isUpdating,
    onSailingStatusChange,
    handleStartDeleteSailing,
    updateSailingId
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Schedule</h2>
        <Button
          href={PATHS.addSailing}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark', margin: '0 0 10px 0' }}
          size={'small'}
          style={{ height: '31px' }}
        >
          Add Sailing
        </Button>
      </div>
      <Table<SailingWithShipStopAndPortsFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'shipStops.0.arrivalOn', desc: true }]}
        stripedRows={false}
      />
      {confirmationModalState.open && (
        <ConfirmationModal
          open={confirmationModalState.open}
          onClose={confirmationModalState.onClose}
          onConfirm={confirmationModalState.onConfirm}
          message={confirmationModalState.message}
          title={confirmationModalState.title}
        />
      )}
    </div>
  );
};
