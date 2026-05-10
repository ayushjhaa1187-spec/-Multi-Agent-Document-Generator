## 2024-05-24 - Fix Information Exposure in Analytics Endpoint
**Vulnerability:** The publicly accessible `/api/analytics` endpoint was exposing internal server stack traces through the `recentEvents` array because the analytics tracker logged them for internal use but the endpoint returned them unfiltered.
**Learning:** Internal observability mechanisms (like `AnalyticsTracker`) often capture sensitive data (like `error.stack`). Passing this internal state directly to public or minimally-authenticated API endpoints inadvertently leaks server internals.
**Prevention:** Always sanitize data structures returned by internal services before exposing them via external APIs. Sanitize at the API boundary, not by degrading the internal tracking utility.
