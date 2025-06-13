/**
 * @jest-environment node
 */

import {
  customer2,
  fortLauderdalePort,
  palmaDeMallorcaPort,
  tantraShip,
  yachtAdmin
} from '@/test-data/seedData';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import {
  addScheduleByAdminAction,
  deleteScheduleByAdminAction,
  getScheduleByAdminAction,
  setSailingActivityByAdminStatus,
  updateScheduleByAdminAction
} from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import {
  defaultScheduleFormValues,
  ScheduleForm,
  ShipStopForm
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { SailingModel } from '@/models/Sailing';
import { grandPrixSailingId } from '@/test-data/ids';
import { Types } from 'mongoose';

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

const fixedData = new Date('2025-10-13T00:00:00Z');
const twoDaysLater = new Date(fixedData.getTime() + 2 * 24 * 60 * 60 * 1000);
const fourDaysLater = new Date(fixedData.getTime() + 4 * 24 * 60 * 60 * 1000);
const sixDaysLater = new Date(fixedData.getTime() + 6 * 24 * 60 * 60 * 1000);

const firstCorrectShipStop: ShipStopForm = {
  portId: fortLauderdalePort._id.toString(),
  arrivalOn: fixedData,
  departureOn: twoDaysLater,
  miles: 10
};
const secondCorrectShipStop: ShipStopForm = {
  portId: palmaDeMallorcaPort._id.toString(),
  arrivalOn: fourDaysLater,
  departureOn: sixDaysLater,
  miles: 20
};
const correctSailing: ScheduleForm = {
  name: 'Test Sailing',
  shipId: tantraShip._id.toString(),
  shipStops: [firstCorrectShipStop, secondCorrectShipStop]
};

const firstIncorrectShipStop: ShipStopForm = {
  portId: '',
  arrivalOn: '',
  departureOn: '',
  miles: -10 // Invalid negative miles
};
const secondIncorrectShipStop: ShipStopForm = {
  portId: '',
  arrivalOn: '',
  departureOn: '',
  miles: ''
} as any as ShipStopForm;
const incorrectSailing: ScheduleForm = {
  name: '',
  shipId: '',
  shipStops: [firstIncorrectShipStop, secondIncorrectShipStop]
};

describe('admin manages schedules', () => {
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

  describe('getScheduleByAdminAction() action', () => {
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

      const sailingId = grandPrixSailingId.toString();
      const result = await getScheduleByAdminAction(sailingId);

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

      const sailingId = grandPrixSailingId.toString();
      const result = await getScheduleByAdminAction(sailingId);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthorized
      });
    });

    it('should return not found error for non-existing sailing ID', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const nonExistingSailingId = '60c72b2f9b1e8d001c8e4f00'; // Example non-existing ID
      const result = await getScheduleByAdminAction(nonExistingSailingId);

      expect(result).toEqual({
        success: false,
        data: defaultScheduleFormValues,
        message: Messages.SailingNotFound
      });
    });

    it('should return schedule for existing sailing ID', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const sailingId = grandPrixSailingId.toString();
      const result = await getScheduleByAdminAction(sailingId);

      expect(result).toEqual({
        success: true,
        data: expect.objectContaining({
          name: 'Grand Prix Sailing',
          shipId: '41224d776a326fb40f012210',
          shipStops: expect.arrayContaining([
            expect.objectContaining({
              arrivalOn: expect.any(Date),
              departureOn: expect.any(Date),
              miles: 0,
              portId: '41224d776a326fb40f001101'
            }),
            expect.objectContaining({
              arrivalOn: expect.any(Date),
              departureOn: expect.any(Date),
              miles: 4262,
              portId: '41224d776a326fb40f001102'
            }),
            expect.objectContaining({
              arrivalOn: expect.any(Date),
              departureOn: expect.any(Date),
              miles: 441,
              portId: '41224d776a326fb40f001103'
            })
          ])
        })
      });
    });
  });

  describe('addScheduleByAdminAction() action', () => {
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

      const result = await addScheduleByAdminAction(correctSailing);

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

      const result = await addScheduleByAdminAction(correctSailing);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthorized
      });
    });

    it('should return validation errors for invalid sailing data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await addScheduleByAdminAction(incorrectSailing);

      expect(result).toEqual({
        success: false,
        message: Messages.ValidationError,
        data: {
          name: [Messages.SailingNameRequired],
          shipId: [Messages.SelectShip],
          'shipStops[0].portId': [Messages.SelectPort],
          'shipStops[0].arrivalOn': [Messages.DateRequired],
          'shipStops[0].departureOn': [Messages.DateRequired],
          'shipStops[0].miles': [Messages.NonNegativeMiles],
          'shipStops[1].portId': [Messages.SelectPort],
          'shipStops[1].arrivalOn': [Messages.DateRequired],
          'shipStops[1].departureOn': [Messages.DateRequired],
          'shipStops[1].miles': [Messages.MilesRequired]
        }
      });
    });

    it('should add sailing successfully with correct data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const result = await addScheduleByAdminAction(correctSailing);

      expect(result).toEqual({
        success: true,
        message: Messages.ScheduleAddedSuccessfully
      });

      const neeSailing = await SailingModel.findOne({
        name: correctSailing.name
      });
      expect(neeSailing).toBeDefined();
    });
  });

  describe('updateScheduleByAdminAction() action', () => {
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

      const sailingId = grandPrixSailingId._id.toString();
      const result = await updateScheduleByAdminAction(sailingId, correctSailing);

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

      const sailingId = grandPrixSailingId._id.toString();
      const result = await updateScheduleByAdminAction(sailingId, correctSailing);

      expect(result).toEqual({
        success: false,
        message: Messages.NotAuthorized
      });
    });

    it('should return error for incorrect sailing data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const sailingId = grandPrixSailingId._id.toString();
      const result = await updateScheduleByAdminAction(sailingId, incorrectSailing);

      expect(result).toEqual({
        success: false,
        message: Messages.ValidationError,
        data: {
          name: [Messages.SailingNameRequired],
          shipId: [Messages.SelectShip],
          'shipStops[0].portId': [Messages.SelectPort],
          'shipStops[0].arrivalOn': [Messages.DateRequired],
          'shipStops[0].departureOn': [Messages.DateRequired],
          'shipStops[0].miles': [Messages.NonNegativeMiles],
          'shipStops[1].portId': [Messages.SelectPort],
          'shipStops[1].arrivalOn': [Messages.DateRequired],
          'shipStops[1].departureOn': [Messages.DateRequired],
          'shipStops[1].miles': [Messages.MilesRequired]
        }
      });
    });

    it('should silently return success for non-existing sailing ID', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const nonExistingSailingId = new Types.ObjectId().toString();
      const result = await updateScheduleByAdminAction(nonExistingSailingId, correctSailing);

      expect(result).toEqual({
        success: true,
        message: Messages.ScheduleUpdatedSuccessfully
      });
    });

    it('should update sailing with correct data', async () => {
      mockGetServerSession.mockImplementationOnce(() => ({
        user: mockAdminUser,
        expires: expiresOneHourFromNow
      }));

      const sailingId = grandPrixSailingId._id.toString();
      const result = await updateScheduleByAdminAction(sailingId, correctSailing);

      expect(result).toEqual({
        success: true,
        message: Messages.ScheduleUpdatedSuccessfully
      });

      const updatedSailing = await SailingModel.findById(new Types.ObjectId(sailingId));
      expect(updatedSailing).toBeDefined();
      expect(updatedSailing?.name).toBe(correctSailing.name);
    });
  });

  describe('deleteScheduleByAdminAction() action', () => {
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

      const sailingId = 'some-sailing-id';
      const result = await deleteScheduleByAdminAction(sailingId);

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

  describe('setSailingActivityByAdminStatus() action', () => {
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
});
