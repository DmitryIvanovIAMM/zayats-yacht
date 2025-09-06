import { render } from '@testing-library/react';
import ContactUs from '@/components/ContactUs/ContactUs';

const setup = async () => {
  const container = render(<ContactUs />);
  return {
    container
  };
};

describe('ContactUs component', () => {
  it('should render correctly', async () => {
    const { container } = await setup();

    expect(container).toMatchSnapshot();
  });

  it('should show contact information', async () => {
    const { container } = await setup();

    expect(container.getByText('Address')).toBeInTheDocument();
    expect(container.container).toHaveTextContent('Zayats Yacht Transport');
    expect(container.container).toHaveTextContent('55555 Orange Drive, Suite 555');
    expect(container.container).toHaveTextContent('Fort Lauderdale, FL, +55555, USA');

    expect(container.getByText('Phone')).toBeInTheDocument();
    expect(container.container).toHaveTextContent('+1 555-555-5555');

    expect(container.getByText('Email')).toBeInTheDocument();
    expect(container.container).toHaveTextContent('CustomerService@zayats-yacht.com');
  });
});
