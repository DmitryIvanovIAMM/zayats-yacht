'use server';

import React from 'react';
import { ScheduleFormContainer } from '@/components/AdminDashboard/ScheduleManagement/Schedule/ScheduleFormContainer';
import { FormMode } from '@/utils/types';
import { defaultScheduleFormValues } from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import {
  getActivePortsOptionsAction,
  getActiveShipsOptionsAction
} from '@/app/server-actions/serverActions';

export default async function Home() {
  const [ports, ships] = await Promise.all([
    getActivePortsOptionsAction(),
    getActiveShipsOptionsAction()
  ]);

  return (
    <ScheduleFormContainer
      formMode={FormMode.ADD}
      initialValues={defaultScheduleFormValues}
      portsOptions={ports.data}
      shipsOptions={ships.data}
    />
  );
}
