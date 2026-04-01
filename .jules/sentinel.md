## 2024-04-01 - Prevent Information Disclosure via Public Analytics Endpoints

**Vulnerability:** The in-memory `AnalyticsTracker` was previously capturing full `Error.stack` traces and storing them within the analytics event queue. Because these events were directly exposed via an unauthenticated, public endpoint (`/api/analytics/route.ts`), there was a high risk of leaking sensitive application internals (file paths, dependency versions, internal structures).

**Learning:** Internal server metrics and client-facing API endpoints must be decoupled concerning sensitive data. When building telemetry or analytic services that are accessible publicly, we must consider that any captured diagnostic data (such as stack traces) becomes a vector for information disclosure.

**Prevention:** Ensure any in-memory data that might be exposed publicly is strictly sanitized before storage. Retain sensitive and verbose diagnostic info (like stack traces) in server-side logs (`console.error` or dedicated logging files/services) but remove them from the structured payload exposed externally.
