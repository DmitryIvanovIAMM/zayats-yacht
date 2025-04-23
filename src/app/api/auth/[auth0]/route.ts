// app/api/auth/[auth0]/route.js
//import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { PATHS } from '@/helpers/paths';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: 'openid profile email app_metadata identities tenant user_metadata'
    }
  }),
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      return await handleCallback(req, res);
    } catch (error: any) {
      const loginUrl = new URL(PATHS.loginFailed, req.url);
      loginUrl.searchParams.set('message', error.cause);
      return NextResponse.redirect(loginUrl);
    }
  }
  /*authorizationParams: {
    // Example of passing a custom query parameter to Auth0
    scope: 'openid profile email roles'
  }*/
});
