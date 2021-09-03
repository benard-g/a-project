import { Jwt } from '../../utils/Jwt';

import { AuthTokens, DecodedAccessToken, TokenArgs, TokenType } from './types';

interface Options {
  accessTokenDuration: number;
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
  private readonly accessTokenDuration: number;

  constructor(options: Options, private readonly jwt: Jwt) {
    this.accessTokenDuration = options.accessTokenDuration;
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
      { expiresInSeconds: this.accessTokenDuration },
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
