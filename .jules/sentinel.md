## 2024-05-26 - Prevent Information Exposure in Analytics API
**Vulnerability:** The analytics API endpoint (`/api/analytics/route.ts`) exposed internal server error stack traces directly to the public through the recent events array.
**Learning:** Exposing internal observability data without sanitization at the API response boundary creates an information disclosure risk, potentially revealing internal system architecture.
**Prevention:** Always sanitize sensitive server internals like stack traces at the API response level using safe destructuring patterns, rather than disabling internal tracking, to prevent information exposure without degrading observability.
