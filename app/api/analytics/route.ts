import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  // Security Enhancement: Sanitize events to prevent leaking sensitive info like stack traces
  const recentEvents = analyticsTracker.getEvents(20).map((event) => {
    if (event.properties && event.properties.stack) {
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
