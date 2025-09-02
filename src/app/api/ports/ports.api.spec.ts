/**
 * @jest-environment node
 */
import { startNextServer, stopNextServer } from '@/test-helpers/test-next-server';
import request, { Test } from 'supertest';
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
import TestAgent from 'supertest/lib/agent';

describe('GET /api/ports public API', () => {
  let agent: TestAgent<Test> | null = null;
  let selfTestServerControl = false;

  beforeAll(async () => {
    if (!global.__NEXT_SERVER__) {
      selfTestServerControl = true;
      const { url, port, proc, inMemoryDBRunner } = await startNextServer();
      global.__NEXT_SERVER__ = { url, port, proc, inMemoryDBRunner };
    }
    const { url } = global.__NEXT_SERVER__;
    agent = request(url);
  }, 70000);

  afterAll(async () => {
    if (selfTestServerControl) await stopNextServer();
  }, 20000);

  const orderedPorts = [
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

  it('returns first ten ports', async () => {
    const response = await agent?.get('/api/ports');

    expect(response?.status).toBe(200);

    const expectedData = orderedPorts.slice(0, 10).map((p) => ({
      _id: p._id.toString(),
      portName: p.portName,
      destinationName: p.destinationName,
      imageFileName: p.imageFileName
    }));

    expect(response?.body).toEqual({
      success: true,
      data: expectedData
    });
    expect(response?.body.pagination).toBeUndefined();
    expect(response?.body.data).toHaveLength(10);
  }, 80000);
});
