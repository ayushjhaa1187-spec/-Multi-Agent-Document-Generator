## 2025-05-05 - Sanitize Stack Traces at API Boundary
**Vulnerability:** The publicly accessible `/api/analytics` endpoint leaked sensitive server internals by exposing `error.stack` inside `recentEvents`.
**Learning:** Stack traces are useful for internal logging but must be sanitized at the API boundary to maintain observability while preventing external leakage.
**Prevention:** Always filter out or sanitize `error.stack` and other sensitive fields from error objects before returning them in API responses.
