import { analyticsTracker } from '@/lib/analytics';
import { ENV } from '@/lib/env';

export async function GET(req: Request) {
  // SECURITY: Require authentication for sensitive admin endpoint
  const authHeader = req.headers.get('authorization');
  if (!ENV.ADMIN_SECRET || !authHeader || authHeader !== `Bearer ${ENV.ADMIN_SECRET}`) {
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
