import { Jwt } from '../../utils/Jwt';

import { AuthService } from './AuthService';
import { TokenType } from './types';

describe('services/auth', () => {
  const ACCESS_TOKEN_DURATION_IN_SECONDS = 10;

  let jwtUtils: Jwt;
  let authService: AuthService;

  beforeEach(() => {
    jwtUtils = new Jwt('some-secret-key');
    authService = new AuthService(
      { accessTokenDurationInSeconds: ACCESS_TOKEN_DURATION_IN_SECONDS },
      jwtUtils,
    );
  });

  it('should correctly create and decode a user token', async () => {
    const authTokens = await authService.generateAuthTokens({
      userId: 'some-user-id',
    });

    expect(authTokens).toEqual({
      accessToken: expect.any(String),
    });

    const result = await authService.validateAuthTokens(authTokens);

    expect(result).toEqual({
      decodedTokens: {
        decodedAccessToken: {
          type: TokenType.ACCESS,
          userId: 'some-user-id',
          iat: expect.any(Number),
          exp: expect.any(Number),
        },
      },
    });
  });

  it('should throw if the token is outdated', async () => {
    authService = new AuthService(
      { accessTokenDurationInSeconds: 1 },
      jwtUtils,
    );

    const authTokens = await authService.generateAuthTokens({
      userId: 'some-user-id',
    });
    await new Promise((resolve) => setTimeout(() => resolve(0), 2000)); // wait 2 seconds
    const validatePromise = authService.validateAuthTokens(authTokens);

    await expect(validatePromise).rejects.toThrowError('jwt expired');
  });
});
