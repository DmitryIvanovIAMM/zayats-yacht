/**
 * @jest-environment node
 */

import { customer2, yachtAdmin } from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { deleteScheduleByAdminAction } from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import { SailingModel } from '@/models/Sailing';
import { grandPrixSailingId } from '@/test-data/ids';
import { Types } from 'mongoose';

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

describe('deleteScheduleByAdminAction() action', () => {
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

    const sailingId = 'some-sailing-id';
    const result = await deleteScheduleByAdminAction(sailingId);

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

    const sailingId = 'some-sailing-id';
    const result = await deleteScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should silently return success if sailing not found', async () => {
    // Mock admin session
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const sailingId = new Types.ObjectId().toString(); // Non-existing sailing ID

    const result = await deleteScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: true,
      message: Messages.SailingDeletedSuccessfully
    });
  });

  it('should delete schedule successfully for admin user', async () => {
    const sailingId = grandPrixSailingId._id.toString();
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const sailingBeforeDelete = await SailingModel.findById(new Types.ObjectId(sailingId));
    expect(sailingBeforeDelete.deletedBy).not.toBeDefined();

    const result = await deleteScheduleByAdminAction(sailingId);

    expect(result).toEqual({
      success: true,
      message: Messages.SailingDeletedSuccessfully
    });
    const sailingAfterDelete = await SailingModel.findById(new Types.ObjectId(sailingId));
    expect(sailingAfterDelete.deletedBy).toBeDefined(); // softly delete
  });
});
