/**
 * @jest-environment node
 */

import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { getSchedulesAction } from '@/app/server-actions/serverActions';
import { fortLauderdalePort, palmaDeMallorcaPort } from '@/test-data/seedData';
import { REGULAR_SHIP_STOPS_2020 } from '@/test-data/regularShipStops_2020';
import { SAILINGS_2020 } from '@/test-data/sailings';
import { mapShipStopsArrayWithPortAndSailingToFrontend } from '@/models/mappers';
import { addDays } from 'date-fns';

const dataWithExpectedResults = [
  [
    'should return empty schedules for empty request data',
    {
      shipData: {
        departurePortId: null,
        destinationPortId: null,
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return empty schedules for request data with wrong departurePortId',
    {
      shipData: {
        departurePortId: 'wrongPortId',
        destinationPortId: null,
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return empty schedules for request data with wrong destinationPortId',
    {
      shipData: {
        departurePortId: null,
        destinationPortId: 'wrongPortId',
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return empty schedules for request data with wrong departurePortId and destinationPortId',
    {
      shipData: {
        departurePortId: 'wrongPortId',
        destinationPortId: 'wrongPortId',
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return empty schedules if only correct departurePortId in request',
    {
      shipData: {
        departurePortId: fortLauderdalePort._id.toString(),
        destinationPortId: null,
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return empty schedules if only correct destinationPortId in request',
    {
      shipData: {
        departurePortId: null,
        destinationPortId: fortLauderdalePort._id.toString(),
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: []
      }
    }
  ],
  [
    'should return two shipStops when correct departurePortId and destinationPortId in request',
    {
      shipData: {
        departurePortId: fortLauderdalePort._id.toString(),
        destinationPortId: palmaDeMallorcaPort._id.toString(),
        startDate: null,
        endDate: null
      },
      expectedResult: {
        success: true,
        data: mapShipStopsArrayWithPortAndSailingToFrontend([
          [
            {
              ...REGULAR_SHIP_STOPS_2020[0],
              departurePort: fortLauderdalePort,
              sailing: SAILINGS_2020[0]
            },
            {
              ...REGULAR_SHIP_STOPS_2020[1],
              departurePort: palmaDeMallorcaPort,
              sailing: SAILINGS_2020[0]
            }
          ],
          [
            {
              ...REGULAR_SHIP_STOPS_2020[3],
              departurePort: fortLauderdalePort,
              sailing: SAILINGS_2020[1]
            },
            {
              ...REGULAR_SHIP_STOPS_2020[4],
              departurePort: palmaDeMallorcaPort,
              sailing: SAILINGS_2020[1]
            }
          ]
        ])
      }
    }
  ],
  [
    'should return one shipStop when correct departurePortId, destinationPortId and date in request',
    {
      shipData: {
        departurePortId: fortLauderdalePort._id.toString(),
        destinationPortId: palmaDeMallorcaPort._id.toString(),
        startDate: new Date(),
        endDate: addDays(new Date(), 30)
      },
      expectedResult: {
        success: true,
        data: mapShipStopsArrayWithPortAndSailingToFrontend([
          [
            {
              ...REGULAR_SHIP_STOPS_2020[3],
              departurePort: fortLauderdalePort,
              sailing: SAILINGS_2020[1]
            },
            {
              ...REGULAR_SHIP_STOPS_2020[4],
              departurePort: palmaDeMallorcaPort,
              sailing: SAILINGS_2020[1]
            }
          ]
        ])
      }
    }
  ]
];

describe('getSchedulesAction() action', () => {
  const inMemoryDBRunner = new InMemoryDBRunner();

  beforeAll(async () => {
    await inMemoryDBRunner.connectToInMemoryDBAndLoadTestData();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await inMemoryDBRunner.closeDatabase();
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  it.each(dataWithExpectedResults)('should %s', async (testName: string, roleData: any) => {
    const { shipData, expectedResult } = roleData;

    const result = await getSchedulesAction(shipData);
    expect(result).toEqual(expectedResult);
  });
});
