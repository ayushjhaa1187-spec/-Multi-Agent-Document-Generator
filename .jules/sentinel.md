## 2024-05-27 - Information Exposure via Analytics API
**Vulnerability:** The public `/api/analytics` endpoint exposed internal server stack traces because `AnalyticsTracker` saved error stacks in event properties, which were then served un-sanitized.
**Learning:** Internal observability data should not be served directly to API clients. Sensitive properties like stack traces must be sanitized at the API response boundary.
**Prevention:** Always sanitize object properties (e.g., using destructuring assignment with the rest operator) before returning internal tracking data via public endpoints.
