import { act, render } from '@testing-library/react';
import { menuLinks } from '@/helpers/menuLinks';
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

const setup = async (propsOverride?: Partial<NavbarProps>) => {
  const props = {
    isAuthenticated: false,
    ...propsOverride
  };
  const container = render(<Navbar {...props} />);
  return {
    container
  };
};

describe('Navbar component', () => {
  it('should render correctly', async () => {
    const { container } = await setup({ isAuthenticated: true });

    expect(container).toMatchSnapshot();
  });

  it('should show logo', async () => {
    const { container } = await setup({ isAuthenticated: true });

    expect(container.getByAltText('Allied-Yacht logo')).toBeInTheDocument();
  });

  it('should show SignIn button for non authenticated user', async () => {
    const { container } = await setup({ isAuthenticated: false });

    expect(container.getByText('SignIn')).toBeInTheDocument();
  });

  it('should show LogOut button for non authenticated user', async () => {
    const { container } = await setup({ isAuthenticated: true });

    expect(container.getByText('LogOut')).toBeInTheDocument();
  });

  it('should show Get Quote button for non authenticated user', async () => {
    const { container } = await setup({ isAuthenticated: true });

    expect(container.getByText('Get Quote')).toBeInTheDocument();
  });

  it('should contains left navigation menu items by default', async () => {
    const { container } = await setup({ isAuthenticated: true });

    act(() => {
      // no click required in current realization because drawer always mounted
      container.getByTestId('left-menu-button').click();
    });
    menuLinks.forEach((menuLink) => {
      expect(container.getByText(menuLink.label)).toBeInTheDocument();
    });
  });
});
