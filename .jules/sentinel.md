## 2024-05-08 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The public `/api/analytics` endpoint exposed internal server stack traces through the `recentEvents` array because `analyticsTracker` stores full error objects.
**Learning:** Centralized error trackers often collect sensitive debugging information (like stack traces) that should remain internal. Exposing this raw data directly via public APIs risks leaking system internals.
**Prevention:** Always sanitize or filter telemetry and error data at the API boundary before returning it to the client, or restrict access to such endpoints using authentication.
