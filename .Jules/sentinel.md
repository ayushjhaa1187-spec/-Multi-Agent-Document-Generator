## 2025-02-18 - [Insecure Analytics Exposure]
**Vulnerability:** The in-memory `AnalyticsTracker` stored raw event properties (including PII like project names) and error stack traces, which were then exposed via the public `/api/analytics` endpoint.
**Learning:** Centralized analytics utilities must sanitize data before storage, especially if the storage is exposed via API. Developers often overlook internal tools as attack vectors.
**Prevention:** Implemented a centralized sanitization mechanism in `lib/analytics.ts` to strip sensitive keys and stack traces from all events before storage.
