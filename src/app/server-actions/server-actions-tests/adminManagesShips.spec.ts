/**
 * @jest-environment node
 */

import {
  addShipByAdminAction,
  deleteShipByAdminAction,
  getShipByAdminAction,
  updateShipByAdminAction
} from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, industrialShip, yachtAdmin } from '@/test-data/seedData';
import { ShipForm } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { Messages } from '@/helpers/messages';
import { mapShipToForm } from '@/models/mappers';
import { Types } from 'mongoose';
import { ShipModel } from '@/models/Ship';

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

const correctShipData: ShipForm = {
  name: 'New Ship',
  type: 'Cargo',
  builder: 'Ship Builder Inc.',
  flag: 'USA',
  homePort: 'Miami',
  class: 'Lloyds Register',
  imoNo: '1234567',
  callSign: 'ABC123'
};

const incorrectShipData: ShipForm = {
  name: '',
  type: '',
  builder: '',
  flag: '',
  homePort: '',
  class: '',
  imoNo: '',
  callSign: ''
};

describe('admin manages ships - addShipByAdminAction', () => {
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

  describe('getShipByAdminAction() action', () => {
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

      const shipId = industrialShip._id.toString();
      const result = await getShipByAdminAction(shipId);

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

  describe('addShipByAdminAction() action', () => {
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

      const result = await addShipByAdminAction(correctShipData);

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

      const result = await addShipByAdminAction(correctShipData);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthorized
      });
    });

    it('should return validation error for incorrect ship data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await addShipByAdminAction(incorrectShipData);

      const expectedErrors = {
        name: ['Name is required'],
        type: ['Type is required'],
        builder: ['Builder is required'],
        flag: ['Flag is required'],
        homePort: ['Home Port is required'],
        class: ['Class is required'],
        imoNo: ['IMO No is required'],
        callSign: ['Call Sign is required']
      };
      expect(result).toEqual({
        success: false,
        message: Messages.ValidationError,
        data: expectedErrors
      });
    });

    it('should successfully add a new ship for admin user', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await addShipByAdminAction(correctShipData);

      expect(result).toEqual({
        success: true,
        message: Messages.ShipAddedSuccessfully
      });
    });
  });

  describe('updateShipByAdminAction() action', () => {
    const shipId = industrialShip._id.toString();

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

      const result = await updateShipByAdminAction(shipId, correctShipData);

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

      const result = await updateShipByAdminAction(shipId, correctShipData);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthorized
      });
    });

    it('should return validation errors for incorrect ship data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await updateShipByAdminAction(shipId, incorrectShipData);

      const expectedErrors = {
        name: ['Name is required'],
        type: ['Type is required'],
        builder: ['Builder is required'],
        flag: ['Flag is required'],
        homePort: ['Home Port is required'],
        class: ['Class is required'],
        imoNo: ['IMO No is required'],
        callSign: ['Call Sign is required']
      };

      expect(result).toEqual({
        success: false,
        message: Messages.ValidationError,
        data: expectedErrors
      });
    });

    it('should successfully update ship with correct data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await updateShipByAdminAction(shipId, correctShipData);

      expect(result).toEqual({
        success: true,
        message: Messages.ShipUpdatedSuccessfully
      });
      const updatedShip = await ShipModel.findById(new Types.ObjectId(shipId));
      expect(updatedShip.name).toBe(correctShipData.name);
    });
  });

  describe('deleteShipByAdminAction() action', () => {
    const shipId = industrialShip._id.toString();

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

      const result = await deleteShipByAdminAction(shipId);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthenticated
      });
    });

    it('should return not authorized error for non-admin user', async () => {
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
});
