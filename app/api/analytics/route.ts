import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  // Security Fix: Sanitize stack traces from recent events to prevent leakage
  const recentEvents = analyticsTracker.getEvents(20).map(event => {
    if (event.properties && 'stack' in event.properties) {
      const sanitizedProperties = { ...event.properties };
      delete sanitizedProperties.stack;
      return { ...event, properties: sanitizedProperties };
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
