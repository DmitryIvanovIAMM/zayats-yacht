import { LongActionData, LongActionResult, Roles } from '@/utils/types';
import { getServerSession } from 'next-auth';
import { Messages } from '@/helpers/messages';

export async function withServerAuth<T, D = undefined>(
  allowedRoles: Roles[],
  serverAction: (props?: T) => Promise<LongActionResult>,
  props?: T
): Promise<LongActionResult | LongActionData<D>> {
  const session = await getServerSession();
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
    return await serverAction(props);
  } catch (error: any) {
    return { success: false, message: error?.message || Messages.NotAuthenticated };
  }
}
