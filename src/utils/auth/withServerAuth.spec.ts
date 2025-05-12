/**
 * @jest-environment node
 */
// define the test environment as node as the withServerAuth function is used in a server action
// https://jestjs.io/docs/configuration#testenvironment-stringhttps://jestjs.io/docs/configuration#testenvironment-string
import { getServerSession } from 'next-auth';
import { withServerAuth } from '@/utils/auth/withServerAuth';
import { Messages } from '@/helpers/messages';
import { Roles } from '@/utils/types';

const adminUser = {
  role: 'admin',
  email: 'yacht.admin@gmail.com',
  name: 'Yacht Admin'
};
const mockFindUserByEmail = jest.fn().mockReturnValue(adminUser);
jest.mock('next-auth');
jest.mock('../../controllers/AuthController', () => ({
  ...(jest.requireActual('../../controllers/AuthController') as any),
  findUserByEmail: () => mockFindUserByEmail()
}));

describe('withServerAuth() helper ', () => {
  const mockServerAction = jest.fn();
  const mockProps = { test: 'test' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return NotAuthenticated if session is null', async () => {
    // https://github.com/nextauthjs/next-auth/discussions/4185
    (getServerSession as jest.Mock).mockReturnValue(null);
    const result = await withServerAuth([Roles.Admin], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: Messages.NotAuthenticated });
  });

  it('should return NotAuthorized if user does not have access', async () => {
    (getServerSession as jest.Mock).mockReturnValue({
      user: { image: 'admin', email: 'yacht.admin@gmail.com' }
    });
    const result = await withServerAuth([Roles.User], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: Messages.NotAuthorized });
  });

  it('should call server action and return its result', async () => {
    (getServerSession as jest.Mock).mockReturnValue({
      user: { image: 'admin', email: 'yacht.admin@gmail.com' }
    });
    mockServerAction.mockResolvedValue({ success: true, data: 'test' });
    const result = await withServerAuth([Roles.Admin], mockServerAction, mockProps);
    expect(result).toEqual({ success: true, data: 'test' });
    expect(mockServerAction).toHaveBeenCalledWith(adminUser, mockProps);
  });

  it('should return NotAuthorized if user DB has wrong role', async () => {
    (getServerSession as jest.Mock).mockReturnValue({
      user: { image: 'user', email: 'yacht.admin@gmail.com' }
    });
    const result = await withServerAuth([Roles.User], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: Messages.NotAuthorized });
  });

  it('should return NotAuthenticated if server action throws an error', async () => {
    (getServerSession as jest.Mock).mockReturnValue({ user: { image: 'admin' } });
    mockServerAction.mockRejectedValue(new Error('Test error'));
    const result = await withServerAuth([Roles.Admin], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: 'Test error' });
  });

  it('should return NotAuthorized if no user found in DB', async () => {
    (getServerSession as jest.Mock).mockReturnValue({
      user: { image: 'user', email: 'yacht.admin.2@gmail.com' }
    });
    mockFindUserByEmail.mockReturnValue(null);
    const result = await withServerAuth([Roles.User], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: Messages.UserNotFound });
  });
});
