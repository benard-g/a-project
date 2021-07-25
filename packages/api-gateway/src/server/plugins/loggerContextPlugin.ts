import FastifyPlugin from 'fastify-plugin';

import { Logger } from '../../utils/Logger';

export function createLoggerContextPlugin() {
  return FastifyPlugin(async (fastify) => {
    fastify.addHook('preHandler', (req, _reply, done) => {
      const requestContext = {
        traceId: req.traceId,
      };
      req.serviceLocator.set(
        Logger,
        req.serviceLocator.get(Logger).child(requestContext),
      );
      done();
    });
  });
}
