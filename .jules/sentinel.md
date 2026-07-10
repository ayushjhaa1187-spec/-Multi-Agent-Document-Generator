## 2026-07-10 - Missing Authentication on Internal APIs
**Vulnerability:** Internal system endpoints (`/api/analytics` and `/api/metrics`) were publicly accessible without any authentication, exposing potentially sensitive application health and usage data.
**Learning:** Internal tooling and monitoring endpoints are easily forgotten during initial development. Next.js App Router API routes default to public access unless explicitly guarded. Relying on obscurity (unguessable URLs) is insufficient.
**Prevention:** All non-public APIs must explicitly check authentication headers or session state. Introduce an environment variable (e.g., `ADMIN_SECRET`) to authorize internal metrics scraping or admin views, and ensure it is checked securely (`if (!ENV.ADMIN_SECRET || ...)`).
