'use server';

import React from 'react';
import { ScheduleFormContainer } from '@/components/AdminDashboard/ScheduleManagement/Schedule/ScheduleFormContainer';
import { FormMode } from '@/utils/types';
import { defaultScheduleFormValues } from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { getActivePortsAction, getActiveShipsAction } from '@/app/serverActions';

export default async function Home() {
  const [ports, ships] = await Promise.all([getActivePortsAction(), getActiveShipsAction()]);

  return (
    <ScheduleFormContainer
      formMode={FormMode.ADD}
      initialValues={defaultScheduleFormValues}
      portsOptions={ports.data}
      shipsOptions={ships.data}
    />
  );
}
