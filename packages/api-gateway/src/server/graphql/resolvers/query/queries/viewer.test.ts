import { gql } from 'apollo-server-core';

import { UUID_PATTERN } from '../../../../../__utils__/constants';
import {
  createGraphqlClient,
  GraphqlClient,
} from '../../../../../__utils__/createGraphqlClient';

describe('server/graphql/resolvers/query/viewer', () => {
  let graphqlClient: GraphqlClient;

  beforeEach(async () => {
    graphqlClient = await createGraphqlClient();
  });

  afterEach(async () => {
    if (graphqlClient) {
      await graphqlClient.close();
    }
  });

  const QUERY = gql`
    query Test {
      viewer {
        id
      }
    }
  `;

  it('should return the viewer info', async () => {
    const { body } = await graphqlClient.send(QUERY);

    expect(body).toEqual({
      data: {
        viewer: {
          id: expect.stringMatching(UUID_PATTERN),
        },
      },
    });
  });
});
