## 2026-05-22 - [Prevent Error Stack Trace Leakage]
**Vulnerability:** The analytics endpoint exposes raw events, which can contain error stack traces from internal servers.
**Learning:** When exposing internal observability data (like AnalyticsTracker events) via API endpoints, sensitive server internals like stack traces must be sanitized at the API response level.
**Prevention:** Use object destructuring assignment to safely omit sensitive properties from responses without mutating original objects.
