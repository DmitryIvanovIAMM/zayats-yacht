/**
 * @jest-environment node
 */

import { getPortsInRoutesAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { mapPortsToFrontend } from '@/models/mappers';
import {
  colonPort,
  ensenadaPort,
  fethiyePort,
  fortLauderdalePort,
  genoaPort,
  golfitoPort,
  hongKongPort,
  palmaDeMallorcaPort,
  tortolaPort,
  victoriaPort
} from '@/test-data/seedData';

describe('getPortsInRoutesAction() action', () => {
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

  it('should return list of ports that used in active routes', async () => {
    const result = await getPortsInRoutesAction();
    const usedPorts = [
      fortLauderdalePort,
      palmaDeMallorcaPort,
      genoaPort,
      fethiyePort,
      hongKongPort,
      victoriaPort,
      ensenadaPort,
      golfitoPort,
      tortolaPort,
      colonPort
    ];
    const ports = mapPortsToFrontend(usedPorts);

    expect(result).toEqual({
      success: true,
      data: ports
    });
  });
});
