## 2025-02-17 - Add Authentication to Internal Endpoints
**Vulnerability:** Internal analytics and metrics API endpoints lacked authentication, exposing sensitive application usage and performance data to unauthorized users.
**Learning:** All endpoints, even those meant for internal monitoring or tooling, must implement proper authorization checks. Security by obscurity or assuming endpoints won't be discovered is not a valid defense strategy.
**Prevention:** Always require and validate an authorization token (e.g., `ADMIN_SECRET`) in API routes that expose internal or sensitive data, ensuring the secret is configured before validating.
