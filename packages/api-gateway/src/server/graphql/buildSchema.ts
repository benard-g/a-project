import * as TypeGraphql from 'type-graphql';

import { LobbyResolvers } from './resolvers/lobby';
import { QueryResolvers } from './resolvers/query';
import { ViewerResolvers } from './resolvers/viewer';

const RESOLVERS = [
  ...LobbyResolvers,
  ...QueryResolvers,
  ...ViewerResolvers,
] as const;

interface Options {
  emitSchemaFile: string | false;
}

export function buildSchema(options: Options) {
  const { emitSchemaFile } = options;

  return TypeGraphql.buildSchema({
    container: ({ context }) => context.serviceLocator,
    emitSchemaFile,
    resolvers: RESOLVERS,
  });
}
