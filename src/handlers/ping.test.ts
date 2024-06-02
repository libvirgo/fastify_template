import {describe, expect, test} from '@jest/globals';
import { fastify } from 'fastify';
import { loggerOpts } from '../plugins';
import { ping } from './ping';

const app = fastify({
    logger: loggerOpts('production'),
});

describe('routes', () => {
    test('ping', async () => {
        await app.register(ping);
        const response = await app.inject({
            method: 'POST',
            url: '/ping',
            body: { name: 'test' },
        });
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toStrictEqual({ pong: "hello: test"});
    });
});
