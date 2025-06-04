import React from 'react';
import { ScheduleFormContainer } from '@/components/AdminDashboard/ScheduleManagement/Schedule/ScheduleFormContainer';
import { getActivePortsAction, getActiveShipsAction, getScheduleAction } from '@/app/serverActions';
import { FormMode } from '@/utils/types';
import { defaultScheduleFormValues } from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import NotFound from '@/components/NotFound/NotFound';
import { getMergedFormValues } from '@/utils/formHelpers/formHelpers';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return <NotFound />;

  const [ports, ships, schedule] = await Promise.all([
    getActivePortsAction(),
    getActiveShipsAction(),
    getScheduleAction(id)
  ]);

  return (
    <ScheduleFormContainer
      formMode={FormMode.EDIT}
      initialValues={getMergedFormValues(defaultScheduleFormValues, schedule.data)}
      portsOptions={ports.data}
      shipsOptions={ships.data}
    />
  );
}
