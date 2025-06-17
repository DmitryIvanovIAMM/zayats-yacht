'use client';

import { Table } from '@/components/Table/Table';
import { usePortsColumns } from '@/components/AdminDashboard/AdminPorts/usePortsColumns';
import { PortFrontend } from '@/models/PortFrontend';
import { useTableDataFetcher } from '@/components/Table/useTableDataFetcher';
import { getFilteredPorts } from '@/controllers/PortsController';
import { Messages } from '@/helpers/messages';
import { useState } from 'react';
import {
  ConfirmationModal,
  defaultConfirmationModalProps
} from '@/components/ConfirmationModal/ConfirmationModal';
import { deletePortByAdminAction } from '@/app/server-actions/serverActions';
import { showNotification } from '@/modules/notifications/notifications';
import { PATHS } from '@/helpers/paths';
import Button from '@mui/material/Button';

export const AdminPorts = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmationModalState, setConfirmationModalState] = useState(
    defaultConfirmationModalProps
  );
  const { dataState, setDataState, fetchDataFromServer } = useTableDataFetcher<PortFrontend>(
    getFilteredPorts,
    [],
    Messages.FailedGetPorts
  );

  const handleStartDeletePort = async (portId: string) => {
    const portToBeDeleted = dataState.data.data.find((ship) => {
      return ship._id === portId;
    });
    if (!portToBeDeleted) {
      return;
    }
    setConfirmationModalState({
      open: true,
      onClose: () => setConfirmationModalState(defaultConfirmationModalProps),
      onConfirm: () => handleDeletePort(portId),
      title: 'Confirm Action',
      message: `Are you sure you want to delete "${portToBeDeleted.portName}" port?`
    });
  };

  const handleDeletePort = async (portId: string) => {
    setConfirmationModalState(defaultConfirmationModalProps);
    setIsUpdating(true);
    try {
      const actionResult = await deletePortByAdminAction(portId);
      if (!actionResult.success) {
        return showNotification(false, actionResult.message || Messages.FailedDeletePort);
      }
      // delete ship via setDataState() to rerender table
      setDataState((state) => ({
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((port) => port._id !== portId),
          total: state.data.total - 1
        }
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error delete Port:', error);
      showNotification(false, (error as Error)?.message || Messages.FailedDeletePort);
    } finally {
      setIsUpdating(false);
    }
  };

  const columnDefs = usePortsColumns({ handleStartDeletePort, isUpdating });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Ports</h2>
        <Button
          href={PATHS.addPort}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark', margin: '0 0 10px 0' }}
          size={'small'}
          style={{ height: '31px' }}
          data-testid="add-port-button"
        >
          Add Port
        </Button>
      </div>
      <Table<PortFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={dataState.data}
        isLoading={dataState.isLoading}
        fetchData={fetchDataFromServer}
        initialSortBy={[{ id: 'portName', desc: false }]}
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
