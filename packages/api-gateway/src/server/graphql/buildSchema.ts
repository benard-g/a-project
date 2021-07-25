import * as TypeGraphql from 'type-graphql';

import { QueryResolvers } from './resolvers/query';

const RESOLVERS = [...QueryResolvers] as const;

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
