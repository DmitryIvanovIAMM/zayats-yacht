import React from 'react';
import { render } from '@testing-library/react';
import RoutesList, { RoutesListProps } from '@/components/RoutesList/RoutesList';
import {
  NO_MATCHING_SCHEDULES_MESSAGE,
  SELECT_DESTINATION_LOADING_PORTS_MESSAGE,
  SELECT_DESTINATION_PORT_MESSAGE,
  SELECT_LOADING_PORT_MESSAGE
} from '@/utils/routeCalculators';

const route1 = [
  {
    _id: '41224d776a326fb40f002105',
    arrivalOn: '2020-05-16T00:00:00.000Z',
    departureOn: '2020-05-31T00:00:00.000Z',
    sailing: {
      _id: '41224d776a326fb40f001100',
      name: 'Summer Mediterranean Sailing'
    },
    miles: 4262,
    daysAtSea: 15,
    daysInPort: 2,
    departurePort: {
      _id: '41224d776a326fb40f001101',
      portName: 'Fort Lauderdale, Florida',
      destinationName: 'East Coast North America',
      fileName: 'Mediterranean.jpg'
    }
  },
  {
    _id: '41224d776a326fb40f002106',
    arrivalOn: '2020-06-02T00:00:00.000Z',
    departureOn: '2020-06-03T00:00:00.000Z',
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
      destinationName: 'Mediterranean'
    }
  }
];
const route2 = [
  {
    _id: '41224d776a326fb40f002105',
    arrivalOn: '2020-05-16T00:00:00.000Z',
    departureOn: '2020-05-31T00:00:00.000Z',
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
      destinationName: 'East Coast North America'
    }
  },
  {
    _id: '41224d776a326fb40f002106',
    arrivalOn: '2020-06-02T00:00:00.000Z',
    departureOn: '2020-06-03T00:00:00.000Z',
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
      destinationName: 'Mediterranean'
    }
  }
];

const setup = (propOverrides: Partial<RoutesListProps> = {}) => {
  const props: RoutesListProps = Object.assign(
    {
      routesList: [route1, route2],
      isLoadingPortSelected: true,
      isDestinationPortSelected: true,
      onUserGetRouteSelect: jest.fn(),
      onShareRoute: jest.fn()
    },
    propOverrides
  );

  const container = render(<RoutesList {...props} />);

  return {
    props,
    container
  };
};

describe('RouteBoxesList component ', () => {
  it('should render component', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render nested components data', () => {
    const { container, props } = setup();

    expect(container.container).toHaveTextContent('Get Quote');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(container.container).toHaveTextContent(props.routesList[0][0]?.sailing?.name);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(container.container).toHaveTextContent(props.routesList[0][0]?.departurePort?.portName);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(container.container).toHaveTextContent(props.routesList[1][0]?.sailing?.name);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(container.container).toHaveTextContent(props.routesList[1][0]?.departurePort?.portName);
  });

  it('should snow NO_MATCHING_SCHEDULES_MESSAGE when no routes received', () => {
    const { container } = setup({
      routesList: [],
      isLoadingPortSelected: true,
      isDestinationPortSelected: true
    });

    expect(container.container).toHaveTextContent(NO_MATCHING_SCHEDULES_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_LOADING_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_LOADING_PORTS_MESSAGE);
  });

  it('should snow SELECT_LOADING_PORT_MESSAGE when no routes and port not selected', () => {
    const { container } = setup({
      routesList: [],
      isLoadingPortSelected: false,
      isDestinationPortSelected: true
    });

    expect(container.container).not.toHaveTextContent(NO_MATCHING_SCHEDULES_MESSAGE);
    expect(container.container).toHaveTextContent(SELECT_LOADING_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_LOADING_PORTS_MESSAGE);
  });

  it('should snow SELECT_DESTINATION_PORT_MESSAGE when no routes and port not selected', () => {
    const { container } = setup({
      routesList: [],
      isLoadingPortSelected: true,
      isDestinationPortSelected: false
    });

    expect(container.container).not.toHaveTextContent(NO_MATCHING_SCHEDULES_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_LOADING_PORT_MESSAGE);
    expect(container.container).toHaveTextContent(SELECT_DESTINATION_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_LOADING_PORTS_MESSAGE);
  });

  it('should snow SELECT_DESTINATION_LOADING_PORTS_MESSAGE when no routes and port not selected', () => {
    const { container } = setup({
      routesList: [],
      isLoadingPortSelected: false,
      isDestinationPortSelected: false
    });

    expect(container.container).not.toHaveTextContent(NO_MATCHING_SCHEDULES_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_LOADING_PORT_MESSAGE);
    expect(container.container).not.toHaveTextContent(SELECT_DESTINATION_PORT_MESSAGE);
    expect(container.container).toHaveTextContent(SELECT_DESTINATION_LOADING_PORTS_MESSAGE);
  });
});
