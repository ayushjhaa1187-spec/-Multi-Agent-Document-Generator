import { getAllMetrics, getAverageResponseTime } from '@/lib/performance';
import { ENV } from '@/lib/env';

export async function GET(req: Request) {
  // Security: Require admin authentication and prevent bypass with empty secret
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!ENV.ADMIN_SECRET || token !== ENV.ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const metrics = getAllMetrics();
  const avg = getAverageResponseTime('/api/chat');

  return new Response(
    JSON.stringify({
      average_response_time_ms: avg,
      threshold_ms: 500,
      is_healthy: avg < 500,
      metrics_count: metrics.length,
      last_10_metrics: metrics.slice(-10),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
