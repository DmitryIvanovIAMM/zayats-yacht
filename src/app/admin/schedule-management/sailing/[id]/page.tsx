import React from 'react';
import { ScheduleFormContainer } from '@/components/AdminDashboard/ScheduleManagement/Schedule/ScheduleFormContainer';
import {
  getActivePortsOptionsAction,
  getActiveShipsOptionsAction,
  getScheduleByAdminAction
} from '@/app/serverActions';
import { FormMode } from '@/utils/types';
import { defaultScheduleFormValues } from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import NotFound from '@/components/NotFound/NotFound';
import { getMergedFormValues } from '@/utils/formHelpers/formHelpers';
import Error from '@/components/Error/Error';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return <NotFound />;

  const [getPortsResult, getShipsResult, getScheduleResult] = await Promise.all([
    getActivePortsOptionsAction(),
    getActiveShipsOptionsAction(),
    getScheduleByAdminAction(id)
  ]);

  const errorMessage = !getScheduleResult.success
    ? getScheduleResult.message
    : !getPortsResult.success
      ? getPortsResult.message
      : !getShipsResult.success
        ? getShipsResult.message
        : 'Server Error';
  if (!getScheduleResult.success || !getPortsResult.success || !getShipsResult.success) {
    return <Error error={`500 - ${errorMessage}`} />;
  }

  return (
    <ScheduleFormContainer
      formMode={FormMode.EDIT}
      _id={id}
      initialValues={getMergedFormValues(defaultScheduleFormValues, getScheduleResult.data)}
      portsOptions={getPortsResult.data}
      shipsOptions={getShipsResult.data}
    />
  );
}
