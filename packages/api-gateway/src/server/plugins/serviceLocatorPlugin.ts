import FastifyPlugin from 'fastify-plugin';

import { ServiceLocator } from '../../utils/ServiceLocator';

declare module 'fastify' {
  interface FastifyRequest {
    serviceLocator: ServiceLocator;
  }
}

export function createServiceLocatorPlugin(serviceLocator: ServiceLocator) {
  return FastifyPlugin(async (fastify) => {
    fastify.decorateRequest('serviceLocator', null);
    fastify.addHook('preHandler', (req, _reply, done) => {
      req.serviceLocator = serviceLocator.child();
      done();
    });
  });
}
