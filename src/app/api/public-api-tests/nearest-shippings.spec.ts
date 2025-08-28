/**
 * @jest-environment node
 */
import request from 'supertest';
import { startNextServer, stopNextServer } from '@/app/api/public-api-tests/next-server';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
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

describe('API /api/schedule/nearest', () => {
  let inMemoryDBRunnerInstance: InMemoryDBRunner;
  beforeAll(async () => {
    const { inMemoryDBRunner } = await startNextServer(3000);
    inMemoryDBRunnerInstance = inMemoryDBRunner;
  }, 70000);

  afterAll(async () => {
    await stopNextServer(inMemoryDBRunnerInstance);
  });

  it('returns 200', async () => {
    const response = await request('http://localhost:3000').get('/api/schedule/nearest');
    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({
              _id: regularShipStopSummerMedFortLauderdale._id.toHexString(),
              sailingId: regularShipStopSummerMedFortLauderdale.sailingId.toString(),
              portId: regularShipStopSummerMedFortLauderdale.portId.toString(),
              shipId: regularShipStopSummerMedFortLauderdale.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedFortLauderdale.miles,
              daysAtSea: regularShipStopSummerMedFortLauderdale.daysAtSea,
              daysInPort: regularShipStopSummerMedFortLauderdale.daysInPort,
              departurePort: expect.objectContaining({
                _id: fortLauderdalePort._id.toString(),
                portName: fortLauderdalePort.portName,
                destinationName: fortLauderdalePort.destinationName,
                imageFileName: fortLauderdalePort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            }),
            expect.objectContaining({
              _id: regularShipStopSummerMedPalmaDeMallorca._id.toString(),
              sailingId: regularShipStopSummerMedPalmaDeMallorca.sailingId.toString(),
              portId: regularShipStopSummerMedPalmaDeMallorca.portId.toString(),
              shipId: regularShipStopSummerMedPalmaDeMallorca.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedPalmaDeMallorca.miles,
              daysAtSea: regularShipStopSummerMedPalmaDeMallorca.daysAtSea,
              daysInPort: regularShipStopSummerMedPalmaDeMallorca.daysInPort,
              departurePort: expect.objectContaining({
                _id: palmaDeMallorcaPort._id.toString(),
                portName: palmaDeMallorcaPort.portName,
                destinationName: palmaDeMallorcaPort.destinationName,
                imageFileName: palmaDeMallorcaPort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            })
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              _id: regularShipStopSummerMedPalmaDeMallorca._id.toString(),
              sailingId: regularShipStopSummerMedPalmaDeMallorca.sailingId.toString(),
              portId: regularShipStopSummerMedPalmaDeMallorca.portId.toString(),
              shipId: regularShipStopSummerMedPalmaDeMallorca.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedPalmaDeMallorca.miles,
              daysAtSea: regularShipStopSummerMedPalmaDeMallorca.daysAtSea,
              daysInPort: regularShipStopSummerMedPalmaDeMallorca.daysInPort,
              departurePort: expect.objectContaining({
                _id: palmaDeMallorcaPort._id.toString(),
                portName: palmaDeMallorcaPort.portName,
                destinationName: palmaDeMallorcaPort.destinationName,
                imageFileName: palmaDeMallorcaPort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            }),
            expect.objectContaining({
              _id: regularShipStopSummerMedGenoa._id.toString(),
              sailingId: regularShipStopSummerMedGenoa.sailingId.toString(),
              portId: regularShipStopSummerMedGenoa.portId.toString(),
              shipId: regularShipStopSummerMedGenoa.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedGenoa.miles,
              daysAtSea: regularShipStopSummerMedGenoa.daysAtSea,
              daysInPort: regularShipStopSummerMedGenoa.daysInPort,
              departurePort: expect.objectContaining({
                _id: genoaPort._id.toString(),
                portName: genoaPort.portName,
                destinationName: genoaPort.destinationName,
                imageFileName: genoaPort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            })
          ]),
          expect.arrayContaining([
            expect.objectContaining({
              _id: regularShipStopSummerMedGenoa._id.toString(),
              sailingId: regularShipStopSummerMedGenoa.sailingId.toString(),
              portId: regularShipStopSummerMedGenoa.portId.toString(),
              shipId: regularShipStopSummerMedGenoa.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedGenoa.miles,
              daysAtSea: regularShipStopSummerMedGenoa.daysAtSea,
              daysInPort: regularShipStopSummerMedGenoa.daysInPort,
              departurePort: expect.objectContaining({
                _id: genoaPort._id.toString(),
                portName: genoaPort.portName,
                destinationName: genoaPort.destinationName,
                imageFileName: genoaPort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            }),
            expect.objectContaining({
              _id: regularShipStopSummerMedFethiye._id.toString(),
              sailingId: regularShipStopSummerMedFethiye.sailingId.toString(),
              portId: regularShipStopSummerMedFethiye.portId.toString(),
              shipId: regularShipStopSummerMedFethiye.shipId.toString(),
              arrivalOn: expect.any(String),
              departureOn: expect.any(String),
              miles: regularShipStopSummerMedFethiye.miles,
              daysAtSea: regularShipStopSummerMedFethiye.daysAtSea,
              daysInPort: regularShipStopSummerMedFethiye.daysInPort,
              departurePort: expect.objectContaining({
                _id: fethiyePort._id.toString(),
                portName: fethiyePort.portName,
                destinationName: fethiyePort.destinationName,
                imageFileName: fethiyePort.imageFileName
              }),
              sailing: expect.objectContaining({
                _id: summerMediterraneanSailing._id.toString(),
                name: summerMediterraneanSailing.name,
                isActive: summerMediterraneanSailing.isActive
              })
            })
          ])
        ])
      })
    );
  }, 40000);
});
