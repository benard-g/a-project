import { createConnection } from 'typeorm';

import { LobbyEntity } from './entities/LobbyEntity';

const ENTITIES = [LobbyEntity];

interface Options {
  databaseUrl: string;
}

export async function createDatabaseConnection(options: Options) {
  const { databaseUrl } = options;

  return createConnection({
    type: 'postgres',
    entities: ENTITIES,
    logging: false,
    synchronize: false,
    url: databaseUrl,
  });
}
