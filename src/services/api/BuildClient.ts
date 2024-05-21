import fetch from 'node-fetch';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import type {
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { MyTokenCache } from './MyTokenCache.ts';

const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
const CLIENT_ID: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
const CLIENT_SECRET: string = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
const AUTH_URL: string = import.meta.env.VITE_CTP_AUTH_URL as string;
const API_URL: string = import.meta.env.VITE_CTP_API_URL as string;
const SCOPESString: string = (import.meta.env.VITE_CTP_SCOPES as string) || '';
const SCOPES: string[] = SCOPESString.split(' ');

const scopes = SCOPES;
const newTokenCache: MyTokenCache = new MyTokenCache();

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
  tokenCache: newTokenCache,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  fetch,
  tokenCache: newTokenCache,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getCurrentToken = () => {
  return newTokenCache.get().token;
};
export const getRefreshToken = () => {
  return newTokenCache.get().refreshToken;
};
