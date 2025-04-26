import React from 'react';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { PATHS } from '@/helpers/paths';

export interface ProtectedLayoutProps {
  children: React.ReactNode;
  session: Session | null;
  allowedRoles?: string[];
  callbackUrl?: string;
}

export const c = ({
  children,
  session,
  allowedRoles = ['admin'],
  callbackUrl = PATHS.landing
}: ProtectedLayoutProps): React.ReactNode => {
  const isAllowed =
    session?.user?.image && allowedRoles?.some((role) => session?.user?.image?.includes(role));

  if (!isAllowed) {
    return redirect(`${PATHS.signIn}?callbackUrl=${callbackUrl}`);
  }

  return <div>{children}</div>;
};
