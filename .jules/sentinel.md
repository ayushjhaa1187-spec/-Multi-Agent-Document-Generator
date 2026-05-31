## 2025-01-21 - Fix Error Stack Trace Leakage in Analytics API
**Vulnerability:** The unauthenticated `/api/analytics` endpoint exposed server stack traces by returning raw event logs.
**Learning:** Returning unsanitized observability data directly from internal trackers to API responses is dangerous; server internals must always be scrubbed before crossing the API boundary.
**Prevention:** Always sanitize sensitive properties (like `stack`) using safe immutable operations (like rest destructuring) at the API response level before returning tracking data.
