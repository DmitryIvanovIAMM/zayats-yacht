/*import React from 'react';
import { Theme, ThemeProvider } from '@mui/system';
import { render } from '@testing-library/react';
import { createTheme } from '@mui/material/styles';
import ScheduleSection, { ScheduleSectionProps } from '@/components/Schedule/Schedule';
import { ShipStop } from '@/models/ShipStop';
import { Port } from '@/models/Port';

const lauderdalePort = {
  _id: '41224d776a326fb40f001101',
  portName: 'Fort Lauderdale, Florida',
  destinationName: 'East Coast North America',
  fileName: 'Mediterranean.jpg'
};
const palmaPort = {
  _id: '41224d776a326fb40f001102',
  portName: 'Palma de Mallorca, Spain',
  destinationName: 'Mediterranean',
  fileName: 'Mediterranean.jpg'
};
const genoaPort = {
  _id: '41224d776a326fb40f001103',
  portName: 'Genoa, Italy',
  destinationName: 'Mediterranean',
  fileName: 'Mediterranean.jpg'
};
const destinations = [
  {
    destinationName: 'test 1 destination name',
    ports: [lauderdalePort, palmaPort]
  },
  {
    destinationName: 'test 3 destination name',
    ports: [genoaPort, palmaPort]
  }
];

const schedules = [
  {
    _id: '41224d776a326fb40f002105',
    departureOn: '2020-05-16T00:00:00.000Z',
    arrivalOn: '2020-05-31T00:00:00.000Z',
    sailing: {
      _id: '41224d776a326fb40f001100',
      name: 'Summer Mediterranean Sailing'
    },
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

const setup = (propOverrides: Partial<ScheduleSectionProps> = {}, themeOverrides: any = {}) => {
  const props: ScheduleSectionProps = {
    ports: [lauderdalePort, palmaPort, genoaPort] as any as Port[],
    schedules: [schedules] as any as ShipStop[][],
    ...propOverrides
  };

  // we need to send MuiWithWidth as part of theme.props to
  // proper work of Hidden Material-UI component
  const theme = createTheme({
    props: { MuiWithWidth: { initialWidth: 'xs' }, ...themeOverrides }
  }) as any as Theme;
  const container = render(
    <ThemeProvider theme={theme}>
      <ScheduleSection {...props} />
    </ThemeProvider>
  );

  return {
    container,
    props
  };
};

describe.skip('Schedule component ', () => {
  it('should render element with defined structure', async () => {
    const { container } = await setup();

    expect(container).toMatchSnapshot();

    expect(container.container).toHaveTextContent('From');
    expect(container.container).toHaveTextContent('To');
    expect(container.container).toHaveTextContent('When');

    expect(container.container).toHaveTextContent('Fort Lauderdale, Florida');
    expect(container.container).toHaveTextContent('Palma de Mallorca, Spain');

    expect(container.container).toHaveTextContent('Summer Mediterranean Sailing');
    expect(container.container).toHaveTextContent('441 miles');
  });

  /*it('should call storeDestinationPortId() if it selected', () => {
    act(() => {
      const { wrapper, props } = setup();

      expect(wrapper).toBeDefined();
      expect(props.storeDestinationPortId).toHaveBeenCalledTimes(0);
      wrapper
        .find(Select)
        .at(1)
        .props()
        .onChange({ target: { value: 1 } });

      expect(props.storeDestinationPortId).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call storeDestinationPortId() if the same value is selected', () => {
    const { wrapper, props } = setup();

    expect(wrapper).toBeDefined();
    expect(props.storeDestinationPortId).toHaveBeenCalledTimes(0);

    wrapper
      .find(Select)
      .at(1)
      .props()
      .onChange({ target: { value: palmaPort._id } });

    expect(props.storeDestinationPortId).not.toHaveBeenCalled();
  });

  it('should call storeDeparturePortId() if new value selected', () => {
    const { wrapper, props } = setup();

    expect(wrapper).toBeDefined();
    wrapper
      .find(Select)
      .at(0)
      .props()
      .onChange({ target: { value: palmaPort._id } });

    expect(props.storeDeparturePortId).toHaveBeenCalled();
  });

  it('should call getPorts() at start', async () => {
    const { wrapper, props } = setup();

    wrapper.update();
    expect(wrapper).toBeDefined();
    expect(props.getPorts).toHaveBeenCalled();
  });

  it('should call getNearestShippings() at start', async () => {
    const { wrapper, props } = setup();

    wrapper.update();
    expect(wrapper).toBeDefined();
    expect(props.getNearestShippings).toHaveBeenCalled();
  });

  it('should show received schedule', () => {
    const { wrapper } = setup();

    expect(wrapper).toBeDefined();
    const routeBoxesLists = wrapper.find(RouteBoxesList);
    expect(routeBoxesLists).toHaveLength(1);
  });

  it('should show errors if any', () => {
    const testPorts = {
      portsList: [palmaPort, genoaPort, lauderdalePort],
      destinationPorts: [palmaPort],
      destinations: destinations,
      schedules: [],
      departurePortId: `${lauderdalePort._id}`,
      destinationPortId: `${palmaPort._id}`,
      month: '0',
      errors: {
        departurePortId: 'Departure port is required',
        destinationPortId: 'Destination port is required'
      },
      errorMessage: ''
    };
    const { wrapper } = setup({ ports: testPorts });

    expect(wrapper).toBeDefined();

    expect(wrapper.text()).toContain('Departure port is required');
    expect(wrapper.text()).toContain('Destination port is required');
  });

  it('Should exclude selected loading port from destination ports variants', () => {
    const { wrapper } = setup();

    expect(wrapper).toBeDefined();

    const destinationPortNode = wrapper.find(`[label="To"]`);
    const loadingPortNode = wrapper.find(`[label="From"]`);
    expect(destinationPortNode).toBeDefined();
    expect(loadingPortNode).toBeDefined();

    const result = destinationPortNode
      .props()
      .ports.findIndex(port => port._id === loadingPortNode.props().selectedPort);
    expect(result).toEqual(-1);
  });

  it('Should exclude selected destination port from loading ports variants', () => {
    const { wrapper } = setup();

    expect(wrapper).toBeDefined();

    const destinationPortNode = wrapper.find(`[label="To"]`);
    const loadingPortNode = wrapper.find(`[label="From"]`);
    expect(destinationPortNode).toBeDefined();
    expect(loadingPortNode).toBeDefined();

    const result = loadingPortNode
      .props()
      .ports.findIndex(port => port._id === destinationPortNode.props().selectedPort);
    expect(result).toEqual(-1);
  });

  /*it('Should call storeDestinationPortId() if destination ports has one option', () => {
    const testPorts = {
      portsList: [lauderdalePort, palmaPort, genoaPort],
      destinationPorts: [palmaPort],
      destinations: destinations,
      schedules: [],
      departurePortId: '',
      destinationPortId: '',
      month: '0',
      errors: {
        departurePortId: '',
        destinationPortId: ''
      },
      errorMessage: ''
    };
    const newProps = {
      ports: {
        portsList: [lauderdalePort, palmaPort, genoaPort],
        destinationPorts: [palmaPort],
        destinations: destinations,
        departurePortId: '',
        destinationPortId: '',
        schedules: [],
        month: '0',
        errors: {
          departurePortId: '',
          destinationPortId: ''
        },
        errorMessage: ''
      }
    };

    const { wrapper, props } = setup({
      ports: testPorts
    });
    const destinationPortElement = wrapper.find(`[label="To"]`);
    expect(destinationPortElement.text()).toContain(`To`);

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, newProps)
    });
    expect(props.storeDestinationPortId).toBeCalledWith(palmaPort._id);
  });
});*/
