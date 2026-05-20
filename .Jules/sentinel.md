## 2024-05-20 - Sanitize Stack Traces in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed full error stack traces in the `recentEvents` array, leaking internal server details to potential attackers.
**Learning:** Internal observability data (like error events with stack traces) must be sanitized before being exposed through public or external-facing API endpoints.
**Prevention:** Use object destructuring (`const { stack, ...safeProperties } = properties`) to safely omit sensitive properties from response objects without mutating internal state.
