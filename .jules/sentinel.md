## 2025-02-23 - Add authentication to admin endpoints
**Vulnerability:** Missing authentication on sensitive endpoints (`/api/analytics` and `/api/metrics`).
**Learning:** These endpoints were completely open to the public, exposing sensitive metrics and analytics data about the application and users.
**Prevention:** Always require authentication on admin or sensitive endpoints using API keys or proper auth headers.
