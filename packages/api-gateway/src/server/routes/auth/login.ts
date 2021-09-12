import { FastifyInstance, RouteShorthandOptions } from 'fastify';

import * as UserCore from '../../../core/users';
import { AuthService } from '../../../services/auth/AuthService';
import { HEADER_ACCESS_TOKEN } from '../../constants';

const OPTIONS: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'null',
    },
    response: {
      200: {
        type: 'string',
      },
    },
  },
};

export function login(fastify: FastifyInstance, route: string) {
  fastify.post(route, OPTIONS, async (request, reply) => {
    const { serviceLocator } = request;
    const authService = serviceLocator.get(AuthService);

    const user = UserCore.createUser();
    const { accessToken } = await authService.generateAuthTokens({
      userId: user.id,
    });

    reply.header(HEADER_ACCESS_TOKEN, accessToken);

    return 'OK';
  });
}
