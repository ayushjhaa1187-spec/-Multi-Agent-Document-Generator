import { analyticsTracker } from '@/lib/analytics';

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  // Ensure we don't leak potentially sensitive properties from events
  const sanitizedEvents = analyticsTracker.getEvents(20).map(event => {
    const safeEvent = { ...event };
    if (safeEvent.properties) {
      // Create a shallow copy to avoid mutating the original
      safeEvent.properties = { ...safeEvent.properties };
      // Explicitly remove sensitive fields if they somehow got added
      delete safeEvent.properties.stack;
      delete safeEvent.properties.password;
      delete safeEvent.properties.token;
    }
    return safeEvent;
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
