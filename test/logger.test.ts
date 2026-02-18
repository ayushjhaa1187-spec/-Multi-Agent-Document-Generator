import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { logError, sanitizeError } from '../lib/logger.ts';

describe('Logger', () => {
  it('should sanitize errors with sensitive keys', () => {
    const error = {
      apiKey: 'sk-12345',
      user: 'test',
      nested: {
        password: 'password123',
      },
    };

    const sanitized = sanitizeError(error) as any;

    assert.strictEqual(sanitized.apiKey, '***REDACTED***');
    assert.strictEqual(sanitized.user, 'test');
    assert.strictEqual(sanitized.nested.password, '***REDACTED***');
  });

  it('should sanitize Error objects', () => {
    const error = new Error('Something went wrong');
    error.name = 'CustomError';
    (error as any).cause = new Error('Original cause');

    const sanitized = sanitizeError(error) as any;
    assert.strictEqual(sanitized.name, 'CustomError');
    assert.strictEqual(sanitized.message, 'Something went wrong');
    assert.ok(sanitized.cause);
    assert.strictEqual(sanitized.cause.message, 'Original cause');
  });

  it('should handle circular references gracefully', () => {
    const obj: any = {};
    obj.self = obj;

    const result = sanitizeError(obj);
    assert.match(String(result), /Unable to sanitize object/);
  });

  it('should log sanitized error to console.error', () => {
    // Mock console.error
    const originalConsoleError = console.error;
    let loggedArgs: any[] = [];
    console.error = (...args) => {
        loggedArgs = args;
    };

    try {
        const error = { secretToken: 'hidden' };
        logError('Test context', error);

        assert.strictEqual(loggedArgs.length, 2);
        assert.strictEqual(loggedArgs[0], 'Test context');

        const loggedError = JSON.parse(loggedArgs[1]);
        assert.strictEqual(loggedError.secretToken, '***REDACTED***');
    } finally {
        console.error = originalConsoleError;
    }
  });
});
