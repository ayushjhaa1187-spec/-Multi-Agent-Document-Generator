import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RateLimiter } from './rate-limit';

describe('RateLimiter', () => {
  it('should allow requests under the limit', () => {
    const limiter = new RateLimiter();
    const allowed = limiter.check('1.1.1.1', 5, 60000);
    assert.strictEqual(allowed, true);
  });

  it('should block requests over the limit', () => {
    const limiter = new RateLimiter();
    // Allow 2 requests
    limiter.check('2.2.2.2', 2, 60000); // 1st
    limiter.check('2.2.2.2', 2, 60000); // 2nd

    // 3rd request should fail
    const blocked = limiter.check('2.2.2.2', 2, 60000);
    assert.strictEqual(blocked, false);
  });

  it('should reset limit after window expires', async () => {
    const limiter = new RateLimiter();
    const key = '3.3.3.3';
    const limit = 1;
    const windowMs = 100;

    // Use up limit
    assert.strictEqual(limiter.check(key, limit, windowMs), true);
    assert.strictEqual(limiter.check(key, limit, windowMs), false);

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, windowMs + 50));

    // Should be allowed again
    assert.strictEqual(limiter.check(key, limit, windowMs), true);
  });

  it('should track separate limits for different keys', () => {
    const limiter = new RateLimiter();

    // Key A uses limit
    limiter.check('keyA', 1, 60000);
    assert.strictEqual(limiter.check('keyA', 1, 60000), false);

    // Key B should still be allowed
    assert.strictEqual(limiter.check('keyB', 1, 60000), true);
  });
});
