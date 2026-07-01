## 2024-07-01 - Prevent Information Leakage in Shared Analytics Trackers
**Vulnerability:** The centralized analytics tracker recorded full Error stack traces, which are then exposed via the `/api/analytics` endpoint.
**Learning:** Even internal toolings or centralized observability modules must fail securely by omitting stack traces. If an endpoint exposes tracker data, any data inside the tracker is public.
**Prevention:** Always omit `error.stack` or similar environment-specific stack traces when storing data that may eventually be serialized to an API response or publicly exposed.
