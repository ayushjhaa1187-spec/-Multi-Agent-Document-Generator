## 2023-10-24 - Missing Authentication on Sensitive Endpoints
**Vulnerability:** Missing authentication on `/api/analytics` and `/api/metrics` endpoints, exposing sensitive application telemetry and internal metrics.
**Learning:** Development-focused internal APIs can easily be left exposed to the public if authentication isn't explicitly configured. Next.js App Router defaults to public access unless guarded.
**Prevention:** Always implement an authentication middleware or explicitly check for an authentication token (e.g., `ADMIN_SECRET`) in route handlers that expose system metrics or telemetry data.
