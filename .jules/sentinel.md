## 2024-07-11 - Missing Authentication on Internal Analytics and Metrics API Endpoints
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints were completely unauthenticated, exposing sensitive metrics and event info to anyone making a request to those URLs.
**Learning:** Internal tooling and analytics endpoints are often forgotten when implementing global auth. Even if they don't contain PII, exposing operational metrics could give attackers insight into traffic or architecture.
**Prevention:** Always implement an authorization check (like an `ADMIN_SECRET` comparison against headers) for any endpoint exposing internal metrics, system state, or analytics.
