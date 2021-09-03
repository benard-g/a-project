import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { login as routeLogin } from './auth/login';

export function createRoutesPlugin() {
  return (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    routeLogin(fastify, '/auth/local/login');

    done();
  };
}
