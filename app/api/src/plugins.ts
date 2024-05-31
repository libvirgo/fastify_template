import cors from '@fastify/cors';
import middleware from '@fastify/middie';
import * as swagger from '@fastify/swagger';
import scalar from '@scalar/fastify-api-reference';
import type { FastifyInstance } from 'fastify';
import type { PinoLoggerOptions } from 'fastify/types/logger';

export async function plugins(app: FastifyInstance) {
    await app.register(middleware);
    await app.register(cors);
    await registerOpenAPI(app);
    await registerScalar(app);
    app.setErrorHandler((error, request, reply) => {
        reply.send(error);
    });
    app.use((req, res, next) => {
        next();
    });
}

type Environment = 'development' | 'production';

export const loggerOpts = (env: Environment): PinoLoggerOptions => {
    switch (env) {
        // case 'development':
        case 'production':
            return {
                level: 'warn',
            };
        default:
            return {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        singleLine: false,
                        sync: true,
                    },
                },
                level: 'info',
            };
    }
};

async function registerOpenAPI(app: FastifyInstance) {
    await app.register(swagger.default, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Fastify swagger API',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server',
                },
            ],
            tags: [
                { name: 'develop', description: 'Develop related end-points' },
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'apiKey',
                        in: 'header',
                    },
                },
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here',
            },
        },
    });
}

async function registerScalar(app: FastifyInstance) {
    await app.register(scalar, {
        routePrefix: '/references',
    });
}
