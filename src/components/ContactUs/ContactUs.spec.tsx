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
    expect(container.container).toHaveTextContent('Allied Yacht Transport');
    expect(container.container).toHaveTextContent('12555 Orange Drive, Suite 228');
    expect(container.container).toHaveTextContent('Fort Lauderdale, FL, 33330, USA');

    expect(container.getByText('Phone')).toBeInTheDocument();
    expect(container.container).toHaveTextContent('+1 954-394-4640');

    expect(container.getByText('Email')).toBeInTheDocument();
    expect(container.container).toHaveTextContent('sales@allied-yacht.com');
    expect(container.container).toHaveTextContent('operations@allied-yacht.com');
  });
});
