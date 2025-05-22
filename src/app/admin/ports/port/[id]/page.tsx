'use server';

import React from 'react';
import { FormMode } from '@/utils/types';
import NotFound from '@/components/NotFound/NotFound';
import { getPortByAdminAction } from '@/app/serverActions';
import Error from '@/components/Error/Error';
import { defaultPortFormValues } from '@/components/AdminDashboard/AdminPorts/Port/types';
import { PortFormContainer } from '@/components/AdminDashboard/AdminPorts/Port/PortFormContainer';
import { getMergedFormValues } from '@/utils/formHelpers/formHelpers/formHelpers';

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return <NotFound />;

  const getPortAction = await getPortByAdminAction(id);
  if (!getPortAction.success) {
    return <Error error={`500 - ${getPortAction.message || 'Server Error'}`} />;
  }

  return (
    <PortFormContainer
      formMode={FormMode.EDIT}
      initialValues={getMergedFormValues(defaultPortFormValues, getPortAction.data)}
      _id={id}
    />
  );
}
