## 2026-07-19 - Added authentication to metrics and analytics endpoints
**Vulnerability:** Missing authentication on sensitive endpoints `/api/metrics` and `/api/analytics` that exposed system performance metrics and application analytics.
**Learning:** Internal observability endpoints (metrics, healthchecks, analytics) must be explicitly protected by authentication mechanisms, especially when they expose system internals or usage data.
**Prevention:** Always implement an authentication check (like an admin secret header) on endpoints meant only for internal/admin usage.
