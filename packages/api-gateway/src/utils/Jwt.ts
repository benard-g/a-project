import JsonWebToken from 'jsonwebtoken';

type Payload = Record<string, any>;

interface CreateTokenOptions {
  expiresInSeconds: number;
}

export class Jwt {
  constructor(private readonly secretKey: string) {}

  async createToken<T extends Payload>(
    payload: T,
    options: CreateTokenOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const { expiresInSeconds } = options;
      JsonWebToken.sign(
        payload,
        this.secretKey,
        { expiresIn: expiresInSeconds },
        (err, token) => {
          if (err || !token) {
            reject(
              err || new Error('An error occurred while generating the token'),
            );
            return;
          }
          resolve(token);
        },
      );
    });
  }

  async decodeToken<T extends Payload>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      JsonWebToken.verify(token, this.secretKey, {}, (err, decodedPayload) => {
        if (err || !decodedPayload) {
          reject(
            err || new Error('An error occurred while decoding the token'),
          );
          return;
        }
        resolve(decodedPayload as T);
      });
    });
  }
}
