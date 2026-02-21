import { getAllMetrics, getAverageResponseTime } from '@/lib/performance';

export async function GET() {
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
