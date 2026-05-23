
## 2025-01-27 - Fix Information Exposure in Analytics API
**Vulnerability:** The `/api/analytics` endpoint directly exposed raw event objects, which included Node.js stack traces for error events, leaking internal server paths and implementation details.
**Learning:** Internal observability objects (like analytics events) might hold sensitive data (e.g. stacks). Simply passing them straight to a public API endpoint creates an information exposure risk.
**Prevention:** Always sanitize sensitive properties (like `stack`) at the API response boundary (using rest element destructuring) rather than disabling internal tracking, ensuring observability is maintained while protecting internal details.
