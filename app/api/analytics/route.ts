import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  const rawEvents = analyticsTracker.getEvents(20);
  const sanitizedEvents = rawEvents.map(event => {
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
      recentEvents: sanitizedEvents,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
