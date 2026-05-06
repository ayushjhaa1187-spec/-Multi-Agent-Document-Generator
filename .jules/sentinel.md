## 2025-05-06 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The internal `AnalyticsTracker.trackError()` method captured full error stack traces, and the `/api/analytics` endpoint publicly exposed these internal server stack traces in its response under `recentEvents`.
**Learning:** We need to balance internal observability with external security. Removing stack traces at the tracking level degrades internal visibility, but passing them unfiltered through API endpoints exposes sensitive server internals.
**Prevention:** Always sanitize API responses that rely on internal tracking data by explicitly removing sensitive properties like `stack` traces before returning them to the client.
