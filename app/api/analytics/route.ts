import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  const rawEvents = analyticsTracker.getEvents(20);
  // Security Fix: Sanitize observability data to prevent Information Exposure.
  // Explicitly strip sensitive server 'stack' traces from the API response
  // to avoid leaking internal directory structures or application logic to the client.
  const sanitizedEvents = rawEvents.map(event => {
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
      recentEvents: sanitizedEvents,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
