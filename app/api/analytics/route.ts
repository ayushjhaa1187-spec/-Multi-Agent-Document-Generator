import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  return new Response(
    JSON.stringify({
      session: sessionInfo,
      metrics,
      recentEvents: analyticsTracker.getEvents(20).map(event => {
        if (event.properties && 'stack' in event.properties) {
          const { stack, ...safeProperties } = event.properties;
          return { ...event, properties: safeProperties };
        }
        return event;
      }),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
