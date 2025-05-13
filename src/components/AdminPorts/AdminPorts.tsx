'use client';

import { Table } from '@/components/Table/Table';
import { usePorts } from '@/components/AdminPorts/usePorts';
import { usePortsColumns } from '@/components/AdminPorts/usePortsColumns';
import { PortFrontend } from '@/models/PortFrontend';

export const AdminPorts = () => {
  console.log('AdminUserRequests()');
  const { portsState, getPorts } = usePorts();
  console.log(' portsState: ', portsState);

  const columnDefs = usePortsColumns();

  return (
    <div>
      <h2>Ports</h2>
      <Table<PortFrontend & { _id: string }>
        columnDefs={columnDefs}
        data={portsState.data}
        isLoading={portsState.isLoading}
        fetchData={getPorts}
        initialSortBy={[{ id: 'receivedAt', desc: true }]}
      />
    </div>
  );
};
