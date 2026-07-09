## 2026-07-09 - Add Admin Authentication to Metrics and Analytics Endpoints
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints were completely unauthenticated, exposing potentially sensitive application usage and performance data to anyone.
**Learning:** When implementing authentication using environment variables, an unconfigured secret (empty string) can cause an authentication bypass if not explicitly handled (e.g. `if (!SECRET || ...)`).
**Prevention:** Always require authentication on admin/internal endpoints and explicitly check that the required secret environment variable is configured and non-empty before comparison.
