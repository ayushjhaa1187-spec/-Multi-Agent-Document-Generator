## 2025-02-14 - Removed Stack Trace from Error Tracking

**Vulnerability:** The analytics tracker in `lib/analytics.ts` captured stack traces from errors using `trackError`, which were then exposed publicly without authentication via the `/api/analytics` endpoint via `getEvents`.
**Learning:** Security incidents can happen when internal monitoring systems unknowingly leak sensitive information (stack traces contain environment paths, module structures, and variable contexts).
**Prevention:** Remove stack traces from captured error events by not saving `.stack` on `error` events in analytics or stripping it when exposing tracking data externally. Defense in depth: sanitize monitoring output and don't assume logs remain strictly internal.
