import { renderHook, act, waitFor } from '@testing-library/react';

// Mock the server actions before importing the hook
const mockGetSchedulesAction = jest.fn();
const mockQueryNearestShippingsAction = jest.fn();

jest.mock('@/app/server-actions/serverActions', () => ({
  getSchedulesAction: (...args: any[]) => mockGetSchedulesAction(...args),
  queryNearestShippingsAction: (...args: any[]) => mockQueryNearestShippingsAction(...args)
}));

// Mock date-time utilities
jest.mock('@/utils/date-time', () => ({
  addMinutes: jest.fn((date: Date, minutes: number) => new Date(date.getTime() + minutes * 60000))
}));

import {
  useSchedulesLoader,
  defaultPortSchedulesState,
  emptyPortErrors
} from './useSchedulesLoader';
import { PortFrontend } from '@/models/PortFrontend';
import { ShipStopWithSailingAndPortFrontend } from '@/models/ShipStopFrontend';
import { MonthDateRange } from '@/utils/date-time';

describe('useSchedulesLoader', () => {
  const mockPorts: PortFrontend[] = [
    {
      _id: 'port1',
      portName: 'Miami',
      destinationName: 'Florida',
      imageFileName: 'miami.jpg'
    },
    {
      _id: 'port2',
      portName: 'Nassau',
      destinationName: 'Bahamas',
      imageFileName: 'nassau.jpg'
    }
  ];

  const mockSchedules: ShipStopWithSailingAndPortFrontend[][] = [
    [
      {
        _id: 'schedule1',
        sailingId: 'sailing1',
        shipId: 'ship1',
        portId: 'port1',
        arrivalOn: '2025-10-01T10:00:00Z',
        departureOn: '2025-10-02T10:00:00Z',
        miles: 100,
        daysAtSea: 1,
        daysInPort: 1,
        sailing: {
          _id: 'sailing1',
          name: 'Caribbean Route',
          isActive: true,
          createdAt: '2025-09-01T00:00:00Z',
          updatedAt: '2025-09-01T00:00:00Z',
          deletedAt: null
        },
        departurePort: mockPorts[0]
      }
    ]
  ];

  const mockDateRange: MonthDateRange = {
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-10-31')
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSchedulesAction.mockResolvedValue({ success: true, data: mockSchedules });
    mockQueryNearestShippingsAction.mockResolvedValue(mockSchedules);
  });

  it('initializes with correct ports and schedules from props', async () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // Check the initial state values that should match props
    expect(result.current.schedulesState.ports).toEqual(mockPorts);
    expect(result.current.schedulesState.schedules).toEqual(mockSchedules);
    expect(result.current.schedulesState.departurePortId).toBeNull();
    expect(result.current.schedulesState.destinationPortId).toBeNull();
    expect(result.current.schedulesState.loadingDate).toBeNull();
    expect(result.current.schedulesState.isLoadingPort).toBe(false);
    expect(result.current.schedulesState.isLoadingSchedule).toBe(false);
    expect(result.current.schedulesState.errors).toEqual(emptyPortErrors);

    // After the first render effect, isFirstRender should become false
    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });
  });

  it('handles departure port selection', () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    expect(result.current.schedulesState.departurePortId).toBe('port1');
  });

  it('handles destination port selection', () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    act(() => {
      result.current.handleDestinationPortSelected('port2');
    });

    expect(result.current.schedulesState.destinationPortId).toBe('port2');
  });

  it('handles loading date selection', () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    act(() => {
      result.current.handleLoadingDateSelected(mockDateRange);
    });

    expect(result.current.schedulesState.loadingDate).toEqual(mockDateRange);
  });

  it('handles null date selection', () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    act(() => {
      result.current.handleLoadingDateSelected(null);
    });

    expect(result.current.schedulesState.loadingDate).toBeNull();
  });

  it('skips loading on first render', async () => {
    renderHook(() => useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules }));

    // Wait a bit to ensure useEffect has run
    await waitFor(() => {
      expect(mockGetSchedulesAction).not.toHaveBeenCalled();
      expect(mockQueryNearestShippingsAction).not.toHaveBeenCalled();
    });
  });

  it('loads schedules when both departure and destination ports are selected', async () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // First trigger to set isFirstRender to false
    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });

    // Now set both ports to trigger schedule loading
    act(() => {
      result.current.handleDestinationPortSelected('port2');
    });

    await waitFor(() => {
      expect(mockGetSchedulesAction).toHaveBeenCalledWith({
        departurePortId: 'port1',
        destinationPortId: 'port2',
        startDate: null,
        endDate: null
      });
    });

    await waitFor(() => {
      expect(result.current.schedulesState.schedules).toEqual(mockSchedules);
      expect(result.current.schedulesState.isLoadingSchedule).toBe(false);
    });
  });

  it('loads schedules with date range when ports and dates are selected', async () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // Set isFirstRender to false
    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });

    // Set destination port and date range
    act(() => {
      result.current.handleDestinationPortSelected('port2');
      result.current.handleLoadingDateSelected(mockDateRange);
    });

    await waitFor(() => {
      expect(mockGetSchedulesAction).toHaveBeenCalledWith(
        expect.objectContaining({
          departurePortId: 'port1',
          destinationPortId: 'port2',
          startDate: expect.any(Date),
          endDate: expect.any(Date)
        })
      );
    });
  });

  it('loads nearest shippings when only one port is selected', async () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // Set isFirstRender to false
    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });

    // Don't set destination port - should trigger queryNearestShippingsAction
    await waitFor(() => {
      expect(mockQueryNearestShippingsAction).toHaveBeenCalledWith(expect.any(Date));
    });

    await waitFor(() => {
      expect(result.current.schedulesState.schedules).toEqual(mockSchedules);
      expect(result.current.schedulesState.isLoadingSchedule).toBe(false);
    });
  });

  it('sets loading state during schedule fetch', async () => {
    // Make the action take some time to resolve
    let resolveSchedules: (value: any) => void;
    const schedulePromise = new Promise((resolve) => {
      resolveSchedules = resolve;
    });
    mockGetSchedulesAction.mockReturnValue(schedulePromise);

    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // Set isFirstRender to false
    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });

    // Set destination port to trigger loading
    act(() => {
      result.current.handleDestinationPortSelected('port2');
    });

    // Should be loading
    await waitFor(() => {
      expect(result.current.schedulesState.isLoadingSchedule).toBe(true);
    });

    // Resolve the promise
    act(() => {
      resolveSchedules({ success: true, data: mockSchedules });
    });

    // Should no longer be loading
    await waitFor(() => {
      expect(result.current.schedulesState.isLoadingSchedule).toBe(false);
    });
  });

  it('updates schedules when dependencies change', async () => {
    const { result } = renderHook(() =>
      useSchedulesLoader({ ports: mockPorts, schedules: mockSchedules })
    );

    // Set initial state
    act(() => {
      result.current.handleDeparturePortSelected('port1');
    });

    await waitFor(() => {
      expect(result.current.schedulesState.isFirstRender).toBe(false);
    });

    act(() => {
      result.current.handleDestinationPortSelected('port2');
    });

    await waitFor(() => {
      expect(mockGetSchedulesAction).toHaveBeenCalledTimes(1);
    });

    // Change date range - should trigger another call
    act(() => {
      result.current.handleLoadingDateSelected(mockDateRange);
    });

    await waitFor(() => {
      expect(mockGetSchedulesAction).toHaveBeenCalledTimes(2);
    });
  });

  it('exports default state and empty errors correctly', () => {
    expect(defaultPortSchedulesState).toEqual({
      ports: [],
      destinations: [],
      destinationPortId: null,
      destinationPorts: [],
      departurePortId: null,
      loadingDate: null,
      isLoadingPort: false,
      isLoadingSchedule: false,
      destinationIndex: null,
      errors: emptyPortErrors,
      schedules: [],
      errorMessage: null,
      isFirstRender: true
    });

    expect(emptyPortErrors).toEqual({
      departurePortId: '',
      destinationPortId: ''
    });
  });
});
