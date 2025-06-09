/**
 * @jest-environment node
 */

import { getActiveShipsOptionsAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { industrialShip, tantraShip } from '@/test-data/seedData';

describe('getActiveShipsOptions() action', () => {
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

  it('should return active ships options', async () => {
    const result = await getActiveShipsOptionsAction();

    const ships = [industrialShip, tantraShip];
    const shipsOptions: Record<string, string> = {};
    ships.forEach((ship) => {
      shipsOptions[ship._id.toString()] = ship.name;
    });

    expect(result).toEqual({
      success: true,
      data: shipsOptions
    });
  });
});
