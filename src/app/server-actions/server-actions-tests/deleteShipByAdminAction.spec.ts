/**
 * @jest-environment node
 */

import { Types } from 'mongoose';
import { deleteShipByAdminAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, yachtAdmin, industrialShip } from '@/test-data/seedData';
import { Messages } from '@/helpers/messages';

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

const shipId = industrialShip._id.toString();

describe('deleteShipByAdminAction() action', () => {
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

  it('should return not authenticated error for non-authenticated user', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mockGetServerSession.mockImplementationOnce(() => null);

    const result = await deleteShipByAdminAction(shipId);

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
    mockGetServerSession.mockReturnValueOnce({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    });

    const result = await deleteShipByAdminAction(new Types.ObjectId().toString());

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should silently return success if ship not found', async () => {
    const shipId = new Types.ObjectId().toString(); // Non-existing ship ID
    mockGetServerSession.mockReturnValueOnce({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    });

    const result = await deleteShipByAdminAction(shipId);

    expect(result).toEqual({
      success: true,
      message: Messages.ShipDeletedSuccessfully
    });
  });

  it('should delete ship successfully for admin user', async () => {
    mockGetServerSession.mockReturnValueOnce({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    });

    const result = await deleteShipByAdminAction(shipId);

    expect(result).toEqual({
      success: true,
      message: Messages.ShipDeletedSuccessfully
    });
  });
});
