/**
 * @jest-environment node
 */

import { customer2, yachtAdmin } from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { setSailingActivityByAdminStatus } from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import { grandPrixSailingId } from '@/test-data/ids';
import { SailingModel } from '@/models/Sailing';

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

describe('setSailingActivityByAdminStatus() action', () => {
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

  it('should return unauthorized error for non-authenticated user', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockGetServerSession.mockImplementationOnce(() => null);

    const result = await setSailingActivityByAdminStatus({
      sailingId: 'some-sailing-id',
      isActive: true
    });
    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthenticated
    });
  });

  it('should return unauthorized error for non-admin user', async () => {
    const nonAdminUser = {
      name: customer2.name,
      email: customer2.email,
      image: customer2.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await setSailingActivityByAdminStatus({
      sailingId: 'some-sailing-id',
      isActive: true
    });
    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should return error for wrong sailingUd', async () => {
    const adminUser = {
      name: yachtAdmin.name,
      email: yachtAdmin.email,
      image: yachtAdmin.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: adminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await setSailingActivityByAdminStatus({
      sailingId: 'some-sailing-id',
      isActive: true
    });

    expect(result).toEqual({
      success: false,
      message: 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer'
    });
  });

  it('should return silently return success non-existed sailingUd', async () => {
    const adminUser = {
      name: yachtAdmin.name,
      email: yachtAdmin.email,
      image: yachtAdmin.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: adminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await setSailingActivityByAdminStatus({
      sailingId: '60c72b2f9b1e8d001c8e4f5a', // Example non-existing sailing ID
      isActive: true
    });

    expect(result).toEqual({
      success: true,
      message: Messages.SailingStatusChangedSuccessfully
    });
  });

  it('should update sailing activity status by admin', async () => {
    const sailing = await SailingModel.findById(grandPrixSailingId);
    expect(sailing.isActive).toBe(true);

    const adminUser = {
      name: yachtAdmin.name,
      email: yachtAdmin.email,
      image: yachtAdmin.role as string
    };
    mockGetServerSession.mockImplementationOnce(() => ({
      user: adminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await setSailingActivityByAdminStatus({
      sailingId: grandPrixSailingId.toString(),
      isActive: false
    });

    expect(result).toEqual({
      success: true,
      message: Messages.SailingStatusChangedSuccessfully
    });

    const updatedSailing = await SailingModel.findById(grandPrixSailingId);
    expect(updatedSailing.isActive).toBe(false);
  });
});
