## 2026-06-01 - Prevent Error Stack Trace Leakage in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed raw error stack traces tracked by the analytics system to the client.
**Learning:** Returning observability data directly from backend tracking classes without sanitizing it at the API layer risks exposing internal server structures.
**Prevention:** Always sanitize sensitive properties (like stack traces) from analytics events before serialization at the API boundary, ideally using object destructuring to safely omit properties without mutating internal state.
