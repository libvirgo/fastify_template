import { fastify } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { routes } from './handlers';
import { loggerOpts, plugins } from './plugins';

const app = fastify({
    logger: loggerOpts('development'),
});

const start = async () => {
    try {
        await app.register(async (instance) => {
            instance.register(fastifyPlugin(plugins));
            for (const route of routes) {
                instance.register(route);
            }
        });
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start().then().catch(console.error);
