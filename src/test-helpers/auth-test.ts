import { defaultPassword } from '@/test-data/seedData';
import request, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';

/* eslint-disable no-console */

interface AuthCookieRecord {
  login: string;
  password: string;
  cookie: string;
}
let authCookiesCache: AuthCookieRecord[] = [];

export const getAuthCookie = async (
  agent: TestAgent<Test>,
  login: string,
  password = defaultPassword
) => {
  const authRecord = authCookiesCache.find(
    (cookieHashRecord: AuthCookieRecord) =>
      cookieHashRecord.login === login && cookieHashRecord.password === password
  );
  if (authRecord) {
    return authRecord.cookie;
  }
  return generateAndCacheAuthCookie(agent, login, password);
};

export const generateAndCacheAuthCookie = async (
  agent: TestAgent<Test>,
  login: string,
  password = defaultPassword
) => {
  try {
    // https://github.com/nextauthjs/next-auth/issues/1110
    // https://github.com/nextauthjs/next-auth/issues/9913
    // there are two different crsf tokens
    // short crsf token is sent by server in the request body
    // second one is long crsf token and it is sent in the cookie
    // both are required for successful authentication
    const shortCrfResponse = await agent
      .get(`/api/auth/csrf`)
      .set('Content-Type', 'application/json');
    const csrfToken = shortCrfResponse.body.csrfToken;
    const longCsrfTokenCookie = extractNextAuthCsrfToken(shortCrfResponse.header);
    const credentialsBody = {
      csrfToken: csrfToken,
      email: login,
      password: password,
      callbackUrl: '/',
      redirect: false,
      json: 'true'
    };
    const urlEncodedBody = mapObjectToFormUrlEncoded(credentialsBody);
    const response = await agent
      .post(`/api/auth/callback/credentials`)
      .send(urlEncodedBody)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Cookie', `next-auth.csrf-token=${longCsrfTokenCookie}`)
      .withCredentials(true);
    const cookie = extractSessionCookie(response.headers) as string;
    setCookieInCache(cookie, login, password);

    const userResponse = await agent
      .get(`/api/auth/session`)
      .set('Cookie', cookie)
      .set('Content-Type', 'application/json');
    console.log('Authenticated user data: ', userResponse.body);
    return cookie;
  } catch (err) {
    console.log('ERROR: ' + err);
  }
};

function extractNextAuthCsrfToken(headers: Record<string, string | string[]>) {
  const setCookie = headers['set-cookie'];
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie].filter(Boolean);

  const csrfCookie = cookies.find((c) => c.startsWith('next-auth.csrf-token='));

  if (!csrfCookie) return null;

  return csrfCookie.split(';')[0].split('=')[1] ?? null;
}

export function extractSessionCookie(headers: Headers | Record<string, string | string[]>) {
  let setCookies: string[] = [];

  if (headers instanceof Headers) {
    const raw = headers.get('set-cookie');
    if (raw) setCookies = raw.split(/,(?=\s*\w+=)/).map((c) => c.trim());
  } else {
    const raw = headers['set-cookie'];
    if (Array.isArray(raw)) setCookies = raw;
    else if (raw) setCookies = [raw];
  }

  return setCookies.find((c) => c.startsWith('next-auth.session-token=')) || null;
}

const setCookieInCache = (cookie: string, login: string, password: string) => {
  const existing = authCookiesCache.find(
    (record) => record.login === login && record.password === password
  );
  if (existing) {
    existing.cookie = cookie;
  } else {
    authCookiesCache.push({ login, password, cookie });
  }
};

export const clearAuthCookiesCache = () => {
  authCookiesCache = [];
};

export const logout = async (agent: request.SuperTest<request.Test>) => {
  clearAuthCookiesCache();
  await agent.post('/api/auth/logout');
};

export const mapObjectToFormUrlEncoded = (obj: Record<string, any>): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};
