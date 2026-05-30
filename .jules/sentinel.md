## 2024-05-30 - Prevent Stack Trace Leakage in API Analytics

**Vulnerability:** The `/api/analytics` endpoint exposed full error stack traces from internal `AnalyticsTracker` events via `getEvents()`.
**Learning:** Returning observability data directly from memory via API endpoints can inadvertently leak sensitive server internals, including path structures and internal logic within error objects.
**Prevention:** Always sanitize observability data at the API response boundary (e.g., by omitting `stack` properties) using immutable object destructuring. Do not turn off internal tracking to fix information leakage; filter at the output level instead.
