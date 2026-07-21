import { analyticsTracker } from '@/lib/analytics';

export async function GET(req: Request) {
  // Security Fix: Add authentication to sensitive admin endpoint
  const authHeader = req.headers.get('authorization');
  if (!process.env.ADMIN_SECRET || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  return new Response(
    JSON.stringify({
      session: sessionInfo,
      metrics,
      recentEvents: analyticsTracker.getEvents(20),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
