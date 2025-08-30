/**
 * @jest-environment node
 */
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
import request from 'supertest';

describe('GET /api/ports public API', () => {
  let serverUrl: string;

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
    const { url } = await startNextServer();
    serverUrl = url;
  }, 70000);

  afterAll(async () => {
    await stopNextServer();
  });

  it('returns first ten ports', async () => {
    const res = await request(serverUrl).get('/api/ports');

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
    expect(res?.body.pagination).toBeUndefined();
    expect(res?.body.data).toHaveLength(10);
  }, 40000);
});
