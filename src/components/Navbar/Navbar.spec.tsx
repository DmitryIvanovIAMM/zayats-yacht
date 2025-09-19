import { Session } from 'next-auth';
import { act, render } from '@testing-library/react';
import { baseMenuLinks } from '@/helpers/menuLinks';
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar';
import SessionProvider from '@/components/SessionProvider/SessionProvider';

const mockSession = {
  user: undefined,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
};

jest.mock('next/navigation');

const setup = async (propsOverride: Partial<NavbarProps> = {}, session: Partial<Session> = {}) => {
  const sessionForProvider = {
    ...mockSession,
    ...session
  };
  const props = {
    session: mockSession,
    ...propsOverride
  };
  const container = render(
    <SessionProvider session={sessionForProvider}>
      <Navbar {...props} />
    </SessionProvider>
  );
  return {
    container
  };
};

describe('Navbar component', () => {
  it('should render correctly', async () => {
    const { container } = await setup();

    expect(container).toMatchSnapshot();
  });

  it('should show logo', async () => {
    const { container } = await setup();

    expect(container.getByAltText('Allied-Yacht logo')).toBeInTheDocument();
  });

  it('should show SignIn button for non authenticated user', async () => {
    const { container } = await setup();

    expect(container.getByText('Login')).toBeInTheDocument();
  });

  it('should show LogOut button for authenticated user', async () => {
    const { container } = await setup({}, { user: { name: 'test', image: 'admin' } });

    expect(container.getByText('Logout')).toBeInTheDocument();
  });

  it('should show Get Quote button for non authenticated user', async () => {
    const { container } = await setup();

    expect(container.getByText('Get Quote')).toBeInTheDocument();
  });

  it('should contains left navigation menu items by default', async () => {
    const { container } = await setup();

    act(() => {
      // no click required in current realization because drawer always mounted
      container.getByTestId('left-menu-button').click();
    });
    baseMenuLinks.forEach((menuLink) => {
      expect(container.getByText(menuLink.label)).toBeInTheDocument();
    });
  });
});
