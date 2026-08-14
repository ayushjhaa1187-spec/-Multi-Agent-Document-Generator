import { describe, it } from 'node:test';
import assert from 'node:assert';
import { GET as getMetrics } from './metrics/route';
import { GET as getAnalytics } from './analytics/route';

describe('Admin Endpoints - Security Validation', () => {
  it('should return 401 for /api/metrics if missing auth header', async () => {
    const req = new Request('http://localhost/api/metrics');
    const res = await getMetrics(req);
    assert.strictEqual(res.status, 401);
  });

  it('should return 401 for /api/analytics if missing auth header', async () => {
    const req = new Request('http://localhost/api/analytics');
    const res = await getAnalytics(req);
    assert.strictEqual(res.status, 401);
  });
});
