import { FastifyInstance, RouteShorthandOptions } from 'fastify';

const OPTIONS: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'null',
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

export function getUserSelf(fastify: FastifyInstance, route: string) {
  fastify.get(route, OPTIONS, async (request, _reply) => {
    const { userContext } = request;
    const { userId } = userContext;

    return {
      user: {
        id: userId,
      },
    };
  });
}
