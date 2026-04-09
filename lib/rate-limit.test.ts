import { test } from 'node:test';
import assert from 'node:assert';
import { rateLimiter } from './rate-limit';

test('RateLimiter', async (t) => {
  await t.test('should allow requests within limit', () => {
    const key = 'test-ip-1';
    const limit = 5;
    const windowMs = 1000;

    for (let i = 0; i < limit; i++) {
      const result = rateLimiter.check(key, limit, windowMs);
      assert.strictEqual(result.success, true);
      assert.strictEqual(result.remaining, limit - 1 - i);
    }
  });

  await t.test('should block requests exceeding limit', () => {
    const key = 'test-ip-2';
    const limit = 3;
    const windowMs = 1000;

    // Consume limit
    rateLimiter.check(key, limit, windowMs);
    rateLimiter.check(key, limit, windowMs);
    rateLimiter.check(key, limit, windowMs);

    // Exceed limit
    const result = rateLimiter.check(key, limit, windowMs);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.remaining, 0);
  });

  await t.test('should reset limit after window', async () => {
    const key = 'test-ip-3';
    const limit = 1;
    const windowMs = 100;

    rateLimiter.check(key, limit, windowMs);
    const blocked = rateLimiter.check(key, limit, windowMs);
    assert.strictEqual(blocked.success, false);

    // Wait for window to expire
    await new Promise((resolve) => setTimeout(resolve, 150));

    const allowed = rateLimiter.check(key, limit, windowMs);
    assert.strictEqual(allowed.success, true);
  });

  await t.test('getIp should extract IP from x-forwarded-for', () => {
      const req = {
          headers: {
              get: (name: string) => {
                  if (name === 'x-forwarded-for') return '10.0.0.1, 10.0.0.2';
                  return null;
              }
          }
      } as unknown as Request;

      const ip = rateLimiter.getIp(req);
      assert.strictEqual(ip, '10.0.0.1');
  });

  await t.test('getIp should return unknown if no header', () => {
    const req = {
        headers: {
            get: (_name: string) => null
        }
    } as unknown as Request;

    const ip = rateLimiter.getIp(req);
    assert.strictEqual(ip, 'unknown');
});
});
