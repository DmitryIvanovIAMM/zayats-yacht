import React from 'react';
import { ShipFormContainer } from '@/components/AdminDashboard/AdminShips/Ship/ShipFormContainer';
import { FormMode } from '@/utils/types';
import { defaultShipFormValues } from '@/components/AdminDashboard/AdminShips/Ship/types';

export default async function Home() {
  return <ShipFormContainer formMode={FormMode.ADD} initialValues={defaultShipFormValues} />;
}
