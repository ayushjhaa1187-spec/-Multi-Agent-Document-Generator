import assert from 'node:assert';
import { test } from 'node:test';
import { analyticsTracker } from '@/lib/analytics';

test('Security: Analytics should sanitize sensitive data', async (t) => {
  // Simulate a sensitive user action (Project name should be stripped)
  analyticsTracker.trackUserAction('brd_generation', {
    projectName: 'Secret Project X',
    messageCount: 5,
    password: 'supersecretpassword',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    secret: 's3cr3t'
  });

  // Simulate an error with stack trace (Stack trace should be removed)
  const error = new Error('Database connection failed');
  analyticsTracker.trackError(error);

  // Retrieve metrics
  const events = analyticsTracker.getEvents(10);

  // Find the events we just added (using messageCount or error message)
  const userActionEvent = events.find(e => e.event === 'user_action' && e.properties?.messageCount === 5);
  const errorEvent = events.find(e => e.event === 'error' && e.properties?.error === 'Database connection failed');

  // Verify Project Name and other PII are STRIPPED
  assert.ok(userActionEvent, 'User action event should be tracked');
  assert.strictEqual(userActionEvent?.properties?.projectName, undefined, 'Project name should be sanitized');
  assert.strictEqual(userActionEvent?.properties?.password, undefined, 'Password should be sanitized');
  assert.strictEqual(userActionEvent?.properties?.token, undefined, 'Token should be sanitized');
  assert.strictEqual(userActionEvent?.properties?.secret, undefined, 'Secret should be sanitized');

  // Verify Stack Trace is STRIPPED
  assert.ok(errorEvent, 'Error event should be tracked');
  assert.strictEqual(errorEvent?.properties?.stack, undefined, 'Stack trace should be sanitized');
});
