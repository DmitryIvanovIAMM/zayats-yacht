'use client';

import { useQuoteRequests } from '@/components/AdminUserRequests/useQuoteRequests';
import { useEffect } from 'react';

export const AdminUserRequests = () => {
  // eslint-disable-next-line no-console
  console.log('AdminUserRequests()');
  const { quoteRequestsState, getQuoteRequests } = useQuoteRequests();

  useEffect(() => {
    getQuoteRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-console
  console.log('quoteRequestsState: ', quoteRequestsState);

  return (
    <div>
      <h1>User Requests</h1>
    </div>
  );
};
