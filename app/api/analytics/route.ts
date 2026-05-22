import { analyticsTracker } from "@/lib/analytics";

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  // Sanitize events to prevent leaking sensitive internals like error stack traces
  const sanitizedEvents = analyticsTracker.getEvents(20).map((event) => {
    if (event.properties?.stack) {
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
      headers: { "Content-Type": "application/json" },
    },
  );
}
