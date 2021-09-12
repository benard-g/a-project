import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { getUserSelf as routeGetUserSelf } from './users/me';

export function createRoutesWithAuthPlugin() {
  return (
    fastify: FastifyInstance,
    _opts: FastifyPluginOptions,
    done: () => void,
  ) => {
    routeGetUserSelf(fastify, '/users/me');

    done();
  };
}
