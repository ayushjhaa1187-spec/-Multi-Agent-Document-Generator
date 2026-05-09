## 2024-05-09 - Information Exposure via Analytics API
**Vulnerability:** The publicly accessible `/api/analytics` endpoint exposes the internal `events` array, which includes `trackError` events containing raw stack traces (`error.stack`) of application errors. This exposes internal server details to unauthenticated users.
**Learning:** While collecting stack traces for analytics is useful, returning raw analytics data containing them via an unauthenticated, public API endpoint inadvertently creates an information leak.
**Prevention:** Sanitize stack traces or other sensitive data at the API response level rather than disabling their collection, or better, require authentication for any endpoint exposing internal telemetry.
