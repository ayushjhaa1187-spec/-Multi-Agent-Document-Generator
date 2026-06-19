## 2025-02-27 - Remove Stack Trace from Analytics Endpoint
**Vulnerability:** The `/api/analytics` endpoint exposed full error stack traces in its response because it blindly returned all events, which might contain error stacks via `trackError()`.
**Learning:** Returning objects with nested sensitive properties requires explicit sanitization. Filtering or transforming objects during output ensures defense in depth against information disclosure.
**Prevention:** Always sanitize API responses by explicitly removing or filtering out sensitive properties (like stack traces, internal IDs, or secrets) using rest operators or explicit mapping, even for supposedly internal admin endpoints.
