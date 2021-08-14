const Config = require('./build/config');

const config = Config.loadConfig();

module.exports = {
  type: 'postgres',
  logging: false,
  url: config.DATABASE_URL,
  entities: ['build/model/entities/*.js'],
  migrations: ['build/model/migrations/*.js'],
  cli: {
    migrationsDir: 'src/model/migrations',
  },
};
