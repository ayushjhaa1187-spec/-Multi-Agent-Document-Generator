import { describe, it } from 'node:test';
import assert from 'node:assert';
import { POST } from './route';

describe('POST /api/chat', () => {
  it('should return 400 if messages is missing', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should return 400 if messages is not an array', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: 'not an array' }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should return 400 if messages array is empty', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });

  it('should return 400 if projectName is missing', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test message' }],
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid project name');
  });

  it('should return 400 if projectName is empty string', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test message' }],
        projectName: '',
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid project name');
  });

  it('should return 400 if message content is empty', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: '   ' }],
        projectName: 'Test Project',
      }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid messages format');
  });
});
