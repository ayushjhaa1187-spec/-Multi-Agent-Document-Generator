## 2024-05-18 - Stack Trace Exposure in Public Analytics Endpoint
**Vulnerability:** The `AnalyticsTracker` stored error stack traces in its in-memory `events` array, which were then exposed publicly without authentication via the `/api/analytics` endpoint.
**Learning:** In-memory caching and logging structures that are exposed to clients or public APIs must be sanitized. Sensitive information like full stack traces should only be retained in internal server-side logs.
**Prevention:** Remove sensitive properties (like `stack`) from tracking objects before adding them to in-memory arrays. Implement internal logging (`console.error`) explicitly for debugging purposes rather than relying on the analytics payload.
