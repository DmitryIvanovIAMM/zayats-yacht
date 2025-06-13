/**
 * @jest-environment node
 */

import { addPortByAdminAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, yachtAdmin } from '@/test-data/seedData';
import { Messages } from '@/helpers/messages';
import { PortModel } from '@/models/Port';
import { DEFAULT_PORT_IMAGE } from '@/utils/formHelpers/formHelpers';

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
correctPortData.append('portName', 'New Port');
correctPortData.append('destinationName', 'New Destination');
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

describe('addPortByAdminAction() action', () => {
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

    const result = await addPortByAdminAction(correctPortData);
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

    const result = await addPortByAdminAction(correctPortData);

    expect(result).toEqual({
      success: false,
      message: Messages.NotAuthorized
    });
  });

  it('should return validation errors', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await addPortByAdminAction(incorrectPortData);
    expect(result).toEqual({
      success: false,
      message:
        'Port validation failed: portName: Path `portName` is required., destinationName: Path `destinationName` is required.'
    });
  });

  it('should successfully add a new port without image file by admin', async () => {
    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await addPortByAdminAction(correctPortData);
    expect(result).toEqual({
      success: true,
      message: Messages.PortAddedSuccessfully
    });

    const newPort = await PortModel.find({ portName: 'New Port' });
    expect(newPort[0]?.portName).toBe('New Port');
    expect(newPort[0]?.destinationName).toBe('New Destination');
    expect(newPort[0]?.imageFileName).toBe(DEFAULT_PORT_IMAGE);
  });

  it('should successfully add a new port with image file by admin', async () => {
    const portWithImageData: FormData = new FormData();
    portWithImageData.append('portName', 'Port with Image');
    portWithImageData.append('destinationName', 'Destination with Image');
    portWithImageData.append(
      'port-image',
      new Blob(['test image content'], { type: 'image/png' }),
      'test-image.png'
    );

    mockGetServerSession.mockImplementationOnce(() => ({
      user: mockAdminUser,
      expires: expiresOneHourFromNow
    }));

    const result = await addPortByAdminAction(portWithImageData);
    expect(result).toEqual({
      success: true,
      message: Messages.PortAddedSuccessfully
    });

    const newPort = await PortModel.find({ portName: 'Port with Image' });
    expect(newPort[0]?.portName).toBe('Port with Image');
    expect(newPort[0]?.destinationName).toBe('Destination with Image');
    expect(newPort[0]?.imageFileName).toContain('mocked-image-file-name');
  });
});
