## 2024-03-24 - Missing Authentication on Internal/Admin API Endpoints
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints were accessible without any authentication, exposing internal application performance metrics and user analytics data.
**Learning:** In Next.js applications, API routes inside the `app/api/` directory are public by default unless explicitly protected. Internal diagnostic endpoints must be authenticated to prevent information disclosure.
**Prevention:** Always implement authentication checks (e.g., verifying an `ADMIN_SECRET` environment variable or checking valid session tokens) at the top of any route handler designed for internal monitoring or administrative use before exposing sensitive data.
