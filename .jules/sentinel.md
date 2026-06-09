## 2026-06-09 - Prevent stack trace leakage in analytics API
**Vulnerability:** The analytics endpoint `/api/analytics` was returning raw event properties which could include stack traces from recorded server-side exceptions.
**Learning:** System APIs that reflect internal diagnostic data to the frontend must actively sanitize payloads before responding. Even if an endpoint is intended for monitoring, uncaught error payloads may expose internal codebase paths.
**Prevention:** Explicitly filter out sensitive fields such as `stack` from error objects using object destructuring before serializing the response payload.
