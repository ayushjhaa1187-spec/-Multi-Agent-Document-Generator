## 2026-03-25 - Information Exposure in Analytics Endpoints
**Vulnerability:** The unauthenticated `GET /api/analytics` endpoint exposed full error stack traces to the public, as `lib/analytics.ts` stored error stack traces in-memory within event arrays.
**Learning:** In-memory caching/logging mechanisms may inadvertently combine sensitive diagnostic data with public-facing metrics, leading to unintended information exposure.
**Prevention:** Sanitize sensitive properties (like stack traces) from any data structure destined for public APIs *before* storage. Ensure internal logging (e.g., `console.error`) preserves the details for observability instead of mixing it with external metrics.
