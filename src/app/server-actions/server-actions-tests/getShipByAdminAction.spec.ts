/**
 * @jest-environment node
 */

import { getShipByAdminAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, industrialShip, yachtAdmin } from '@/test-data/seedData';
import { Messages } from '@/helpers/messages';
import { mapShipToForm } from '@/models/mappers';

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

describe('getShipByAdminAction() action', () => {
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

    const shipId = industrialShip._id.toString();
    const result = await getShipByAdminAction(shipId);

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

    const shipId = industrialShip._id.toString();
    const result = await getShipByAdminAction(shipId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should return error for admin user and non-existed shipId', () => {
    const wrongShipId = '60c72b2f9b1d4c001c8e4e3f'; // Example of a non-existent ship ID

    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    return getShipByAdminAction(wrongShipId).then((result) => {
      expect(result).toEqual({
        success: false,
        message: Messages.ShipNotFound,
        data: null
      });
    });
  });

  it('should return ship data for correct shipId and admin user', async () => {
    const shipId = industrialShip._id.toString();

    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await getShipByAdminAction(shipId);

    const successResult = {
      success: true,
      data: mapShipToForm(industrialShip)
    };

    expect(result).toEqual(successResult);
  });
});
