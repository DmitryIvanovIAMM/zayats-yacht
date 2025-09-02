/**
 * @jest-environment node
 */
import request, { Test } from 'supertest';
import { startNextServer, stopNextServer } from '@/test-helpers/test-next-server';
import {
  regularShipStopSummerMedFethiye,
  regularShipStopSummerMedFortLauderdale,
  regularShipStopSummerMedGenoa,
  regularShipStopSummerMedPalmaDeMallorca
} from '@/test-data/regularShipStops_2020';
import {
  fethiyePort,
  fortLauderdalePort,
  genoaPort,
  palmaDeMallorcaPort
} from '@/test-data/seedData';
import { summerMediterraneanSailing } from '@/test-data/sailings';
import TestAgent from 'supertest/lib/agent';

describe('GET /api/schedule/nearest public API ', () => {
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

  const toExpectedStop = (stop: any, port: any) =>
    expect.objectContaining({
      _id: stop._id.toString(),
      sailingId: stop.sailingId.toString(),
      portId: stop.portId.toString(),
      shipId: stop.shipId.toString(),
      arrivalOn: expect.any(String),
      departureOn: expect.any(String),
      miles: stop.miles,
      daysAtSea: stop.daysAtSea,
      daysInPort: stop.daysInPort,
      departurePort: expect.objectContaining({
        _id: port._id.toString(),
        portName: port.portName,
        destinationName: port.destinationName,
        imageFileName: port.imageFileName
      }),
      sailing: expect.objectContaining({
        _id: summerMediterraneanSailing._id.toString(),
        name: summerMediterraneanSailing.name,
        isActive: summerMediterraneanSailing.isActive
      })
    });

  it("should returns three nearest shipping's", async () => {
    const response = await agent?.get('/api/schedule/nearest');
    expect(response?.status).toBe(200);

    const segments = [
      // Fort Lauderdale -> Palma
      expect.arrayContaining([
        toExpectedStop(regularShipStopSummerMedFortLauderdale, fortLauderdalePort),
        toExpectedStop(regularShipStopSummerMedPalmaDeMallorca, palmaDeMallorcaPort)
      ]),
      // Palma -> Genoa
      expect.arrayContaining([
        toExpectedStop(regularShipStopSummerMedPalmaDeMallorca, palmaDeMallorcaPort),
        toExpectedStop(regularShipStopSummerMedGenoa, genoaPort)
      ]),
      // Genoa -> Fethiye
      expect.arrayContaining([
        toExpectedStop(regularShipStopSummerMedGenoa, genoaPort),
        toExpectedStop(regularShipStopSummerMedFethiye, fethiyePort)
      ])
    ];

    expect(response?.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining(segments)
      })
    );
  }, 80000);
});
