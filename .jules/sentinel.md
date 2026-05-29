## 2024-05-18 - Fix Information Exposure in Analytics API
**Vulnerability:** The GET endpoint at `/api/analytics` was returning raw event properties, which included server-side error stack traces, directly exposing server internals and file paths to the public via the API.
**Learning:** Raw analytics events often contain sensitive debug info (like stack traces) intended for internal observability. Directly exposing these internal structures in external-facing API endpoints risks information leakage.
**Prevention:** Always sanitize observability data (e.g., stripping `stack` traces) at the API response level using safe, immutable patterns like object destructuring assignment with the rest operator, rather than degrading internal tracking.
