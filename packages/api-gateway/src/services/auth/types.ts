export interface AuthTokens {
  accessToken: string;
}

export enum TokenType {
  ACCESS = 'ACCESS',
}

interface TokenBase {
  type: TokenType;
  exp: number; // unix timestamp
}

export type TokenArgs<T extends TokenBase> = Omit<T, 'exp' | 'iat'>;

export interface DecodedAccessToken extends TokenBase {
  type: TokenType.ACCESS;
  userId: string;
}
