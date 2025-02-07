import { ReactNode } from 'react';

const mockUseUser = jest.fn().mockImplementation(() => ({
  user: null,
  error: null,
  isLoading: false
}));

/* eslint-disable import/first */
import { act, render } from '@testing-library/react';
import { menuLinks } from '@/helpers/menuLinks';
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
jest.mock('@auth0/nextjs-auth0/client', () => ({
  UserProvider: ({ children }: ReactNode) => <div>{children}</div>,
  useUser: () => mockUseUser()
}));

const setup = async (propsOverride?: Partial<NavbarProps>) => {
  const props = {
    ...propsOverride
  };
  const container = render(
    <UserProvider>
      <Navbar {...props} />
    </UserProvider>
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

  it('should show LogOut button for non authenticated user', async () => {
    mockUseUser.mockImplementation(() => ({
      user: { name: 'test' },
      error: null,
      isLoading: false
    }));
    const { container } = await setup();

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
    menuLinks.forEach((menuLink) => {
      expect(container.getByText(menuLink.label)).toBeInTheDocument();
    });
  });
});
