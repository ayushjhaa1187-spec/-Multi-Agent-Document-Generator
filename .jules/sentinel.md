## 2024-05-18 - Missing Authentication on Internal API Endpoints
**Vulnerability:** Internal monitoring and analytics endpoints (`/api/analytics` and `/api/metrics`) were publicly accessible without any authentication, exposing potentially sensitive system and user metrics.
**Learning:** Even internal diagnostic endpoints can leak valuable information (such as system load, error rates, or internal usage data).
**Prevention:** Always require administrative authentication for any endpoints that expose system metrics, logs, or aggregate analytics to prevent information disclosure.
