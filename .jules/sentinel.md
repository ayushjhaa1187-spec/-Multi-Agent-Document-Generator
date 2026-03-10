## 2024-03-10 - Stack trace exposure via analytics API
**Vulnerability:** The `AnalyticsTracker` stored `error.stack` in memory, which was exposed publicly by the `/api/analytics` endpoint.
**Learning:** In-memory caching and logging structures exported and queried by metrics endpoints can inadvertently leak sensitive internal details like stack traces.
**Prevention:** Always sanitize error data and strip stack traces before pushing them into structures exposed by API endpoints. Full traces should be kept exclusively in internal server-side logs.
