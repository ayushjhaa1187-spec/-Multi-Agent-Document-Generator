import { ENV } from '@/lib/env';
import { analyticsTracker } from '@/lib/analytics';

export async function GET(request: Request) {
  // Security: Require admin authentication to prevent information disclosure
  const authHeader = request.headers.get('authorization');
  if (!ENV.ADMIN_SECRET || authHeader !== `Bearer ${ENV.ADMIN_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
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
