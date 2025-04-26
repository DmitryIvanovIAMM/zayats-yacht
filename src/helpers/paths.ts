import { compile } from 'path-to-regexp';

export enum PATHS {
  landing = '/',
  signIn = '/sign-in',
  quoteRequest = '/quote-request',
  gallery = '/gallery',
  services = '/services',
  instructions = '/instructions',
  privacyPolicy = '/privacy-policy',
  authCallback = '/auth-callback',
  scheduleManagement = '/schedule-management',
  destination = '/destination/:id',
  loginFailed = '/login-failed'
}

/**
 * @param path such as '/user/:id.
 * @param params such as {id: 1}
 * @returns string such as '/user/1'
 */
export const toPath = (path: string, params = {}) => compile(path)(params);
