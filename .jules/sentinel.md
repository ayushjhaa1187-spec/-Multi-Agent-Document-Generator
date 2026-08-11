## 2024-08-11 - Prevent leaking error stack trace in AnalyticsTracker
**Vulnerability:** The AnalyticsTracker exposes `error.stack` inside analytics events, which can be queried via `GET /api/analytics` endpoint. This could leak sensitive internal environment structures.
**Learning:** `error.stack` is logged in internal catch blocks and ends up in the analytics tracker which has an unauthenticated `GET /api/analytics` route.
**Prevention:** Avoid putting `.stack` on analytics events that are publicly reachable, or omit it altogether.
