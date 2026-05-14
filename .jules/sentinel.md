## 2025-02-14 - Information Exposure via Analytics API

**Vulnerability:** The internal `AnalyticsTracker` intentionally captured server-side error `stack` traces for backend monitoring. However, the `/api/analytics` endpoint exposed these raw events directly to clients, leaking sensitive server execution paths and internals.
**Learning:** Internal observability mechanisms often record sensitive diagnostic data that is unsafe for external consumption. Directly piping internal state or events to API responses bypasses the necessary boundary sanitization.
**Prevention:** When exposing internal monitoring data via API endpoints, always apply an explicit data transfer object (DTO) mapping or sanitization step at the API boundary to strip sensitive properties like `stack` traces, rather than degrading internal tracking.
