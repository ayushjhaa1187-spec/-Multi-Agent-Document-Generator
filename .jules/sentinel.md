## 2024-05-04 - Information Disclosure in Analytics
**Vulnerability:** The `AnalyticsTracker.trackError()` method recorded error stack traces (`error.stack`), which were then exposed via the publicly accessible, unauthenticated `/api/analytics` endpoint.
**Learning:** It is dangerous to log full error objects, especially stack traces, in applications where the log data is exposed to users or unauthenticated API endpoints.
**Prevention:** Scrub stack traces and sensitive internal details before logging errors, ensuring only safe, user-facing error messages are recorded in analytics or public logs.
