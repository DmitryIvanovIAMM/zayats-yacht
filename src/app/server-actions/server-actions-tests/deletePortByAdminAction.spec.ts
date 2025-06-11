/**
 * @jest-environment node
 */

import { deletePortByAdminAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, fortLauderdalePort, yachtAdmin } from '@/test-data/seedData';
import { Messages } from '@/helpers/messages';
import { PortModel } from '@/models/Port';
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

const portId = fortLauderdalePort._id.toString();

describe('deletePortByAdminAction() action', () => {
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

    const result = await deletePortByAdminAction(portId);

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

    const result = await deletePortByAdminAction(portId);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should silently return success for non-existing port', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));
    const nonExistingPortId = new Types.ObjectId().toString();

    const result = await deletePortByAdminAction(nonExistingPortId);

    expect(result).toEqual({
      success: true,
      message: Messages.PortDeletedSuccessfully
    });
  });

  it('should delete port successfully', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const port = await PortModel.findById(new Types.ObjectId(portId));
    expect(port).toBeDefined();
    expect(port?.deletedAt).not.toBeDefined();

    const result = await deletePortByAdminAction(portId);

    expect(result).toEqual({
      success: true,
      message: Messages.PortDeletedSuccessfully
    });

    const deletedPort = await PortModel.findById(portId);
    expect(deletedPort).toBeDefined();
    expect(deletedPort?.deletedAt).toBeDefined();
  });
});
