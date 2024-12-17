import React from 'react';
import RouteWithImage, { RouteWithImageBoxProps } from '@/components/RouteWithImage/RouteWithImage';
import { createTheme } from '@mui/material/styles';
import { Theme, ThemeProvider } from '@mui/system';
import { render } from '@testing-library/react';

const route = [
  {
    _id: '41224d776a326fb40f002105',
    departureOn: '2020-05-16T00:00:00.000Z',
    arrivalOn: '2020-05-31T00:00:00.000Z',
    sailing: {
      _id: '41224d776a326fb40f001100',
      name: 'Summer Mediterranean Sailing'
    },
    destinationName: 'Mediterranean',
    departurePortId: '41224d776a326fb40f001101',
    destinationPortId: '41224d776a326fb40f001102',
    miles: 4262,
    daysAtSea: 15,
    daysInPort: 2,
    fileName: 'Mediterranean.jpg',
    departurePort: {
      _id: '41224d776a326fb40f001101',
      portName: 'Fort Lauderdale, Florida',
      destinationName: 'East Coast North America',
      fileName: 'Mediterranean.jpg'
    }
  },
  {
    _id: '41224d776a326fb40f002106',
    departureOn: '2020-06-02T00:00:00.000Z',
    arrivalOn: '2020-06-03T00:00:00.000Z',
    sailing: {
      _id: '41224d776a326fb40f001100',
      name: 'Summer Mediterranean Sailing'
    },
    destinationName: 'Mediterranean',
    departurePortId: '41224d776a326fb40f001102',
    destinationPortId: '41224d776a326fb40f001103',
    miles: 441,
    daysAtSea: 1,
    daysInPort: 4,
    fileName: 'Mediterranean.jpg',
    departurePort: {
      _id: '41224d776a326fb40f001102',
      portName: 'Palma de Mallorca, Spain',
      destinationName: 'Mediterranean',
      fileName: 'Mediterranean.jpg'
    }
  }
];

const setup = (propOverrides: Partial<RouteWithImageBoxProps> = {}, theme: any = null) => {
  const testingTheme = theme
    ? createTheme(theme)
    : (createTheme({
        props: { MuiWithWidth: { initialWidth: 'xs' } }
      }) as Theme);

  const baseProps = {
    route: route,
    index: 0,
    onUserGetRouteSelect: jest.fn()
  };

  const props: RouteWithImageBoxProps = propOverrides
    ? Object.assign(baseProps, propOverrides)
    : baseProps;

  const container = render(
    <ThemeProvider theme={testingTheme}>
      <RouteWithImage {...props} />
    </ThemeProvider>
  );

  return {
    props,
    container
  };
};

describe('RouteWithImageBox component ', () => {
  it('should render component with header', async () => {
    const { container } = await setup();

    expect(container).toMatchSnapshot();
  });
  it('should components', async () => {
    const { container } = await setup();

    expect(container.container).toHaveTextContent('Destination');
    expect(container.container).toHaveTextContent('MILES');
    expect(container.container).toHaveTextContent('TRANSIT TIME');
  });

  it('should render `GetQuote` buttons properly for extra small screen', async () => {
    const { container } = await setup();

    expect(container.getByTestId('get-quote-smUp')).toBeInTheDocument();
  });

  it('Should render `GetQuote` buttons properly for small and above screen', async () => {
    const { container } = await setup(
      {},
      {
        props: { MuiWithWidth: { initialWidth: 'sx' } }
      }
    );

    expect(container.getByTestId('get-quote-xs')).toBeInTheDocument();
  });

  it('should show all routes in accepted route ', async () => {
    const { container } = await setup();

    expect(container.container).toHaveTextContent('Destination');
    expect(container.container).toHaveTextContent('MILES');
    expect(container.container).toHaveTextContent('TRANSIT TIME');

    expect(container.container).toHaveTextContent('Summer Mediterranean Sailing');
    expect(container.container).toHaveTextContent('Mediterranean');

    // Ports list
    expect(container.container).toHaveTextContent(route[0].departurePort.portName);

    // Statistics
    expect(container.container).toHaveTextContent('4703');
    expect(container.container).toHaveTextContent('20');
  });

  it('should render date as "Month Day, Year" format', async () => {
    const { container } = setup();

    // Start / End dates
    expect(container.container).toHaveTextContent('May 31, 2020');
    expect(container.container).toHaveTextContent('Jun 3, 2020');
  });

  it('should not render Stops when they are same as Departure & Loading Port', async () => {
    const { container } = await setup(
      {},
      {
        props: { MuiWithWidth: { initialWidth: 'md' } }
      }
    );
    expect(container.container).not.toHaveTextContent('Stops');
  });

  it('should not render Stops on xs', async () => {
    const { container } = await setup(
      {},
      {
        props: { MuiWithWidth: { initialWidth: 'sx' } }
      }
    );

    expect(container.container).not.toHaveTextContent('Stops');
  });
});
