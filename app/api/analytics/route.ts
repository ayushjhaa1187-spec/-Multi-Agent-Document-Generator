import { analyticsTracker } from "@/lib/analytics";

export async function GET() {
  const metrics = analyticsTracker.getMetrics();
  const sessionInfo = analyticsTracker.getSessionInfo();

  const recentEvents = analyticsTracker.getEvents(20);

  // 🛡️ Sentinel: Sanitize stack traces from API responses to prevent leaking server internals
  const sanitizedEvents = recentEvents.map((event) => {
    if (event.properties?.stack) {
      const { stack, ...restProps } = event.properties;
      return { ...event, properties: restProps };
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
