
## 2026-05-21 - Stack Trace Leak in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed internal error stack traces because it directly returned raw events from the analytics tracker.
**Learning:** Server internal details (like stack traces) must be tracked for internal observability but must be sanitized at the API response boundary when exposed to clients.
**Prevention:** Always implement an explicit data sanitization step (e.g., stripping sensitive keys like `stack`) before returning internal tracking data via API endpoints.
