## 2024-08-14 - Missing Authentication on Internal/Admin API Endpoints
**Vulnerability:** The internal `/api/metrics` and `/api/analytics` endpoints were completely unauthenticated, exposing potentially sensitive application data and session information.
**Learning:** In a Next.js App Router API environment, all routes are public by default unless explicitly protected. Internal admin or monitoring endpoints must have authentication applied, even if they seem innocuous.
**Prevention:** Implement an authorization check (e.g. `ADMIN_SECRET` Bearer token validation) in all sensitive/admin API route handlers before processing the request.
