import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

// Mock dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

vi.mock('ai', () => ({
  streamText: vi.fn(),
}));

vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn(),
}));

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 503 if database connection fails', async () => {
    // Arrange
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
        projectName: 'Test Project',
        stage: 'generate',
      }),
    });

    // Mock prisma.$queryRaw to throw
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$queryRaw).mockRejectedValue(new Error('DB Connection Error'));

    // Act
    const response = await POST(req);

    // Assert
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body).toEqual({ error: 'Database connection failed' });
  });
});
