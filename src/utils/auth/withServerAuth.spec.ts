/**
 * @jest-environment node
 */
// define the test environment as node as the withServerAuth function is used in a server action
// https://jestjs.io/docs/configuration#testenvironment-stringhttps://jestjs.io/docs/configuration#testenvironment-string
import { getServerSession } from 'next-auth';
import { withServerAuth } from '@/utils/auth/withServerAuth';
import { Messages } from '@/helpers/messages';
import { Roles } from '@/utils/types';

jest.mock('next-auth');

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
    (getServerSession as jest.Mock).mockReturnValue({ user: { image: 'admin' } });
    const result = await withServerAuth([Roles.User], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: Messages.NotAuthorized });
  });
  //
  it('should call server action and return its result', async () => {
    (getServerSession as jest.Mock).mockReturnValue({ user: { image: 'admin' } });
    mockServerAction.mockResolvedValue({ success: true, data: 'test' });
    const result = await withServerAuth([Roles.Admin], mockServerAction, mockProps);
    expect(result).toEqual({ success: true, data: 'test' });
    expect(mockServerAction).toHaveBeenCalledWith(mockProps);
  });
  //
  it('should return NotAuthenticated if server action throws an error', async () => {
    (getServerSession as jest.Mock).mockReturnValue({ user: { image: 'admin' } });
    mockServerAction.mockRejectedValue(new Error('Test error'));
    const result = await withServerAuth([Roles.Admin], mockServerAction, mockProps);
    expect(result).toEqual({ success: false, message: 'Test error' });
  });
});
