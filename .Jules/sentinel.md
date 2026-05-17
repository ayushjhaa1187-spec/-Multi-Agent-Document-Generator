## 2024-05-18 - Fix Information Exposure via Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed un-sanitized analytics events to the client, which included internal server error stack traces.
**Learning:** While keeping detailed error stack traces server-side is essential for debugging, exposing these internal event structures directly through API endpoints leaks sensitive system information.
**Prevention:** Always sanitize observability data objects at the API response boundary using object destructuring (e.g., `const { stack, ...safeProperties } = properties;`) rather than disabling the internal tracking.
