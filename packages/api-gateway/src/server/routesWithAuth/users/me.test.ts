import { UUID_PATTERN } from '../../../__utils__/constants';
import {
  createRestClientWithAuth,
  RestClientWithAuth,
} from '../../../__utils__/createRestClientWithAuth';

describe('server/routesWithAuth/users/me', () => {
  let client: RestClientWithAuth;

  beforeEach(async () => {
    client = await createRestClientWithAuth();
  });

  afterEach(async () => {
    if (client) {
      await client.close();
    }
  });

  it('should return info about user-self', async () => {
    const { statusCode, body } = await client.get('/api/users/me');

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
