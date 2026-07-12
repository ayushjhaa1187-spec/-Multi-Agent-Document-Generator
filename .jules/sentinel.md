## 2025-07-12 - [Missing Authentication on Internal Endpoints]
**Vulnerability:** Internal endpoints (`/api/analytics` and `/api/metrics`) were accessible without authentication, exposing application telemetry, health, and recent events.
**Learning:** Internal observability routes must not be left unprotected, as they can leak sensitive metrics and user actions.
**Prevention:** Always implement basic authentication or token-based authorization checks for all observability and administrative endpoints.
