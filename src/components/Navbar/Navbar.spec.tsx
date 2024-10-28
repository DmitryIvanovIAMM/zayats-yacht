import { act, render } from '@testing-library/react';
import Navbar, { NavbarProps } from '@/components/Navbar/Navbar';
import { menuLinks } from '@/app/helpers/menuLinks';

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

  it('should show Sign In button for non authenticated user', async () => {
    const { container } = await setup({ isAuthenticated: true });

    expect(container.getByText('Sign In')).toBeInTheDocument();
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
