
## 2024-05-16 - Prevent Stack Trace Leakage in Observability APIs
**Vulnerability:** The `/api/analytics` endpoint exposed sensitive server internals by returning unfiltered `stack` traces in the `recentEvents` JSON payload.
**Learning:** Observability mechanisms that track rich error contexts (like `AnalyticsTracker`) often become information exposure vectors when their raw data is blindly serialized and exposed via external-facing APIs without a sanitization layer.
**Prevention:** Always sanitize sensitive properties (like `stack`) at the API response boundary using object destructuring assignment with the rest operator before returning data to the client, preserving the rich internal telemetry while securing the external API.
