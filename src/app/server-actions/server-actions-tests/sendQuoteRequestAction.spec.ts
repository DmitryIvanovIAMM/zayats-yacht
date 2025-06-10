/**
 * @jest-environment node
 */

import { customer2 } from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { sendQuoteRequestAction } from '@/app/server-actions/serverActions';
import { defaultQuoteRequest, QuoteRequestForm } from '@/components/QuoteRequest/types';
import { Messages } from '@/helpers/messages';

const expiresOneHourFromNow = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now
const mockGetServerSession = jest.fn(() => ({
  user: {
    name: 'Test User',
    email: 'test@example.com',
    image: 'admin'
  },
  expires: expiresOneHourFromNow
}));

jest.mock('next-auth/next', () => ({
  getServerSession: () => mockGetServerSession()
}));

const mockSesMailTransport = jest.fn(() => Promise.resolve({ messageId: 'test-message-id' }));
// Mock the sesMailTransport to avoid sending real emails
jest.mock('../../../modules/mailer/nodemailer', () => ({
  sesMailTransport: {
    sendMail: () => mockSesMailTransport()
  }
}));

describe('sendQuoteRequestAction()', () => {
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

  it("'should return unauthorized error for non-authenticated user'", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockGetServerSession.mockImplementationOnce(() => null);

    const result = await sendQuoteRequestAction(defaultQuoteRequest);
    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthenticated
    });
  });

  it('should return validation errors', async () => {
    const nonAdminUser = {
      name: customer2.name,
      email: customer2.email,
      image: customer2.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    }));

    const incorrectQuoteReqquest = {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      bestTimeToContact: null,
      purpose: null,
      yachtName: null,
      yachtModel: null,
      insuredValue: -1,
      length: -1,
      lengthUnit: '',
      beam: -1,
      beamUnit: '',
      weight: -1,
      weightUnit: '',
      fromWhere: null,
      toWhere: null,
      when: null,
      notes: null
    };

    const result = await sendQuoteRequestAction(incorrectQuoteReqquest as any as QuoteRequestForm);

    const expectedErrors = {
      firstName: ['First Name is required'],
      lastName: ['Last Name is required'],
      email: ['email is a required field'],
      lengthUnit: ['lengthUnit must be one of the following values: meters, feet'],
      beamUnit: ['beamUnit must be one of the following values: meters, feet'],
      weightUnit: ['weightUnit must be one of the following values: metricTons, lbs']
    };
    expect(result).toEqual({
      success: false,
      message: Messages.ValidationError,
      data: expectedErrors
    });
  });

  it('should send quote request successfully foe user role', async () => {
    const nonAdminUser = {
      name: customer2.name,
      email: customer2.email,
      image: customer2.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    }));

    const correctQuoteRequest: QuoteRequestForm = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@amil.com',
      bestTimeToContact: 'Anytime',
      purpose: 'charter',
      yachtName: 'Sailor',
      yachtModel: 'Sailboat 3000',
      insuredValue: 100000,
      length: 30,
      lengthUnit: 'meters',
      beam: 10,
      beamUnit: 'meters',
      weight: 5,
      weightUnit: 'metricTons',
      fromWhere: 'Miami',
      toWhere: 'Bahamas',
      when: 'Next Month',
      notes: 'Looking forward to the trip!'
    };

    const result = await sendQuoteRequestAction(correctQuoteRequest);

    expect(result).toEqual({
      success: true,
      message: Messages.QuoteRequestSent
    });
  });
});
