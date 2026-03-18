## 2025-02-17 - Stop Leaking Stack Traces to Unauthenticated Analytics Endpoint
**Vulnerability:** The internal analytics tracker stored error stack traces in-memory (`lib/analytics.ts`), which were subsequently exposed without authentication on a public GET endpoint (`app/api/analytics/route.ts`).
**Learning:** In-memory caching/logging structures must be sanitized exactly like database models before storage if they will ever be exposed via metrics/monitoring APIs.
**Prevention:** Always log full error details locally to standard output/error (e.g., `console.error`) for observability, and strictly limit the properties added to event payloads passed to tracking methods.
