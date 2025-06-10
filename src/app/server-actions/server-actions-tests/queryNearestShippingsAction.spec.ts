/**
 * @jest-environment node
 */

import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { queryNearestShippingsAction } from '@/app/server-actions/serverActions';
import { REGULAR_SHIP_STOPS_2020 } from '@/test-data/regularShipStops_2020';
import {
  fethiyePort,
  fortLauderdalePort,
  genoaPort,
  palmaDeMallorcaPort
} from '@/test-data/seedData';
import { SAILINGS_2020 } from '@/test-data/sailings';
import { mapShipStopsArrayWithPortAndSailingToFrontend } from '@/models/mappers';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';

const firstThreeRoutes: ShipStopWithSailingAndPort[][] = [
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
  ],
  [
    {
      ...REGULAR_SHIP_STOPS_2020[4],
      departurePort: palmaDeMallorcaPort,
      sailing: SAILINGS_2020[1]
    },
    {
      ...REGULAR_SHIP_STOPS_2020[5],
      departurePort: genoaPort,
      sailing: SAILINGS_2020[1]
    }
  ],
  [
    {
      ...REGULAR_SHIP_STOPS_2020[5],
      departurePort: genoaPort,
      sailing: SAILINGS_2020[1]
    },
    {
      ...REGULAR_SHIP_STOPS_2020[6],
      departurePort: fethiyePort,
      sailing: SAILINGS_2020[1]
    }
  ]
];

const firstThreeRoutesFrontend = mapShipStopsArrayWithPortAndSailingToFrontend(firstThreeRoutes);

describe('queryNearestShippingsAction()', () => {
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

  it('should return 3 nearest shippings for daye', async () => {
    const result = await queryNearestShippingsAction(new Date());

    expect(result).toEqual({
      success: true,
      data: firstThreeRoutesFrontend
    });
  });

  it('should return the same 3 shippings as for current date if no date accepted', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = await queryNearestShippingsAction(null);

    expect(result).toEqual({
      success: true,
      data: firstThreeRoutesFrontend
    });
  });
});
