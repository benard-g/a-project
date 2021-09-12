import { Jwt } from '../../utils/Jwt';

import { AuthTokens, DecodedAccessToken, TokenArgs, TokenType } from './types';

interface Options {
  accessTokenDurationInSeconds: number;
}

interface GenerateAuthTokensOptions {
  userId: string;
}

interface ValidateTokensResult {
  decodedTokens: {
    decodedAccessToken: DecodedAccessToken;
  };
}

export class AuthService {
  private readonly accessTokenDurationInSeconds: number;

  constructor(options: Options, private readonly jwt: Jwt) {
    this.accessTokenDurationInSeconds = options.accessTokenDurationInSeconds;
  }

  async generateAuthTokens(
    options: GenerateAuthTokensOptions,
  ): Promise<AuthTokens> {
    const { userId } = options;

    const accessToken = await this.jwt.createToken<
      TokenArgs<DecodedAccessToken>
    >(
      {
        type: TokenType.ACCESS,
        userId,
      },
      { expiresInSeconds: this.accessTokenDurationInSeconds },
    );

    return { accessToken };
  }

  async validateAuthTokens(
    authTokens: AuthTokens,
  ): Promise<ValidateTokensResult> {
    const { accessToken } = authTokens;

    const decodedAccessToken = await this.jwt.decodeToken<DecodedAccessToken>(
      accessToken,
    );

    return {
      decodedTokens: {
        decodedAccessToken,
      },
    };
  }
}
