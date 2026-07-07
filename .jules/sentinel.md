## 2024-07-08 - Missing Authentication on Sensitive Analytics API
**Vulnerability:** The `/api/analytics` endpoint was completely unauthenticated, exposing session information, internal events, and errors containing server stack traces to unauthenticated users.
**Learning:** Adding a secret token check must include explicit verification that the configured secret is non-empty (e.g., `!ENV.ADMIN_SECRET`). Otherwise, an unconfigured empty secret in production could lead to an authentication bypass where providing no token or an empty string evaluates to true.
**Prevention:** Always implement authentication on endpoints exposing internal usage or error data, and use strict feature detection/validation for secret keys before performing authorization string comparisons.
