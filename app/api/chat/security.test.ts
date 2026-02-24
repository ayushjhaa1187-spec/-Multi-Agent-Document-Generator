import { describe, it } from 'node:test';
import assert from 'node:assert';
import { POST } from './route';
import { MAX_MESSAGES, MAX_CONTENT_LENGTH, MAX_PROJECT_NAME_LENGTH } from '@/lib/constants';

describe('POST /api/chat - Security Validation', () => {
  it(`should return 400 if projectName exceeds ${MAX_PROJECT_NAME_LENGTH} characters`, async () => {
    const longName = 'a'.repeat(MAX_PROJECT_NAME_LENGTH + 1);
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

  it(`should return 400 if messages array exceeds ${MAX_MESSAGES} items`, async () => {
    const messages = Array(MAX_MESSAGES + 1).fill({ role: 'user', content: 'Test' });
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

  it(`should return 400 if message content exceeds ${MAX_CONTENT_LENGTH} characters`, async () => {
    const longContent = 'a'.repeat(MAX_CONTENT_LENGTH + 1);
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
});
