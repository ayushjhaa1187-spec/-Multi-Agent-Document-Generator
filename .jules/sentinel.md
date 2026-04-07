## 2026-04-07 - Public Analytics Endpoint Exposing Internal Logging Structures
**Vulnerability:** The unauthenticated `/api/analytics` endpoint exposed internal logging structures, specifically stack traces, when errors were recorded using `analyticsTracker.trackError`.
**Learning:** In-memory caching and logging structures that are exposed publicly must be thoroughly sanitized, as default error logging often includes sensitive server-side information (like file paths and execution context) in stack traces.
**Prevention:** Avoid attaching raw error objects or stack traces to analytics events that will be served by public endpoints. Instead, explicitly extract and log only safe properties (e.g., error messages) and retain full stack traces in secure server-side logging mechanisms.
