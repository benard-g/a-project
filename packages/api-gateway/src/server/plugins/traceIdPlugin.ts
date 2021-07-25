import FastifyPlugin from 'fastify-plugin';
import { v4 as uuid } from 'uuid';

declare module 'fastify' {
  interface FastifyRequest {
    traceId: string;
  }
}

export function createTraceIdPlugin() {
  return FastifyPlugin(async (fastify) => {
    fastify.decorateRequest('traceId', '');
    fastify.addHook('preHandler', (req, _reply, done) => {
      req.traceId = uuid();
      done();
    });
  });
}
