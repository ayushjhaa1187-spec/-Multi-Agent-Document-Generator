import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { handleChat } from './route';

describe('handleChat - BRD Saving Logic', () => {
  it('should save BRD to database when generation finishes successfully', async () => {
    const projectName = 'Coffee Shop App';
    const messages = [{ role: 'user', content: 'Make an app' }];

    // Mock Prisma
    const mockPrisma = {
        $queryRaw: mock.fn(async () => [{ '?column?': 1 }]),
        $transaction: mock.fn(async (callback) => callback(mockPrisma)),
        project: {
            upsert: mock.fn(async (args) => ({
                id: args.create?.id || 'project-123',
                name: args.create?.name || 'Default Project'
            })),
            findFirst: mock.fn(),
        },
        bRD: {
            aggregate: mock.fn(async () => ({ _max: { version: 0 } })),
            create: mock.fn(async (args) => ({
                id: 'brd-123',
                ...args.data
            })),
        },
    };

    // Mock StreamText
    const mockStreamText = mock.fn(async (options) => {
       // Writer call has onFinish
       if (options.onFinish) {
            const generatedText = '## 1. Introduction\nThis is the BRD.';
            await options.onFinish({ text: generatedText });
            return {
                text: Promise.resolve(generatedText),
                toDataStreamResponse: () => new Response('writer output'),
            };
       }

       // Planner call (no onFinish)
       return {
           text: Promise.resolve("I will write the requirements."),
           toDataStreamResponse: () => new Response('planner output'),
       };
    });

    // Mock OpenAI
    const mockOpenAI = mock.fn(() => ({}));

    // Mock Analytics/Performance
    const mockRecordMetric = mock.fn();
    const mockAnalyticsTracker = {
      trackApiRequest: mock.fn(),
      trackUserAction: mock.fn(),
      trackError: mock.fn(),
    };

    const deps = {
      prisma: mockPrisma,
      streamText: mockStreamText,
      openai: mockOpenAI,
      recordMetric: mockRecordMetric,
      analyticsTracker: mockAnalyticsTracker,
    };

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, projectName }),
    });

    // Invoke handleChat with mocked dependencies
    // @ts-ignore
    const res = await handleChat(req, deps);

    assert.strictEqual(res.status, 200);

    // Assert Transaction
    assert.strictEqual(mockPrisma.$transaction.mock.callCount(), 1, 'Transaction should be called once');

    // Assert Upsert
    const upsertCall = mockPrisma.project.upsert.mock.calls[0];
    assert.ok(upsertCall, 'Project.upsert should be called');
    assert.strictEqual(upsertCall.arguments[0].where.name, projectName);

    // Assert BRD Create
    const createCall = mockPrisma.bRD.create.mock.calls[0];
    assert.ok(createCall, 'BRD.create should be called');
    assert.strictEqual(createCall.arguments[0].data.content.raw, '## 1. Introduction\nThis is the BRD.');
  });
});
