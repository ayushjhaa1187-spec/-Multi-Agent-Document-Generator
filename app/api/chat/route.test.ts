import { describe, it, mock, before, beforeEach } from 'node:test';
import assert from 'node:assert';

// Mock State
const mockState = {
  plannerResponse: "Proceed with generation. No questions needed.",
  writerResponse: "Generated BRD Content",
};

// Mock Prisma
const mockPrisma = {
  $queryRaw: mock.fn(async () => []),
  $transaction: mock.fn(async (callback) => {
    return callback(mockPrisma);
  }),
  project: {
    upsert: mock.fn(async () => ({ id: 'proj-123', name: 'Test Project' })),
    findFirst: mock.fn(async () => null),
  },
  bRD: {
    aggregate: mock.fn(async () => ({ _max: { version: 0 } })),
    create: mock.fn(async () => ({ id: 'brd-123' })),
  },
};

// Mock modules BEFORE importing the route
mock.module('@/lib/prisma', {
  namedExports: {
    prisma: mockPrisma,
  },
});

const mockStreamText = mock.fn(async (options) => {
  // Planner Agent Mock
  if (options.system && options.system.includes('BRD Planner Agent')) {
    return {
      text: Promise.resolve(mockState.plannerResponse),
      toDataStreamResponse: () => new Response("Planner Stream"),
    };
  }

  // Writer Agent Mock
  if (options.system && options.system.includes('Requirement Writer Agent')) {
    // Simulate onFinish callback
    if (options.onFinish) {
      await options.onFinish({ text: mockState.writerResponse });
    }
    return {
      text: Promise.resolve(mockState.writerResponse),
      toDataStreamResponse: () => new Response("Writer Stream"),
    };
  }

  return {
    text: Promise.resolve("Default"),
    toDataStreamResponse: () => new Response("Default"),
  };
});

mock.module('ai', {
  namedExports: {
    streamText: mockStreamText,
  },
});

mock.module('@ai-sdk/openai', {
  namedExports: {
    openai: mock.fn(() => ({})),
  },
});

describe('POST /api/chat', async () => {
  let POST;

  before(async () => {
    // Dynamically import the route handler after mocks are set up
    const routeModule = await import('./route');
    POST = routeModule.POST;
  });

  beforeEach(() => {
    mockPrisma.$queryRaw.mock.resetCalls();
    mockPrisma.project.upsert.mock.resetCalls();
    mockPrisma.bRD.create.mock.resetCalls();
    mockPrisma.$transaction.mock.resetCalls();

    mockState.plannerResponse = "Proceed with generation. No questions needed.";
    mockState.writerResponse = "Generated BRD Content";
  });

  // Validation Tests
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

  // BRD Generation Tests
  it('should save BRD to database when generation finishes successfully', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Create a BRD for a CRM' }],
        projectName: 'CRM Project',
      }),
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 200);

    assert.strictEqual(mockPrisma.$transaction.mock.callCount(), 1);

    assert.strictEqual(mockPrisma.project.upsert.mock.callCount(), 1);
    const upsertCall = mockPrisma.project.upsert.mock.calls[0];
    assert.strictEqual(upsertCall.arguments[0].where.name, 'CRM Project');

    assert.strictEqual(mockPrisma.bRD.create.mock.callCount(), 1);
    const createCall = mockPrisma.bRD.create.mock.calls[0];
    assert.strictEqual(createCall.arguments[0].data.projectId, 'proj-123');
    assert.strictEqual(createCall.arguments[0].data.content.raw, 'Generated BRD Content');
    assert.strictEqual(createCall.arguments[0].data.status, 'draft');
  });

  it('should not save BRD if writer text is empty', async () => {
    mockState.writerResponse = "";

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Create a BRD for a CRM' }],
        projectName: 'CRM Project',
      }),
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 200);

    assert.strictEqual(mockPrisma.$transaction.mock.callCount(), 0);
  });

  it('should not proceed to writer if planner asks clarification questions', async () => {
    mockState.plannerResponse = "1. What is the timeline?\n2. Who are the users?";

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Create a BRD' }],
        projectName: 'Ambiguous Project',
      }),
    });

    const res = await POST(req);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(mockPrisma.$transaction.mock.callCount(), 0);
  });
});
