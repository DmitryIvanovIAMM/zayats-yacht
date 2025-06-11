/**
 * @jest-environment node
 */

import { addShipByAdminAction } from '@/app/server-actions/serverActions';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import { customer2, yachtAdmin } from '@/test-data/seedData';
import { ShipForm } from '@/components/AdminDashboard/AdminShips/Ship/types';
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

describe('addShipByAdminAction() action', () => {
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

    const result = await addShipByAdminAction(correctShipData);

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
