import assert from 'node:assert';
import { RateLimiter } from '../lib/rate-limit.ts';

async function runTests() {
  console.log('Running rate limit verification...');

  // Test 1: Basic Limiting
  {
    console.log('Test 1: Basic Limiting');
    const limit = 5;
    const windowMs = 1000;
    const limiter = new RateLimiter(windowMs, limit);
    const ip = '127.0.0.1';

    for (let i = 0; i < limit; i++) {
      const allowed = limiter.check(ip);
      assert.strictEqual(allowed, true, `Request ${i + 1} should be allowed`);
    }

    const blocked = limiter.check(ip);
    assert.strictEqual(blocked, false, 'Request 6 should be blocked');
    console.log('✅ Basic Limiting passed');
  }

  // Test 2: Window Reset
  {
    console.log('Test 2: Window Reset');
    const limit = 2;
    const windowMs = 100; // Short window
    const limiter = new RateLimiter(windowMs, limit);
    const ip = '127.0.0.1';

    limiter.check(ip);
    limiter.check(ip);
    assert.strictEqual(limiter.check(ip), false, 'Should be blocked');

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, windowMs + 50));

    const allowed = limiter.check(ip);
    assert.strictEqual(allowed, true, 'Should be allowed after window expiration');
    console.log('✅ Window Reset passed');
  }

  // Test 3: Multiple IPs
  {
    console.log('Test 3: Multiple IPs');
    const limit = 2;
    const windowMs = 1000;
    const limiter = new RateLimiter(windowMs, limit);
    const ip1 = '1.1.1.1';
    const ip2 = '2.2.2.2';

    limiter.check(ip1);
    limiter.check(ip1);
    assert.strictEqual(limiter.check(ip1), false, 'IP1 should be blocked');

    assert.strictEqual(limiter.check(ip2), true, 'IP2 should still be allowed');
    console.log('✅ Multiple IPs passed');
  }

  console.log('All tests passed!');
  process.exit(0);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
