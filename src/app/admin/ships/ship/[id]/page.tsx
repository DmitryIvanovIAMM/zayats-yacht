'use server';

import React from 'react';
import { defaultShipFormValues } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { ShipFormContainer } from '@/components/AdminDashboard/AdminShips/Ship/ShipFormContainer';
import { FormMode } from '@/utils/types';
import NotFound from '@/components/NotFound/NotFound';
import { getShipByAdminAction } from '@/app/serverActions';
import Error from '@/components/Error/Error';
import { getMergedFormValues } from '@/utils/formHelpers/formHelpers/formHelpers';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return <NotFound />;

  const getShipAction = await getShipByAdminAction(id);
  if (!getShipAction.success) {
    return <Error error={`500 - ${getShipAction.message || 'Server Error'}`} />;
  }

  return (
    <ShipFormContainer
      formMode={FormMode.EDIT}
      initialValues={getMergedFormValues(defaultShipFormValues, getShipAction.data)}
      _id={id}
    />
  );
}
