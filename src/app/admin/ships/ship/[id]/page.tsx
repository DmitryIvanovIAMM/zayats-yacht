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

  const shipAction = await getShipByAdminAction(id);
  if (!shipAction.success) {
    return <Error error={`500 - ${shipAction.message || 'Server Error'}`} />;
  }

  return (
    <ShipFormContainer
      formMode={FormMode.EDIT}
      initialValues={getMergedFormValues(defaultShipFormValues, shipAction.data)}
      _id={id}
    />
  );
}
