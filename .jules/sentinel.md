## 2025-02-14 - Add authentication to analytics and metrics endpoints
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints were publicly exposed without any authentication, leaking potentially sensitive application data (metrics, events, session info) to anyone.
**Learning:** In Next.js applications, API routes are publicly accessible by default unless explicitly protected. It's crucial to implement authorization checks, especially for administrative or monitoring endpoints.
**Prevention:** Always require and validate an authentication token (like a Bearer token mapped to an environment secret) on endpoints that expose system data or metrics. Ensure the secret is configured in both the code wrapper and `.env` template.
