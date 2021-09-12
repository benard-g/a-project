import FastifyPlugin from 'fastify-plugin';

import {
  AuthService,
  DecodedAccessToken,
  TokenType,
} from '../../services/auth';
import { HEADER_AUTHORIZATION } from '../constants';

const BEARER_PREFIX = 'Bearer ';

declare module 'fastify' {
  interface FastifyRequest {
    userContext: {
      userId: string;
    };
  }
}

export function createAuthenticateUserPlugin() {
  return FastifyPlugin(async (fastify) => {
    fastify.decorateRequest('userContext', null);
    fastify.addHook('preHandler', async (req, reply) => {
      const authService = req.serviceLocator.get(AuthService);

      const bearerToken = req.headers[HEADER_AUTHORIZATION];
      if (typeof bearerToken !== 'string') {
        reply.code(401);
        throw new Error('Missing Authorization header');
      }

      if (!bearerToken.startsWith(BEARER_PREFIX)) {
        reply.code(401);
        throw new Error('Authorization header should contain a bearer token');
      }
      const accessToken = bearerToken.substr(BEARER_PREFIX.length);

      let decodedAccessToken: DecodedAccessToken | undefined;
      try {
        const { decodedTokens } = await authService.validateAuthTokens({
          accessToken,
        });
        decodedAccessToken = decodedTokens.decodedAccessToken;
      } catch (_err) {
        reply.code(401);
        throw new Error('Unauthorized');
      }

      if (decodedAccessToken.type !== TokenType.ACCESS) {
        reply.code(401);
        throw new Error('Unauthorized');
      }

      req.userContext = {
        userId: decodedAccessToken.userId,
      };
    });
  });
}
