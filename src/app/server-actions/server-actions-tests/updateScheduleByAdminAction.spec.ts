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
import { updateScheduleByAdminAction } from '@/app/server-actions/serverActions';
import { Messages } from '@/helpers/messages';
import {
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

describe('updateScheduleByAdminAction() action', () => {
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

    const sailingId = grandPrixSailingId._id.toString();
    const result = await updateScheduleByAdminAction(sailingId, correctSailing);

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
