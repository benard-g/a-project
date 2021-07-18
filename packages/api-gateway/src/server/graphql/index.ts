import { ApolloServer, gql } from 'apollo-server-fastify';

import { Logger } from '../../utils/Logger';
import { registerLoggerPlugin } from './plugins/loggerPlugin';

// TODO use TypeGraphql
const schema = gql`
  type User {
    id: ID!
  }

  type Query {
    viewer: User!
  }
`;
const resolvers = [
  {
    Query: {
      viewer: () => {
        return { id: 'some-user-id' };
      },
    },
  },
];

export function createGraphqlServer(logger: Logger) {
  return new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [registerLoggerPlugin(logger)],
  });
}
