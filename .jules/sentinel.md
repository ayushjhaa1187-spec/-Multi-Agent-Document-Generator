## 2024-05-24 - Prevent Stack Trace Leakage in API Endpoints
**Vulnerability:** The `/api/analytics` endpoint exposed full error stack traces in its response by directly serializing tracked error events.
**Learning:** When internal tracking methods like `analyticsTracker.trackError()` store sensitive data (e.g., stack traces) for observability, exposing the raw event data through an API endpoint inadvertently leaks server internals.
**Prevention:** Always sanitize observability data at the API boundary before returning it in HTTP responses. Strip properties like `stack` from error event payloads.
