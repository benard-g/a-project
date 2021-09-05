import JsonWebToken from 'jsonwebtoken';

import { Jwt } from './Jwt';

describe('utils/Jwt', () => {
  const EXPIRES_IN_SECONDS = 3600; // 1 hour
  let jwt: Jwt;

  beforeEach(() => {
    jwt = new Jwt('some-secret-key');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should correctly encode and decode the data', async () => {
    const payload = { hello: 'there' };

    const token = await jwt.createToken(payload, {
      expiresInSeconds: EXPIRES_IN_SECONDS,
    });
    const decodedPayload = await jwt.decodeToken(token);

    expect(decodedPayload).toEqual({
      hello: 'there',
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
    expect(decodedPayload.exp).toEqual(decodedPayload.iat + EXPIRES_IN_SECONDS);
  });

  describe('#createToken', () => {
    it('should throw if an error occurs during the token generation', async () => {
      jest.spyOn(JsonWebToken, 'sign').mockImplementation((_p, _s, _o, cb) => {
        cb(new Error('Some unexpected error'), undefined);
      });

      const tokenPromise = jwt.createToken(
        { hello: 'there' },
        { expiresInSeconds: EXPIRES_IN_SECONDS },
      );

      await expect(tokenPromise).rejects.toThrowError('Some unexpected error');
    });

    it('should throw if no token is created during the generation', async () => {
      jest.spyOn(JsonWebToken, 'sign').mockImplementation((_p, _s, _o, cb) => {
        cb(null, undefined); // No errors but no token either
      });

      const tokenPromise = jwt.createToken(
        { hello: 'there' },
        { expiresInSeconds: EXPIRES_IN_SECONDS },
      );

      await expect(tokenPromise).rejects.toThrowError(
        'An error occurred while generating the token',
      );
    });
  });

  describe('#decodeToken', () => {
    it('should throw if the token is not correctly signed', async () => {
      const selfMadeToken = await new Promise<string>((resolve, reject) =>
        JsonWebToken.sign(
          { hello: 'over here' },
          'some-other-secret-key',
          {},
          (err, token) => {
            !err && token ? resolve(token) : reject(err);
          },
        ),
      );

      const decodeTokenPromise = jwt.decodeToken(selfMadeToken);

      await expect(decodeTokenPromise).rejects.toThrowError(
        'invalid signature',
      );
    });

    it('should throw if the token is outdated', async () => {
      const payload = { hello: 'there' };

      const token = await jwt.createToken(payload, {
        expiresInSeconds: -10, // 10 seconds in the past
      });
      const decodeTokenPromise = jwt.decodeToken(token);

      await expect(decodeTokenPromise).rejects.toThrowError('jwt expired');
    });

    it('should throw if no payload is returned during the decoding', async () => {
      jest
        .spyOn(JsonWebToken, 'verify')
        .mockImplementation((_t, _s, _o, cb) => {
          if (cb) {
            cb(null, undefined); // No errors but no token either
          }
        });

      const tokenPromise = jwt.decodeToken('some-token');

      await expect(tokenPromise).rejects.toThrowError(
        'An error occurred while decoding the token',
      );
    });
  });
});
