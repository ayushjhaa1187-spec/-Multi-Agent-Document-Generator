## 2024-05-14 - Fix Stack Trace Leakage in Analytics API

**Vulnerability:** Information disclosure (stack traces) via unauthenticated analytics endpoint (`app/api/analytics/route.ts`). The `trackError` method in `lib/analytics.ts` was capturing full error stack traces and storing them in an in-memory event array. This array was then exposed publicly via the analytics API route, allowing anyone to view internal system paths and implementation details.

**Learning:** When building an API or service that exposes recent system events or errors (e.g., for public metrics or client-side monitoring), it's crucial to distinguish between internal debugging logs and public events. Sensitive information, like stack traces or system environment variables, must be aggressively sanitized from any structure that could be queried by an unauthenticated (or lower-privilege) endpoint.

**Prevention:** To prevent this in the future:
1.  **Sanitize Output:** Ensure that data passed to centralized stores (like the `AnalyticsTracker`'s event array) is strictly sanitized, containing only high-level summary information.
2.  **Separate Logging Paths:** Use standard server-side mechanisms (e.g., `console.error`, standard logging libraries) for internal debugging which should never be exposed to public or client-side APIs.
3.  **Validate Exposed Data:** Regularly audit any API route that returns in-memory state or logs to confirm no sensitive fields (like `stack` or `headers`) are being serialized.