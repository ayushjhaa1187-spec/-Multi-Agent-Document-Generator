# Testing Guide

Comprehensive guide to testing the Multi-Agent Document Generator.

## Testing Framework

- **Framework**: Node Testing (built-in)
- **Assertion**: Node Assert
- **Coverage**: Measuring code path execution

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test route.test.ts

# Run with coverage
npm test -- --coverage
```

## Test Structure

```typescript
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Module Name', () => {
  it('should do something', async () => {
    // Arrange
    const input = 'test data';

    // Act
    const result = processInput(input);

    // Assert
    assert.strictEqual(result, 'expected output');
  });
});
```

## Unit Tests

### API Route Tests

**File**: `app/api/chat/route.test.ts`

Tests all API validations:

```typescript
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

  it('should return 400 if projectName is empty', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Test' }],
        projectName: '',
      }),
    });
    const res = await POST(req);

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.json().error, 'Invalid project name');
  });
});
```

### Utility Tests

Test cache manager:

```typescript
describe('Cache Manager', () => {
  it('should set and get values', async () => {
    await cacheManager.set('test-key', { data: 'value' });
    const result = await cacheManager.get('test-key');

    assert.strictEqual(result.data, 'value');
  });

  it('should expire values after TTL', async () => {
    await cacheManager.set('key', 'value', 100); // 100ms TTL
    await new Promise(resolve => setTimeout(resolve, 150));

    const result = await cacheManager.get('key');
    assert.strictEqual(result, null);
  });
});
```

## Test Categories

### Input Validation Tests

```typescript
describe('Input Validation', () => {
  it('should reject empty project name', async () => {
    const input = { projectName: '', messages: [...] };
    assert.throws(() => validateInput(input));
  });

  it('should reject short project names', async () => {
    const input = { projectName: 'ab', messages: [...] };
    assert.throws(() => validateInput(input));
  });

  it('should accept valid project names', async () => {
    const input = { projectName: 'Valid Name', messages: [...] };
    assert.doesNotThrow(() => validateInput(input));
  });
});
```

### Error Handling Tests

```typescript
describe('Error Handling', () => {
  it('should handle database errors gracefully', async () => {
    // Mock database error
    const res = await POST(requestWithBadDB);

    assert.strictEqual(res.status, 503);
    const data = await res.json();
    assert.strictEqual(data.error, 'Database connection failed');
  });

  it('should not expose internal error details', async () => {
    const res = await POST(corruptedRequest);
    const data = await res.json();

    assert(!data.message.includes('/database/'));
    assert(!data.message.includes('stack trace'));
  });
});
```

### Performance Tests

```typescript
describe('Performance', () => {
  it('should respond within 500ms', async () => {
    const start = performance.now();
    const res = await POST(validRequest);
    const duration = performance.now() - start;

    assert(duration < 500, `Expected < 500ms, got ${duration}ms`);
  });

  it('should track response time metrics', async () => {
    await POST(validRequest);
    const metrics = getMetrics();

    assert(metrics.average_response_time_ms < 500);
    assert(metrics.is_healthy);
  });
});
```

## Running Specific Test Suites

```bash
# Only validation tests
npm test -- --grep "Input Validation"

# Only performance tests
npm test -- --grep "Performance"

# Only error handling
npm test -- --grep "Error Handling"
```

## Test Coverage

**Current Coverage:**
- API Validation: 100% (6/6 tests)
- Error Handling: High coverage
- Business Logic: Moderate coverage

**Target Coverage:** >80%

**Check Coverage:**
```bash
npm test -- --coverage
```

## Integration Tests

Testing multiple components together:

```typescript
describe('BRD Generation Flow', () => {
  it('should complete full generation workflow', async () => {
    // 1. Create project
    const project = await createProject('TestProject');

    // 2. Send messages
    const response = await sendMessages(project.id, [...]);

    // 3. Verify database persistence
    const saved = await getProject(project.id);
    assert.strictEqual(saved.name, 'TestProject');

    // 4. Verify analytics tracking
    const analytics = await getAnalytics();
    assert(analytics.totalEvents > 0);
  });
});
```

## Mocking

### Mock Database

```typescript
// Mock Prisma
import { vi } from 'vitest';

const mockPrisma = {
  project: {
    findFirst: vi.fn(),
    upsert: vi.fn(),
  },
};
```

### Mock External APIs

```typescript
// Mock OpenAI API
const mockOpenAI = {
  chat: {
    completions: {
      create: vi.fn().mockResolvedValue({
        choices: [{ message: { content: 'Mock response' } }],
      }),
    },
  },
};
```

## Best Practices

### 1. Use Descriptive Names

```typescript
// Good
it('should return 400 and "Invalid messages format" when messages array is empty', () => {})

// Bad
it('should handle empty messages', () => {})
```

### 2. Test One Thing at a Time

```typescript
// Bad - Tests multiple things
it('should validate and save', async () => {
  assert(isValid(data));
  const saved = await save(data);
  assert(saved.id);
});

// Good - One responsibility per test
it('should validate input data', () => {
  assert(isValid(data));
});

it('should save valid data to database', async () => {
  const saved = await save(data);
  assert(saved.id);
});
```

### 3. Follow AAA Pattern

```typescript
it('should process request correctly', async () => {
  // Arrange - Set up test data
  const input = { projectName: 'Test', messages: [...] };

  // Act - Execute the function
  const result = await processRequest(input);

  // Assert - Verify the output
  assert.strictEqual(result.status, 200);
});
```

### 4. Clean Up After Tests

```typescript
import { afterEach } from 'node:test';

afterEach(async () => {
  // Clean up database
  await clearTestData();

  // Clear mocks
  vi.clearAllMocks();

  // Reset cache
  await cacheManager.clear();
});
```

## Common Test Patterns

### Testing Async Functions

```typescript
it('should handle async operations', async () => {
  const promise = asyncFunction();
  assert(promise instanceof Promise);

  const result = await promise;
  assert.strictEqual(result, 'expected');
});
```

### Testing Error Cases

```typescript
it('should throw on invalid input', () => {
  assert.throws(
    () => dangerousFunction(null),
    Error,
    'Should throw Error'
  );
});

it('should reject promise on error', async () => {
  await assert.rejects(
    asyncFunction('invalid'),
    Error
  );
});
```

### Testing with Timeouts

```typescript
it('should timeout after delay', async () => {
  const promise = delayedFunction();

  await assert.rejects(
    Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 100)
      ),
    ]),
    Error
  );
});
```

## Continuous Integration

Tests run automatically:
- On every push to GitHub
- In pull requests (blocking)
- Before deployment

**GitHub Actions Config**: `.github/workflows/main.yml`

## Testing Checklist

- [ ] All new features have tests
- [ ] All bug fixes have regression tests
- [ ] Error cases are tested
- [ ] Happy path is tested
- [ ] Edge cases are tested
- [ ] All tests pass locally
- [ ] No console errors in tests
- [ ] Code coverage > 80%

## Debugging Tests

```bash
# Run with verbose output
npm test -- --verbose

# Run single test
npm test -- --grep "specific test name"

# Debug in Node inspector
node --inspect-brk ./node_modules/test/lib/cli.js
```

## Test Command Reference

```bash
npm test                      # Run all tests
npm test -- --watch          # Watch mode
npm test -- --coverage       # With coverage report
npm test -- --grep "pattern" # Filter tests
npm test route.test.ts        # Single file
```

---

Remember: Good tests make refactoring safe and catching bugs easy!
