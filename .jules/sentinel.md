## 2025-02-14 - Prevent Stack Trace Leakage in Analytics Export
**Vulnerability:** The analytics tracker exports raw events via `getEvents()`, which could expose error stack traces containing sensitive internal file paths and system information when errors are tracked and exported.
**Learning:** Error details, particularly stack traces logged internally for analytics, should be sanitized before being exported to public or semi-public endpoints (like `GET /api/analytics`).
**Prevention:** Always strip sensitive information like error stack traces from objects when serializing them for export or API responses. Use object destructuring with the rest operator to remove sensitive fields cleanly.
