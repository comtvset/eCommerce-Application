import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(newCache: TokenStore) {
    this.myCache = newCache;
  }

  get() {
    return this.myCache;
  }
}
