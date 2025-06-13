/**
 * @jest-environment node
 */

import { customer2, yachtAdmin } from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { getScheduleByAdminAction } from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import { grandPrixSailingId } from '@/test-data/ids';
import { defaultScheduleFormValues } from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';

const mockAdminUser = {
  name: yachtAdmin.name,
  email: yachtAdmin.email,
  image: yachtAdmin.role as string
};

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

describe('getScheduleByAdminAction() action', () => {
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

  it('should return error for non-authenticated user', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockGetServerSession.mockImplementationOnce(() => null);

    const sailingId = grandPrixSailingId.toString();
    const result = await getScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthenticated
    });
  });

  it('should return not authorized error for non-admin user', async () => {
    const nonAdminUser = {
      name: customer2.name,
      email: customer2.email,
      image: customer2.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    }));

    const sailingId = grandPrixSailingId.toString();
    const result = await getScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should return not found error for non-existing sailing ID', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const nonExistingSailingId = '60c72b2f9b1e8d001c8e4f00'; // Example non-existing ID
    const result = await getScheduleByAdminAction(nonExistingSailingId);

    expect(result).toEqual({
      success: false,
      data: defaultScheduleFormValues,
      message: Messages.SailingNotFound
    });
  });

  it('should return schedule for existing sailing ID', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const sailingId = grandPrixSailingId.toString();
    const result = await getScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: true,
      data: expect.objectContaining({
        name: 'Grand Prix Sailing',
        shipId: '41224d776a326fb40f012210',
        shipStops: expect.arrayContaining([
          expect.objectContaining({
            arrivalOn: expect.any(Date),
            departureOn: expect.any(Date),
            miles: 0,
            portId: '41224d776a326fb40f001101'
          }),
          expect.objectContaining({
            arrivalOn: expect.any(Date),
            departureOn: expect.any(Date),
            miles: 4262,
            portId: '41224d776a326fb40f001102'
          }),
          expect.objectContaining({
            arrivalOn: expect.any(Date),
            departureOn: expect.any(Date),
            miles: 441,
            portId: '41224d776a326fb40f001103'
          })
        ])
      })
    });
  });
});
