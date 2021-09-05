import { HEADER_ACCESS_TOKEN } from '../server/constants';
import type { UnwrapPromise } from '../utils/UnwrapPromise';

import { createRestClient } from './createRestClient';

type InjectFn = UnwrapPromise<ReturnType<typeof createRestClient>>['inject'];
type InjectResponse = UnwrapPromise<ReturnType<InjectFn>>;

function formatResponse(response: InjectResponse) {
  const contentType = response.headers['content-type']?.toString() || '';
  const isJsonResponse = contentType.startsWith('application/json');
  return {
    ...response,
    body: isJsonResponse ? JSON.parse(response.body) : response.body,
  };
}

export async function createRestClientWithAuth() {
  const restClient = await createRestClient();

  const loginResponse = await restClient.inject({
    method: 'POST',
    url: '/api/auth/local/login',
  });
  const accessToken = loginResponse.headers[HEADER_ACCESS_TOKEN];
  const headers = { Authorization: `Bearer ${accessToken}` };

  return {
    close: async () => {
      await restClient.close();
    },
    get: async (url: string) =>
      formatResponse(
        await restClient.inject({
          headers,
          method: 'GET',
          url,
        }),
      ),
    post: async (url: string, body: Record<string, any>) =>
      formatResponse(
        await restClient.inject({
          headers,
          method: 'POST',
          payload: body,
          url,
        }),
      ),
  };
}

export type RestClientWithAuth = UnwrapPromise<
  ReturnType<typeof createRestClientWithAuth>
>;
