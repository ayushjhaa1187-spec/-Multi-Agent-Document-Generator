## 2024-07-06 - Missing Authentication on Internal/Metrics APIs
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints were completely unauthenticated, exposing application usage metrics, session details, and potentially sensitive error traces to the public.
**Learning:** Even internal monitoring APIs must be secured if they are exposed on a public-facing web server, as they can leak sensitive data (stack traces, environment context) to attackers.
**Prevention:** Implement a standard authentication mechanism (e.g., Bearer token with an admin secret) on all internal and admin API routes by default, and fail securely if the secret is unconfigured.
