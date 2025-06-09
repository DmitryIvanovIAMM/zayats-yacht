/**
 * @jest-environment node
 */

import { getActivePortsOptionsAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import {
  colonPort,
  ensenadaPort,
  fethiyePort,
  fortLauderdalePort,
  genoaPort,
  golfitoPort,
  hongKongPort,
  laPazPort,
  palmaDeMallorcaPort,
  palmBeachPort,
  tortolaPort,
  victoriaPort
} from '@/test-data/seedData';

describe('getActivePortsOptionsAction() action', () => {
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

  it('should return active ports options', async () => {
    const result = await getActivePortsOptionsAction();

    const ports = [
      fortLauderdalePort,
      palmaDeMallorcaPort,
      genoaPort,
      fethiyePort,
      hongKongPort,
      victoriaPort,
      ensenadaPort,
      golfitoPort,
      tortolaPort,
      colonPort,
      palmBeachPort,
      laPazPort
    ];
    const portsOptions: Record<string, string> = {};
    ports.forEach((port) => {
      portsOptions[port._id.toString()] = port.portName;
    });

    expect(result).toEqual({
      success: true,
      data: portsOptions
    });
  });
});
