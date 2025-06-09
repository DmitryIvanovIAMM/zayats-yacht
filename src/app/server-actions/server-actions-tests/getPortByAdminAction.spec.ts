/**
 * @jest-environment node
 */

import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { getPortByAdminAction } from '@/app/server-actions/serverActions';
import { customer2, fortLauderdalePort, yachtAdmin } from '@/test-data/seedData';
import { mapPortToForm } from '@/models/mappers';
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

describe('getPortByAdminAction() action', () => {
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

    const portId = fortLauderdalePort._id.toString();
    const result = await getPortByAdminAction(portId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthenticated
    });
  });

  it('should return port data for for correct portId and admin user', async () => {
    const portId = fortLauderdalePort._id.toString();

    mockGetServerSession.mockImplementationOnce(() => {
      return { user: mockAdminUser, expires: expiresOneHourFromNow };
    });

    const result = await getPortByAdminAction(portId);

    const successResult = {
      success: true,
      data: mapPortToForm(fortLauderdalePort)
    };

    expect(result).toEqual(successResult);
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
    const portId = fortLauderdalePort._id.toString();
    const result = await getPortByAdminAction(portId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should return not found error for non-existing port ID', async () => {
    const nonExistingPortId = '60c72b2f9b1e8d001c8e4f5a'; // Example non-existing port ID

    mockGetServerSession.mockImplementationOnce(() => {
      return { user: mockAdminUser, expires: expiresOneHourFromNow };
    });

    const result = await getPortByAdminAction(nonExistingPortId);

    expect(result).toEqual({
      success: false,
      message: Messages.PortNotFound,
      data: null
    });
  });
});
