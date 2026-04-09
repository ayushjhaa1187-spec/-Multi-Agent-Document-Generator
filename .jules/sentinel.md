## 2025-01-30 - Prevent Stack Trace Exposure in Analytics

**Vulnerability:** The analytics tracking utility `lib/analytics.ts` exposed internal server stack traces to users by passing `error.stack` into tracked events via `trackError()`. The `/api/analytics` endpoint could then expose this information publicly since it served recent tracked events without sanitization.

**Learning:** Internal logging or metrics gathering shouldn't expose raw errors or `stack` strings when there is a risk of this internal state being queried or exposed publicly. While full error objects and stack traces should be retained in internal server-side logs (e.g., `console.error` in API routes) to preserve observability for debugging, they must be sanitized from public-facing analytics or client endpoints.

**Prevention:** Ensure any errors tracked with an in-memory cache or public-facing tracking utilities are sanitized before adding them to tracked events. Avoid exposing `error.stack` or similar internals publicly.
