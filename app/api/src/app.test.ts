import { describe, expect, test } from '@jest/globals';
import { build } from './app';

describe('app', () => {
    test('app', async () => {
        const app = await build();
        const resp = await app.inject({
            method: 'GET',
            url: '/ping',
        });
        expect(resp.statusCode).toBe(404);
    });
});
