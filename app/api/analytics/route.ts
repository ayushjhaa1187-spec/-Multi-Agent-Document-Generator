import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  // Security Fix: Sanitize observability data by removing stack traces before returning via API
  const recentEvents = analyticsTracker.getEvents(20).map((event) => {
    if (event.properties && 'stack' in event.properties) {
      const { stack, ...safeProperties } = event.properties;
      return { ...event, properties: safeProperties };
    }
    return event;
  });

  return new Response(
    JSON.stringify({
      session: sessionInfo,
      metrics,
      recentEvents,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
