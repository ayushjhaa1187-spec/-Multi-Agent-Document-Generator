## 2024-04-05 - Public Analytics Endpoint Stack Trace Leak

**Vulnerability:** The `AnalyticsTracker` in `lib/analytics.ts` previously stored full error stack traces in its in-memory event array when tracking errors. Because these in-memory events are publicly exposed via the unauthenticated GET endpoint `app/api/analytics/route.ts`, this led to an information disclosure vulnerability where internal implementation details and code paths could be leaked to an attacker.

**Learning:** Internal structures used for observability (like event arrays) must be strictly separated from public-facing endpoints, or their contents must be rigorously sanitized. In this codebase, the `analyticsTracker` is used both for internal logging and public status reporting, which creates a dangerous crossover.

**Prevention:** Always sanitize sensitive data (like stack traces, user IDs, or environment details) before storing them in general-purpose structures that might be exposed via API routes. Use separate structures for internal-only detailed logs versus public metrics.
