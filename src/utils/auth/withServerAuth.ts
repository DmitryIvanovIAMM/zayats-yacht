import { ActionData, ActionResult, ActionTableData, Roles } from '@/utils/types';
import { getServerSession, Session } from 'next-auth';
import { Messages } from '@/helpers/messages';
import { findUserByEmail } from '@/controllers/AuthController';
import { User } from '@/models/User';

export async function withServerAuth<D = undefined>(
  allowedRoles: Roles[],
  serverAction: (user: User, ...args: any[]) => Promise<ActionResult>,
  ...args: any[]
): Promise<ActionResult | ActionData<D> | ActionTableData<D>> {
  const session: Session | null = await getServerSession();
  // eslint-disable-next-line no-console
  console.log('session: ', session);
  if (!session) {
    return { success: false, message: Messages.NotAuthenticated };
  }

  const hasAccess = session?.user?.image && allowedRoles.includes(session.user.image as Roles);
  if (!hasAccess) {
    return { success: false, message: Messages.NotAuthorized };
  }

  try {
    const adminUser = await findUserByEmail(session?.user?.email as string);
    if (!adminUser) return { success: false, message: Messages.UserNotFound };

    const foundUserHasAccess = adminUser.role && allowedRoles.includes(adminUser.role);
    if (!foundUserHasAccess) {
      return { success: false, message: Messages.NotAuthorized };
    }

    return await serverAction(adminUser, ...(args as []));
  } catch (error: any) {
    return { success: false, message: error?.message || Messages.NotAuthenticated };
  }
}
