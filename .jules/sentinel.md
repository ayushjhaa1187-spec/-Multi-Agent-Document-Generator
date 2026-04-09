## 2026-03-23 - Prevent stack trace exposure in public analytics API
**Vulnerability:** Storing sensitive data (stack traces) in in-memory structures that are subsequently exposed via an unauthenticated GET endpoint (`app/api/analytics/route.ts`).
**Learning:** In-memory caching and logging structures used by client endpoints must be sanitized to remove sensitive information like stack traces before storage, as they may be exposed via metrics APIs.
**Prevention:** Full error objects and stack traces should be retained in internal server-side logs (e.g., `console.error`), and only sanitized, generic error details should be tracked in client-facing analytics structures.
