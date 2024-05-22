import {
  type Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

// const VITE_REFRESH_TOKEN: string = import.meta.env.VITE_REFRESH_TOKEN as string;
export const PROJECT_KEY: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;
const CLIENT_ID: string = import.meta.env.VITE_CTP_CLIENT_ID as string;
const CLIENT_SECRET: string = import.meta.env.VITE_CTP_CLIENT_SECRET as string;
const AUTH_URL: string = import.meta.env.VITE_CTP_AUTH_URL as string;
const API_URL: string = import.meta.env.VITE_CTP_API_URL as string;
// const SCOPES: string[] = [import.meta.env.VITE_CTP_SCOPES as string];
const SCOPESString: string = (import.meta.env.VITE_CTP_SCOPES as string) || '';

const SCOPES: string[] = SCOPESString.split(' ');

const scopes = SCOPES;

// interface TokenCache {
//   myCache: TokenStore;
//   get: () => TokenStore;
//   set: (newCache: TokenStore) => void;
// }

// interface RefreshAuthMiddlewareOptions {
//   host: string;
//   projectKey: string;
//   credentials: {
//     clientId: string;
//     clientSecret: string;
//   };
//   refreshToken: string;
//   tokenCache?: TokenCache;
//   oauthUri?: string;
//   scopes?: string[];
//   fetch?: unknown;
// }

// const MytokenCache: TokenCache = {
//   myCache: {
//     token: '',
//     expirationTime: -1,
//   },
//   get() {
//     return this.myCache;
//   },
//   set(newCache) {
//     this.myCache = newCache;
//   },
// };

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

// const refreshOptions: RefreshAuthMiddlewareOptions = {
//   host: AUTH_URL,
//   projectKey: PROJECT_KEY,
//   credentials: {
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//   },
//   refreshToken: VITE_REFRESH_TOKEN,
//   tokenCache: MytokenCache,
//   scopes: [`manage_project:${PROJECT_KEY}`],
//   fetch,
// };

// const Httpptions: HttpMiddlewareOptions = {
//   host: API_URL,
//   includeResponseHeaders: true,
//   maskSensitiveHeaderData: true,
//   includeOriginalRequest: false,
//   includeRequestInErrorResponse: false,
//   enableRetry: true,
//   retryConfig: {
//     maxRetries: 3,
//     retryDelay: 200,
//     backoff: false,
//     retryCodes: [503],
//   },
//   fetch,
// };

const Httpptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

// interface QueueMiddlewareOptions {
//   concurrency: number;
// }

// const queueOptions: QueueMiddlewareOptions = {
//   concurrency: 5,
// };

export const ctpClientRegistration: Client = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(Httpptions)
  .withLoggerMiddleware()
  .build();
