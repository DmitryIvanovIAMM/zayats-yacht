/**
 * @jest-environment node
 */
import request from 'supertest';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { startNextServer, stopNextServer } from '@/helpers/test-next-server';
import {
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
} from '@/test-data/seedData';

describe('GET /api/ports public API', () => {
  let inMemoryDBRunnerInstance: InMemoryDBRunner;

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

  beforeAll(async () => {
    const { inMemoryDBRunner } = await startNextServer(3000);
    inMemoryDBRunnerInstance = inMemoryDBRunner;
  }, 70000);

  afterAll(async () => {
    await stopNextServer(inMemoryDBRunnerInstance);
  });

  it('returns first page (10 items) without pagination metadata', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/ports')
      .query({ page: 1, limit: 10 });

    expect(res.status).toBe(200);

    const expectedData = orderedPorts.slice(0, 10).map((p) => ({
      _id: p._id.toString(),
      portName: p.portName,
      destinationName: p.destinationName,
      imageFileName: p.imageFileName
    }));

    expect(res.body).toEqual({
      success: true,
      data: expectedData
    });
    expect(res.body.pagination).toBeUndefined();
    expect(res.body.data).toHaveLength(10);
  }, 40000);
});
