## 2025-07-25 - Fix missing authentication on analytics/metrics endpoints
**Vulnerability:** Internal endpoints (/api/analytics and /api/metrics) exposing sensitive metrics and session information were completely unauthenticated.
**Learning:** Endpoints meant for internal monitoring or administrative use must have explicit authentication and authorization checks implemented, rather than assuming they won't be discovered.
**Prevention:** Always implement an explicit authentication layer (e.g., checking an admin secret or JWT token) on API routes that expose internal system state or analytics, even if they aren't linked in the public UI.
