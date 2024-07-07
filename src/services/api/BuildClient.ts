import fetch from 'node-fetch';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
// prettier-ignore
import type { AuthMiddlewareOptions, HttpMiddlewareOptions, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { MyTokenCache } from './MyTokenCache.ts';
import { getCredentials } from '../userData/saveEmailPassword.ts';

const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
const CLIENT_ID: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
const CLIENT_SECRET: string = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
const AUTH_URL: string = import.meta.env.VITE_CTP_AUTH_URL as string;
const API_URL: string = import.meta.env.VITE_CTP_API_URL as string;
const SCOPESString: string = (import.meta.env.VITE_CTP_SCOPES as string) || '';
const SCOPES: string[] = SCOPESString.split(' ');

const scopes = SCOPES;

interface AuthTokens {
  token: string;
  expirationTime: number;
  refreshToken: string;
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

export const getLoginClient = () => {
  const newTokenCache: MyTokenCache = new MyTokenCache();

  const isUser = Boolean(localStorage.getItem('userTokens'));

  const authTokens = localStorage.getItem('authTokens');
  let refToken = '';
  if (authTokens) {
    const tokens: AuthTokens = JSON.parse(authTokens) as AuthTokens;
    // if you have better solution don't use 'as', please fix it

    refToken = tokens.refreshToken;
  }

  const PasswordAuthMiddlewareOptions = {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: getCredentials().email,
        password: getCredentials().password,
      },
    },
    scopes,
    tokenCache: newTokenCache,
    fetch,
  };

  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    refreshToken: refToken,
    fetch,
  };

  const clientNew = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow(PasswordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const clientRef = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const client = isUser ? clientRef : clientNew;

  return { client, tokenCache: newTokenCache };
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export const createApiRoot = (): ByProjectKeyRequestBuilder => {
  const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  return apiRoot;
};

export const createLoginApiRoot = () => {
  const loginApiRoot = createApiBuilderFromCtpClient(getLoginClient().client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  return loginApiRoot;
};
