## 2024-05-02 - Analytics Stack Trace Leakage

**Vulnerability:** The unauthenticated, publicly accessible `/api/analytics` endpoint returns analytics events, including detailed stack traces from any errors caught and tracked via `analyticsTracker.trackError()`.
**Learning:** Combining internal error tracking (which typically captures rich debug info like stack traces) with an unauthenticated public metrics dashboard creates a direct path for exposing sensitive server internals to unauthorized users.
**Prevention:** Never include `error.stack` or raw unhandled exception details in tracking events if those events can be queried via unauthenticated or externally facing APIs. Ensure error trackers sanitize payloads to contain only safe, high-level messages.
