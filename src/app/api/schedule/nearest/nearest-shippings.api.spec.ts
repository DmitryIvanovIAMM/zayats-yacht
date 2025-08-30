/**
 * @jest-environment node
 */
import request from 'supertest';
import { startNextServer, stopNextServer } from '@/helpers/test-next-server';
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

describe('GET /api/schedule/nearest public API ', () => {
  let serverUrl: string;

  beforeAll(async () => {
    const { url } = await startNextServer();
    serverUrl = url;
  }, 70000);

  afterAll(async () => {
    await stopNextServer();
  });

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
    const res = await request(serverUrl).get('/api/schedule/nearest');
    expect(res.status).toBe(200);

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

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining(segments)
      })
    );
  }, 40000);
});
