## 2024-05-28 - Sanitize Analytics Event Properties

**Vulnerability:** The `/api/analytics` endpoint directly returns recent analytics events, which may contain error stack traces in the `properties.stack` field, leading to potential information exposure.
**Learning:** Internal observability data like stack traces should be sanitized at the API response level before being exposed, rather than disabling internal tracking entirely, to preserve internal observability while maintaining security.
**Prevention:** Use object destructuring with the rest operator (`const { stack, ...safeProperties } = properties;`) to safely omit sensitive properties from objects before returning them in API responses.
