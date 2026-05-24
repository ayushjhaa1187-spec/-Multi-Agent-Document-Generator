## 2025-01-24 - Information Exposure in Observability Endpoints
**Vulnerability:** The `/api/analytics` endpoint exposed un-sanitized internal analytics events directly to clients, including full server-side error stack traces.
**Learning:** Returning observability data directly from internal trackers (like `AnalyticsTracker`) via APIs without sanitization at the boundary can unintentionally expose sensitive server internals, as internal trackers often (and correctly) log verbose details like stack traces for debugging.
**Prevention:** Always sanitize internal observability data (e.g., stripping `stack` traces) at the API response level before returning it to clients, ensuring internal observability is not degraded while preventing information exposure.
