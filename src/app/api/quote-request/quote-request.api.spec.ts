/**
 * @jest-environment node
 */
import request, { Test } from 'supertest';
import { LENGTH_METRIC, QuoteRequestForm } from '@/components/QuoteRequest/types';
import { Messages } from '@/helpers/messages';
import { defaultPassword, yachtAdmin } from '@/test-data/seedData';
import { getAuthCookie } from '@/test-helpers/auth-test';
import TestAgent from 'supertest/lib/agent';
import { startNextServer, stopNextServer } from '@/test-helpers/test-next-server';

describe('POST /api/quote-request public API', () => {
  let agent: TestAgent<Test> | null = null;
  let selfTestServerControl = false; // let server: Awaited<ReturnType<typeof startNextServer>>;

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

  const correctQuoteRequest: QuoteRequestForm = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    email: 'test.john.doe.ema@gmail.com',
    bestTimeToContact: 'Afternoon',
    purpose: 'charter',
    yachtName: 'Sea Breeze',
    yachtModel: 'Model X',
    insuredValue: 500000,
    length: 30,
    lengthUnit: LENGTH_METRIC.meters,
    beam: 8,
    beamUnit: LENGTH_METRIC.meters,
    weight: 20,
    weightUnit: 'metricTons',
    fromWhere: 'Miami',
    toWhere: 'Bahamas',
    when: '2024-12-01',
    notes: 'Handle with care'
  };

  const postAuthenticatedQuoteRequest = async (
    quoteRequestData: QuoteRequestForm,
    login: string = yachtAdmin.email,
    password: string = defaultPassword
  ) => {
    const authCookie = await getAuthCookie(agent as TestAgent<Test>, login, password);
    return agent
      ?.post('/api/quote-request')
      .send(quoteRequestData)
      .set('Cookie', authCookie as string);
  };

  it('should return unauthenticated for non-logged user', async () => {
    const response = await agent?.post('/api/quote-request').send(correctQuoteRequest);

    expect(response?.status).toBe(200);
    expect(response?.body).toEqual(
      expect.objectContaining({
        success: false,
        message: Messages.NotAuthenticated
      })
    );
  }, 40000);

  it('should return validation errors for wrong data', async () => {
    const wrongQuoteRequest = {
      firstName: '',
      lastName: false,
      phoneNumber: '',
      email: 'test.john.doe.email.gmail.com',
      bestTimeToContact: 4,
      purpose: true,
      yachtName: false,
      yachtModel: '',
      insuredValue: -500000,
      length: -30,
      lengthUnit: 'km',
      beam: -8,
      beamUnit: 'kg',
      weight: -20,
      weightUnit: 'tons',
      fromWhere: false,
      toWhere: true,
      when: '2024-12',
      notes: 50
    };

    const response = await postAuthenticatedQuoteRequest(
      wrongQuoteRequest as any as QuoteRequestForm
    );

    expect(response?.status).toBe(200);
    expect(response?.body).toEqual(
      expect.objectContaining({
        success: false,
        message: Messages.ValidationError,
        data: expect.objectContaining({
          firstName: ['First Name is required'],
          phoneNumber: ['Phone is required'],
          email: ['Must be valid email'],
          purpose: [
            'purpose must be one of the following values: boatShow, charter, purchaseSale, yardWork, fishingTournament, regatta, other, '
          ],
          lengthUnit: ['lengthUnit must be one of the following values: meters, feet'],
          beamUnit: ['beamUnit must be one of the following values: meters, feet'],
          weightUnit: ['weightUnit must be one of the following values: metricTons, lbs']
        })
      })
    );
  }, 80000);

  it('should accept quote request with correct data', async () => {
    const response = await postAuthenticatedQuoteRequest(correctQuoteRequest);

    expect(response?.status).toBe(200);
    expect(response?.body).toEqual(
      expect.objectContaining({
        success: true,
        message: Messages.QuoteRequestSent
      })
    );
  }, 80000);
});
