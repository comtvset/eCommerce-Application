import { MyTokenCache } from './MyTokenCache.ts';

export const saveToken = (tokenCache: MyTokenCache) => {
  const { token, refreshToken } = tokenCache.myCache;

  const tokens = {
    curToken: token,
    refToken: refreshToken,
  };

  localStorage.setItem('userTokens', JSON.stringify(tokens));
  localStorage.setItem('token', tokens.curToken);
};
