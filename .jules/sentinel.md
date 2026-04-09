## 2024-05-18 - Prevented Stack Trace Exposure in Analytics

**Vulnerability:** The analytics tracker in `lib/analytics.ts` captured and stored the full error stack traces. Because these events are stored in-memory and exposed publicly through the `/api/analytics` endpoint, this caused sensitive internal paths and application architecture details to be leaked.

**Learning:** When building centralized monitoring or caching structures (such as `analyticsTracker` events array), unsanitized full error objects should never be stored if that structure might be exposed via metrics or debugging APIs.

**Prevention:** Always sanitize error objects explicitly before passing them to analytics, logging, or monitoring structures. Do not map or destructure properties like `.stack` into public analytics payloads. Rely on internal server-side logging (e.g., `console.error`) for full stack trace observability instead.