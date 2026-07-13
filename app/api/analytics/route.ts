import { analyticsTracker } from '@/lib/analytics';
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
