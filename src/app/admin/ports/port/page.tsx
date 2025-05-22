import React from 'react';
import { FormMode } from '@/utils/types';
import { PortFormContainer } from '@/components/AdminDashboard/AdminPorts/Port/PortFormContainer';
import { defaultPortFormValues } from '@/components/AdminDashboard/AdminPorts/Port/types';

export default async function Home() {
  return <PortFormContainer formMode={FormMode.ADD} initialValues={defaultPortFormValues} />;
}
