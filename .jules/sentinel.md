## 2024-05-04 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The Analytics API (`/api/analytics`) publicly exposed the full error stack traces tracked by the `AnalyticsTracker` when returning tracked events.
**Learning:** To prevent leaking sensitive server internals without crippling internal observability, stack traces must be collected internally but sanitized at the API boundary before being exposed to unauthenticated clients.
**Prevention:** Sanitize error telemetry structures (e.g., stripping `stack` properties) when retrieving data for public-facing API routes, rather than removing collection entirely.
