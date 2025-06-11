/**
 * @jest-environment node
 */

import { updatePortByAdminAction } from '@/app/server-actions/serverActions';
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

const correctPortData: FormData = new FormData();
correctPortData.append('portName', 'Updated Port');
correctPortData.append('destinationName', 'Updated Destination');
correctPortData.append('imageFileName', ''); // No image file provided

const incorrectPortData: FormData = new FormData();
incorrectPortData.append('portName', '');
incorrectPortData.append('destinationName', '');
incorrectPortData.append('imageFileName', ''); // No image file provided

// mock storeFileOnS3WithModifiedName() function to avoid actual S3 calls
const mockStoreFileOnS3WithModifiedName = jest.fn(() => Promise.resolve('mocked-image-file-name'));
jest.mock('../../../modules/aws/s3', () => ({
  ...(jest.requireActual('../../../modules/aws/s3') as any),
  storeFileOnS3WithModifiedName: jest.fn(() => mockStoreFileOnS3WithModifiedName()),
  deleteFile: jest.fn(() => Promise.resolve())
}));

const portId = fortLauderdalePort._id.toString();

describe('updatePortByAdminAction() action', () => {
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

    const result = await updatePortByAdminAction(portId, correctPortData);

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
    mockGetServerSession.mockReturnValueOnce({
      user: nonAdminUser,
      expires: expiresOneHourFromNow
    });

    const result = await updatePortByAdminAction(portId, correctPortData);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should silently return success if port with given ID does not exist', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await updatePortByAdminAction(new Types.ObjectId().toString(), correctPortData);
    expect(result).toEqual({
      success: true,
      message: Messages.PortUpdatedSuccessfully
    });
  });

  it('should update port successfully with correct data without image', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const existingPort = await PortModel.findById(new Types.ObjectId(portId));
    const previousImageName = existingPort?.imageFileName;
    expect(previousImageName).toBeDefined();

    const result = await updatePortByAdminAction(portId, correctPortData);

    expect(result).toEqual({
      success: true,
      message: Messages.PortUpdatedSuccessfully
    });

    const updatedPort = await PortModel.findById(existingPort?._id);
    expect(updatedPort?.portName).toBe('Updated Port');
    expect(updatedPort?.destinationName).toBe('Updated Destination');
    expect(updatedPort?.imageFileName).toBe(previousImageName); // when o blob with new image is not provided, the previous image file name should remain unchanged
  });

  it('should update port successfully with correct data and image', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const newPortData = new FormData();
    newPortData.append('portName', 'Updated Port with Image');
    newPortData.append('destinationName', 'Updated Destination with Image');
    newPortData.append(
      'port-image',
      new Blob(['mocked-image-content'], { type: 'image/png' }),
      'mocked-image.png'
    );

    const result = await updatePortByAdminAction(portId, newPortData);

    expect(result).toEqual({
      success: true,
      message: Messages.PortUpdatedSuccessfully
    });

    const updatedPort = await PortModel.findById(new Types.ObjectId(portId));
    expect(updatedPort?.portName).toBe('Updated Port with Image');
    expect(updatedPort?.destinationName).toBe('Updated Destination with Image');
    expect(updatedPort?.imageFileName).toContain('mocked-image-file-name'); // Mocked image file name
  });
});
