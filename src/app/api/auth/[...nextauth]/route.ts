import NextAuth from 'next-auth';
import { authOptions } from '@/app/auth/credentialProviderOptions.';

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
