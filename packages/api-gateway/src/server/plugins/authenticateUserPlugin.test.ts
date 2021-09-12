import { UUID_PATTERN } from '../../__utils__/constants';
import { createRestClient, RestClient } from '../../__utils__/createRestClient';
import {
  createRestClientWithAuth,
  RestClientWithAuth,
} from '../../__utils__/createRestClientWithAuth';
import { loadConfig } from '../../config/index';
import { Jwt } from '../../utils/Jwt';

describe('src/server/plugins/authenticateUserPlugin', () => {
  const PROTECTED_RESOURCE = '/api/users/me';

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  describe('valid cases', () => {
    let restClientWithAuth: RestClientWithAuth;

    beforeEach(async () => {
      restClientWithAuth = await createRestClientWithAuth();
    });

    afterEach(async () => {
      if (restClientWithAuth) {
        await restClientWithAuth.close();
      }
    });

    it('should accept valid requests', async () => {
      const { statusCode, body } = await restClientWithAuth.get(
        PROTECTED_RESOURCE,
      );

      expect({ statusCode, body }).toEqual({
        statusCode: 200,
        body: {
          user: {
            id: expect.stringMatching(UUID_PATTERN),
          },
        },
      });
    });
  });

  describe('error cases', () => {
    let restClient: RestClient;

    beforeEach(async () => {
      restClient = await createRestClient();
    });

    afterEach(async () => {
      if (restClient) {
        await restClient.close();
      }
    });

    it('should reject requests made without the "Authorization" header', async () => {
      const response = await restClient.inject({
        method: 'GET',
        url: PROTECTED_RESOURCE,
      });

      expect(response.statusCode).toEqual(401);
      expect(response.json()).toEqual({
        error: 'Unauthorized',
        message: 'Missing Authorization header',
        statusCode: 401,
      });
    });

    it('should reject requests made with an "Authorization" header that is not a "Bearer"', async () => {
      const response = await restClient.inject({
        method: 'GET',
        url: PROTECTED_RESOURCE,
        headers: {
          authorization: 'some-invalid-string',
        },
      });

      expect(response.statusCode).toEqual(401);
      expect(response.json()).toEqual({
        error: 'Unauthorized',
        message: 'Authorization header should contain a bearer token',
        statusCode: 401,
      });
    });

    it('should reject requests made with an invalid token', async () => {
      const response = await restClient.inject({
        method: 'GET',
        url: PROTECTED_RESOURCE,
        headers: {
          authorization: 'Bearer some-invalid-token',
        },
      });

      expect(response.statusCode).toEqual(401);
      expect(response.json()).toEqual({
        error: 'Unauthorized',
        message: 'Unauthorized',
        statusCode: 401,
      });
    });

    it('should reject requests made with a valid token that is not of type "ACCESS"', async () => {
      const config = loadConfig();
      const jwtUtil = new Jwt(config.JWT_SECRET_KEY);

      const token = await jwtUtil.createToken(
        { type: 'NOT_AN_ACCESS_TOKEN' },
        { expiresInSeconds: 10 },
      );
      const response = await restClient.inject({
        method: 'GET',
        url: PROTECTED_RESOURCE,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      expect(response.statusCode).toEqual(401);
      expect(response.json()).toEqual({
        error: 'Unauthorized',
        message: 'Unauthorized',
        statusCode: 401,
      });
    });
  });
});
