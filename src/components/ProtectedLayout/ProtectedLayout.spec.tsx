import { render, screen } from '@testing-library/react';
import {
  ProtectedLayout,
  ProtectedLayoutProps
} from '@/components/ProtectedLayout/ProtectedLayout';
import { Session } from 'next-auth';
import { PATHS } from '@/helpers/paths';

const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (redirectPath: string) => mockRedirect(redirectPath)
}));

const defaultSession: Session = {
  user: {
    image: 'admin'
  },
  expires: new Date().toString()
};

const setup = (propsOverride: Partial<ProtectedLayoutProps>) => {
  const protectedLayout = {
    session: defaultSession,
    ...propsOverride
  };
  const container = render(
    <ProtectedLayout {...protectedLayout}>Protected section</ProtectedLayout>
  );
  return {
    container
  };
};

describe('ProtectedLayout component', () => {
  it('should show private section for allowed role', async () => {
    setup();

    expect(screen.getByText('Protected section')).toBeInTheDocument();
    expect(mockRedirect).toHaveBeenCalledTimes(0);
  });

  it('should show private section for allowed multiple roles', async () => {
    setup({ allowedRoles: ['admin', 'admin'] });

    expect(screen.getByText('Protected section')).toBeInTheDocument();
    expect(mockRedirect).toHaveBeenCalledTimes(0);
  });

  it('should not show private section for not allowed role', async () => {
    const redirectPath = `${PATHS.signIn}?callbackUrl=${PATHS.landing}`;
    setup({ session: { ...defaultSession, user: { image: 'user' } } });

    expect(screen.queryByText('Protected section')).not.toBeInTheDocument();
    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith(redirectPath);
  });

  it('should not show private section for not allowed role with redirect path', async () => {
    const callbackUrl = '/quote-request';
    const redirectPath = `${PATHS.signIn}?callbackUrl=${callbackUrl}`;

    setup({ session: { ...defaultSession, user: { image: 'user' } }, callbackUrl: callbackUrl });

    expect(screen.queryByText('Protected section')).not.toBeInTheDocument();
    expect(mockRedirect).toHaveBeenCalledWith(redirectPath);
  });
});
