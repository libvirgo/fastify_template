import { describe, expect, test } from '@jest/globals';
import { sum } from './utils';

describe('module', () => {
    test('adds', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
