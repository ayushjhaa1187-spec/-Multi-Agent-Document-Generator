import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { validateEnv } from './env';

describe('validateEnv', () => {
  const originalOpenAIKey = process.env.OPENAI_API_KEY;
  const originalDatabaseUrl = process.env.DATABASE_URL;

  beforeEach(() => {
    // Clear relevant env vars before each test to have a clean state
    delete process.env.OPENAI_API_KEY;
    delete process.env.DATABASE_URL;
  });

  afterEach(() => {
    // Restore original env after each test
    if (originalOpenAIKey === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = originalOpenAIKey;
    }

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it('should throw error if both OPENAI_API_KEY and DATABASE_URL are missing', () => {
    assert.throws(() => validateEnv(), {
      message: 'Missing environment variables: OPENAI_API_KEY, DATABASE_URL',
    });
  });

  it('should throw error if OPENAI_API_KEY is missing', () => {
    process.env.DATABASE_URL = 'postgres://localhost:5432/db';
    assert.throws(() => validateEnv(), {
      message: 'Missing environment variables: OPENAI_API_KEY',
    });
  });

  it('should throw error if DATABASE_URL is missing', () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';
    assert.throws(() => validateEnv(), {
      message: 'Missing environment variables: DATABASE_URL',
    });
  });

  it('should not throw if all required variables are present', () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';
    process.env.DATABASE_URL = 'postgres://localhost:5432/db';

    assert.doesNotThrow(() => validateEnv());
  });
});
