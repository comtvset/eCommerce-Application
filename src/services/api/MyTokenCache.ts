import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  constructor() {
    this.myCache = MyTokenCache.loadTokens();
  }

  static loadTokens(): TokenStore {
    const tokens = localStorage.getItem('authTokens');
    return tokens
      ? (JSON.parse(tokens) as TokenStore)
      : { token: '', expirationTime: 0, refreshToken: '' };
  }

  static saveTokens(tokens: TokenStore) {
    localStorage.setItem('authTokens', JSON.stringify(tokens));
  }

  set(newCache: TokenStore) {
    this.myCache = newCache;
    MyTokenCache.saveTokens(newCache);
  }

  get(): TokenStore {
    return this.myCache;
  }
}
