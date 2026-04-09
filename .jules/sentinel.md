## 2024-05-18 - Exposed Stack Traces via Public Analytics API
**Vulnerability:** The application stored full error stack traces in an in-memory `AnalyticsTracker` which were then exposed publicly via an unauthenticated `GET /api/analytics` endpoint.
**Learning:** In-memory caching and logging structures that are wired up to public metric APIs must be aggressively sanitized, as they bypass standard log-viewing access controls. Internal server logs (e.g. `console.error`) should still retain full error context for observability.
**Prevention:** Sanitize event objects before storing them in memory if they are intended for metric endpoints. Never store `error.stack` or other sensitive system details in arrays accessible by public-facing routes.
