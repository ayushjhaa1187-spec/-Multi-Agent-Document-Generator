# Sentinel Security Journal

## 2024-05-24 - Do Not Expose Stack Traces in Analytics
**Vulnerability:** The `AnalyticsTracker.trackError` method in `lib/analytics.ts` captured and included the full `error.stack` inside event properties. This stored the stack trace in an in-memory event array and printed it to `console.log`.
**Learning:** Error logs and analytics events are frequently exposed via metrics APIs (like `/api/analytics`) or aggregated log systems. Including stack traces reveals sensitive information about the underlying server infrastructure, file paths, and application flow.
**Prevention:** Never include `error.stack` or raw error objects in outgoing event properties, error tracking payloads, or client-facing responses. Instead, sanitize the error logging by only including `error.message` or `String(error)`.
