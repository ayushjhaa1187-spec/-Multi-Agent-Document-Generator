## 2024-05-24 - Stack Trace Leakage in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed internal server stack traces to external users because it directly returned raw analytics events that included error stack properties.
**Learning:** Exposing internal observability data (like AnalyticsTracker events) via API endpoints without sanitizing sensitive server internals at the response level creates an information exposure vulnerability.
**Prevention:** Always sanitize sensitive server internals (like stack traces) at the API response level rather than disabling internal tracking, preventing information exposure without degrading observability.
