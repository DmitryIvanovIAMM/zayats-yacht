import React from 'react';
import PortSelector, { PortSelectorProps } from './PortSelector';
import { render } from '@testing-library/react';

const testPort1 = {
  _id: 1,
  portName: 'port 1 short name'
};
const testPort2 = {
  _id: 2,
  portName: 'port 2 short name'
};

const setup = (propOverrides: Partial<PortSelectorProps>) => {
  const props: PortSelectorProps = Object.assign(
    {
      selectedPort: `${testPort1._id}`,
      ports: [testPort1, testPort2],
      errors: 'test error message',
      label: 'Select destination port',
      onSelect: jest.fn()
    },
    propOverrides
  );

  const container = render(<PortSelector {...props} />);

  return {
    props,
    container
  };
};

describe('PortSelector', () => {
  it('should render component', async () => {
    const { container, props } = setup({});

    expect(container).toBeDefined();

    expect(container.getByText(props.label)).toBeInTheDocument();
    expect(container.getByText(props.errors)).toBeInTheDocument();
    expect(container.queryAllByTestId('port-selector-for-control').length).toBe(1);
    expect(container.queryAllByTestId('port-selector').length).toBe(1);
  });
});
