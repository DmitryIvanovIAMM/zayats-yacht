import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginOrRegister } from '@/controllers/AuthController';
import { UserFrontend } from '@/models/UserFrontend';
import { cloneDeep } from 'lodash';
import { Messages } from '@/helpers/messages';

export const authOptions: NextAuthOptions = {
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: 'name', type: 'text', placeholder: 'Enter Full Name' },
        email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // eslint-disable-next-line no-console
          console.log('authorize().  credentials: ', credentials);
          const loginAction = await LoginOrRegister(credentials as UserFrontend);
          if (loginAction.isSuccessful) {
            // Any object returned will be saved in `user` property of the JWT
            return cloneDeep({
              ...loginAction.user,
              image: loginAction.user?.role // image field is persisted in session object in contract of manually enriched fields
            });
          }
          return { error: loginAction.message || Messages.FailedToLogin };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('authorize().  error: ', error);
          return { error: Messages.AuthenticationFailed };
        }
      }
    })
  ],
  // There is a way to enrich session data with user information.
  // https://next-auth.js.org/configuration/callbacks#session-callback
  // But ti seems it works only under login action
  // After page reloading both getServerSession() for server components and useSession() for client components
  // return standard session object (name, email and image fields) without _id and role fields
  // https://next-auth.js.org/getting-started/typescript#module-augmentation
  callbacks: {
    async signIn({ user }: { user: User & { error?: string } }) {
      // eslint-disable-next-line no-console
      console.log('signIn().  user: ', user);
      if (user?.error) {
        throw new Error(user.error);
      }
      return true;
    }
  },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/auth/verify-request' // (used for check email message)
  }
  // https://next-auth.js.org/configuration/options#cookies
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain: 'localhost', // Uncomment if you want to force domain
  //       secure: process.env.NODE_ENV === 'production'
  //     }
  //   },
  //   csrfToken: {
  //     name: `__Host-next-auth.csrf-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain: 'localhost', // Uncomment if you want to force domain
  //       secure: process.env.NODE_ENV === 'production'
  //     }
  //   },
  //   callbackUrl: {
  //     name: `__Secure-next-auth.callback-url`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain: 'localhost', // Uncomment if you want to force domain
  //       secure: process.env.NODE_ENV === 'production'
  //     }
  //   }
  // }
  // cookies: {
  //   sessionToken: {
  //     name: `next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       domain: 'localhost', // Uncomment if you want to force domain
  //       secure: process.env.NODE_ENV === 'production'
  //     }
  //   }
  // }
};
