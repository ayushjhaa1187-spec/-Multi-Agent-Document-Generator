## 2024-05-19 - Fix stack trace exposure in analytics API
**Vulnerability:** Internal stack traces from `analyticsTracker` were being exposed via the `GET /api/analytics` API endpoint.
**Learning:** Even when errors are caught and logged properly internally, exposing the raw properties of observability events over public APIs can lead to information disclosure.
**Prevention:** Always sanitize observability and error data at the API boundary, removing sensitive properties like `stack` before returning responses to the client.