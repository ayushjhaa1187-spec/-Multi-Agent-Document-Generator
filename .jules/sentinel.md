
## 2024-05-23 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed un-sanitized analytics events, which included internal server error stack traces.
**Learning:** Even internal observability endpoints must sanitize sensitive properties (like `stack`) before exposing them to clients.
**Prevention:** When exposing internal event logs or analytics via API, explicitly map over the data and use object destructuring (`const { stack, ...safe } = props`) to strip sensitive server internals.
