## 2024-06-08 - Prevent Stack Trace Leakage in Analytics Export
**Vulnerability:** The analytics tracker's `getEvents` function returned internal event properties unmodified, exposing sensitive system error stack traces via API endpoints that exported these logs.
**Learning:** Analytics libraries and internal event systems often persist error object properties including `stack` indiscriminately. When exporting these structures via public or semi-public endpoints (e.g., `/api/analytics`), the raw internal error contexts become inadvertently visible.
**Prevention:** Use defensive copying and destructuring (e.g., `const { stack, ...safeProperties } = properties`) to strip sensitive attributes from objects before returning or serializing them for external consumption.
