import { describe, it } from 'node:test';
import assert from 'node:assert';
import { POST } from './route';

describe('POST /api/chat - Security Validation', () => {
  it('should return 400 if projectName exceeds 100 characters', async () => {
    const longName = 'a'.repeat(101);
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
        projectName: longName,
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    // Expect generic error or specific one. I'll implement specific.
    assert.ok(data.error.includes('Invalid project name') || data.error.includes('Too long'));
  });

  it('should return 400 if messages array exceeds 50 items', async () => {
    const messages = Array(51).fill({ role: 'user', content: 'Test' });
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages,
        projectName: 'Test Project',
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should return 400 if message content exceeds 5000 characters', async () => {
    const longContent = 'a'.repeat(5001);
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: longContent }],
        projectName: 'Test Project',
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should return 400 if role is invalid', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'hacker', content: 'Test' }],
        projectName: 'Test Project',
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should enforce rate limiting after MAX_REQUESTS', async () => {
    const promises = [];
    // 10 requests should succeed (or return 400 for bad input)
    // The 11th should return 429
    for (let i = 0; i < 11; i++) {
      const req = new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.1' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'test' }], projectName: 'test project' })
      });
      promises.push(POST(req));
    }

    const responses = await Promise.all(promises);

    // Check that at least one response was 429
    const hasRateLimit = responses.some(r => r.status === 429);
    assert.strictEqual(hasRateLimit, true);
  });
});
