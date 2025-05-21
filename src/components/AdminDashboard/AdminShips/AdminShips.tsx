'use client';

import { Table } from '@/components/Table/Table';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { Messages } from '@/helpers/messages';
import { ShipFrontend } from '@/models/ShipFrontend';
import { useShipsColumns } from '@/components/AdminDashboard/AdminShips/useShipsColumns';
import { getFilteredShips } from '@/controllers/ShipsController';
import Button from '@mui/material/Button';
import { PATHS } from '@/helpers/paths';
import { useState } from 'react';
import { showNotification } from '@/modules/notifications/notifications';
import {
  ConfirmationModal,
  defaultConfirmationModalProps
} from '@/components/ConfirmationModal/ConfirmationModal';
import { deleteShipByAdminAction } from '@/app/serverActions';

export const AdminShips = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmationModalState, setConfirmationModalState] = useState(
    defaultConfirmationModalProps
  );
  const { dataState, setDataState, fetchDataFromServer } = useTableDataFetcher<ShipFrontend>(
    getFilteredShips,
    [],
    Messages.FailedGetShips
  );

  const handleStartDeleteShip = async (shipId: string) => {
    const shipToBeDeleted = dataState.data.data.find((ship) => {
      return ship._id === shipId;
    });
    if (!shipToBeDeleted) {
      return;
    }
    setConfirmationModalState({
      open: true,
      onClose: () => setConfirmationModalState(defaultConfirmationModalProps),
      onConfirm: () => handleDeleteShip(shipId),
      title: 'Confirm Action',
      message: `Are you sure you want to delete "${shipToBeDeleted.name}" ship?`
    });
  };

  const handleDeleteShip = async (shipId: string) => {
    setConfirmationModalState(defaultConfirmationModalProps);
    setIsUpdating(true);
    try {
      const actionResult = await deleteShipByAdminAction(shipId);
      if (!actionResult.success) {
        return showNotification(false, actionResult.message || Messages.FailedDeleteShip);
      }
      // delete ship via setDataState() to rerender table
      setDataState((state) => ({
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((ship) => ship._id !== shipId),
          total: state.data.total - 1
        }
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error delete Ship:', error);
      showNotification(false, (error as Error)?.message || Messages.FailedDeleteShip);
    } finally {
      setIsUpdating(false);
    }
  };

  const columnDefs = useShipsColumns({ handleStartDeleteShip, isUpdating });

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
          data-testid="add-ship-button"
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
      {confirmationModalState.open && (
        <ConfirmationModal
          open={confirmationModalState.open}
          onClose={confirmationModalState.onClose}
          onConfirm={confirmationModalState.onConfirm}
          message={confirmationModalState.message}
          title={confirmationModalState.title}
        />
      )}
    </>
  );
};
