## 2024-05-16 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The `/api/analytics` endpoint directly exposed raw analytics events, which included internal server stack traces from error tracking.
**Learning:** Returning raw observability data (like internal event logs) directly to clients via API can unintentionally leak sensitive system details.
**Prevention:** Always sanitize internal event data at the API response level before returning it to the client, specifically removing properties like `stack` traces.
