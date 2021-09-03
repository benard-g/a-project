import { FastifyReply, FastifyRequest } from 'fastify';

import { ServiceLocator } from '../../utils/ServiceLocator';

export interface Context {
  reply: FastifyReply;
  request: FastifyRequest;
  serviceLocator: ServiceLocator;
  userId: string;
}
