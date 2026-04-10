
## 2024-05-18 - Prevent Stack Trace Leakage via Analytics API
**Vulnerability:** The in-memory `AnalyticsTracker` was storing full Error stack traces when `trackError` was called. These cached events were publicly exposed via the unauthenticated `/api/analytics` endpoint, leading to the potential leakage of sensitive server/codebase internals.
**Learning:** In-memory caching and logging structures that feed into public endpoints must be strictly sanitized to remove sensitive data like stack traces, even if that data is useful for debugging.
**Prevention:** Sanitize event payloads before storing them in memory if they are accessible publicly. Log full error details (including stack traces) securely via internal server-side logging (e.g., `console.error`) to preserve observability without compromising security.
