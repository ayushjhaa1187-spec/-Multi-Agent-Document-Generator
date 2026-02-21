import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import { prisma } from '@/lib/prisma';
import { saveBRD } from './project';

describe('saveBRD', () => {
  const originalMethods = new Map();

  function mockMethod(obj: any, method: string, implementation: any) {
    if (!originalMethods.has(obj)) {
        originalMethods.set(obj, new Map());
    }
    const methods = originalMethods.get(obj);
    if (!methods.has(method)) {
        methods.set(method, obj[method]);
    }
    const mocked = mock.fn(implementation);
    obj[method] = mocked;
    return mocked;
  }

  afterEach(() => {
    for (const [obj, methods] of originalMethods.entries()) {
        for (const [method, original] of methods.entries()) {
            obj[method] = original;
        }
    }
    originalMethods.clear();
  });

  it('should save project and BRD correctly', async () => {
    // Mock prisma methods manually
    const mockTransaction = mockMethod(prisma, '$transaction', async (callback: any) => {
        return callback(prisma);
    });

    const mockUpsert = mockMethod(prisma.project, 'upsert', async () => {
        return { id: 'proj-123', name: 'Test Project' };
    });

    const mockAggregate = mockMethod(prisma.bRD, 'aggregate', async () => {
        return { _max: { version: 1 } };
    });

    const mockCreate = mockMethod(prisma.bRD, 'create', async () => {
        return {};
    });

    const result = await saveBRD('Generated Text', 'Test Project', [{ role: 'user', content: 'Context' }]);

    assert.deepStrictEqual(result, { projectId: 'proj-123', version: 2 });
    assert.strictEqual(mockTransaction.mock.callCount(), 1);
    assert.strictEqual(mockUpsert.mock.callCount(), 1);
    assert.strictEqual(mockAggregate.mock.callCount(), 1);
    assert.strictEqual(mockCreate.mock.callCount(), 1);

    // Check create arguments
    const createCall = mockCreate.mock.calls[0];
    assert.strictEqual(createCall.arguments[0].data.projectId, 'proj-123');
    assert.strictEqual(createCall.arguments[0].data.version, 2);
    assert.strictEqual(createCall.arguments[0].data.content.raw, 'Generated Text');
  });

  it('should return null if text is empty', async () => {
    const result = await saveBRD('', 'Test Project', []);
    assert.strictEqual(result, null);
  });

  it('should handle database errors gracefully', async () => {
    mockMethod(prisma, '$transaction', async () => {
        throw new Error('DB Error');
    });

    const result = await saveBRD('Text', 'Project', []);
    assert.strictEqual(result, null);
  });
});
