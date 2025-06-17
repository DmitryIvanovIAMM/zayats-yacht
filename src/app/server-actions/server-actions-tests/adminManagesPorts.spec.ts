/**
 * @jest-environment node
 */

import { customer2, fortLauderdalePort, yachtAdmin } from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import {
  addPortByAdminAction,
  deletePortByAdminAction,
  getPortByAdminAction,
  updatePortByAdminAction
} from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import { Types } from 'mongoose';
import { mapPortToForm } from '@/models/mappers';
import { PortModel } from '@/models/Port';
import { DEFAULT_PORT_IMAGE } from '@/utils/formHelpers/formHelpers';

const mockAdminUser = {
  name: yachtAdmin.name,
  email: yachtAdmin.email,
  image: yachtAdmin.role as string
};
const nonAdminUser = {
  name: customer2.name,
  email: customer2.email,
  image: customer2.role as string
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

const correctPortDataForUpdate: FormData = new FormData();
correctPortDataForUpdate.append('portName', 'Updated Port');
correctPortDataForUpdate.append('destinationName', 'Updated Destination');
correctPortDataForUpdate.append('imageFileName', '');

// mock storeFileOnS3WithModifiedName() function to avoid actual S3 calls
const mockStoreFileOnS3WithModifiedName = jest.fn(() => Promise.resolve('mocked-image-file-name'));
jest.mock('../../../modules/aws/s3', () => ({
  ...(jest.requireActual('../../../modules/aws/s3') as any),
  storeFileOnS3WithModifiedName: jest.fn(() => mockStoreFileOnS3WithModifiedName()),
  deleteFile: jest.fn(() => Promise.resolve())
}));

describe('admin manages ports', () => {
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

  describe('getPortByAdminAction() action', () => {
    beforeAll(async () => {
      await inMemoryDBRunner.reloadTestData();
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return error for non-authenticated user', async () => {
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

    it('should return not authorized error for non-admin user', async () => {
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
  });

  describe('addPortByAdminAction() action', () => {
    beforeAll(async () => {
      await inMemoryDBRunner.reloadTestData();
    });

    beforeEach(() => {
      jest.clearAllMocks();
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

  describe('updatePortByAdminAction() action', () => {
    const portId = fortLauderdalePort._id.toString();

    beforeAll(async () => {
      await inMemoryDBRunner.reloadTestData();
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return error for non-authenticated user', async () => {
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

      const result = await updatePortByAdminAction(
        new Types.ObjectId().toString(),
        correctPortData
      );
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

      const result = await updatePortByAdminAction(portId, correctPortDataForUpdate);

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

      const portFormData = new FormData();
      portFormData.append('portName', 'Updated Port with Image');
      portFormData.append('destinationName', 'Updated Destination with Image');
      portFormData.append(
        'port-image',
        new Blob(['mocked-image-content'], { type: 'image/png' }),
        'mocked-image.png'
      );

      const result = await updatePortByAdminAction(portId, portFormData);

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

  describe('deletePortByAdminAction() action', () => {
    const portId = fortLauderdalePort._id.toString();

    beforeAll(async () => {
      await inMemoryDBRunner.reloadTestData();
    });

    beforeEach(() => {
      jest.clearAllMocks();
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
});
