import { LongActionData, LongActionResult, Roles } from '@/utils/types';
import { getServerSession, Session } from 'next-auth';
import { Messages } from '@/helpers/messages';
import { findUserByEmail } from '@/controllers/AuthController';
import { User } from '@/models/User';

export async function withServerAuth<T, D = undefined>(
  allowedRoles: Roles[],
  serverAction: (props?: T, user?: User | null) => Promise<LongActionResult>,
  props?: T
): Promise<LongActionResult | LongActionData<D>> {
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

    return await serverAction(props, adminUser);
  } catch (error: any) {
    return { success: false, message: error?.message || Messages.NotAuthenticated };
  }
}
