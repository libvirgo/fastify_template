import { fastify, type FastifyInstance } from 'fastify';
import { loggerOpts, plugins } from './plugins';
import fastifyPlugin from 'fastify-plugin';
import { routes } from './handlers';

const fy = fastify({
    logger: loggerOpts('development'),
});

export const build = async (): Promise<FastifyInstance> => {
    await fy.register(async (instance) => {
        instance.register(fastifyPlugin(plugins));
        for (const route of routes) {
            instance.register(route);
        }
    });
    return fy;
};
