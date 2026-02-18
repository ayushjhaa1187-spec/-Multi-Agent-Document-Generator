import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: vi.fn(),
    project: {
      findFirst: vi.fn(),
      upsert: vi.fn(),
    },
    bRD: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('ai', () => ({
  streamText: vi.fn().mockResolvedValue({
    text: Promise.resolve('Mocked AI response'),
    toDataStreamResponse: () => new Response('Mocked stream'),
  }),
}));

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(),
}));

// Mock agents
vi.mock('@/lib/agents/brd-planner', () => ({
  BRD_PLANNER_SYSTEM_PROMPT: 'mock-planner-prompt',
}));

vi.mock('@/lib/agents/requirement-writer', () => ({
  REQUIREMENT_WRITER_SYSTEM_PROMPT: 'mock-writer-prompt',
}));

import { POST } from './route';

describe('POST /api/chat', () => {
  it('should return 400 if project name is missing', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        // projectName is missing
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid project name');
  });

  it('should return 400 if project name is not a string', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        projectName: 123, // Invalid type
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid project name');
  });

  it('should return 400 if project name is empty string', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        projectName: '', // Invalid empty string
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid project name');
  });

  it('should process request if project name is valid', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        projectName: 'Valid Project',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBe('Mocked stream');
  });
});
