import type { FastifyInstance, FastifyRequest } from 'fastify';

export async function ping(app: FastifyInstance) {
    app.post(
        '/ping',
        { schema: pingSchema },
        async (request: FastifyRequest<{ Body: { name: string } }>, _) => {
            return {
                pong: `hello: ${request.body.name}`,
            };
        },
    );
}

const pingSchema = {
    tags: ['develop'],
    summary: 'ping pong',
    description: 'ping pong',
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                pong: { type: 'string' },
            },
        },
    },
};
