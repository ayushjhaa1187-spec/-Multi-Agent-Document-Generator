## 2025-04-29 - Analytics Error Exposure

**Vulnerability:** The `AnalyticsTracker.trackError()` method recorded complete Error stack traces in memory. Because `app/api/analytics/route.ts` publicly exposes the recent events via a GET request without authentication, these stack traces (which can contain sensitive file paths, dependency versions, and server environment structure) were accessible to anyone.
**Learning:** In-memory analytics tracking shouldn't treat all data as purely internal, especially if that data is ever serialized and exposed over a public API endpoint.
**Prevention:** Sanitize or omit sensitive error details (like `.stack`) at the recording source before they enter a generalized event stream, or ensure analytics endpoints are strictly authenticated and authorized.
