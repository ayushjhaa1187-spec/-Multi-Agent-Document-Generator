## 2024-06-13 - Prevent stack trace leakage in analytics export
**Vulnerability:** The analytics tracker's `getEvents` method was exposing full error stack traces that were logged internally.
**Learning:** Stack traces can leak internal application paths, structure, and dependencies. They should be sanitized or stripped before being exported or exposed to external services or dashboards.
**Prevention:** Always filter out sensitive properties like `stack` before exporting analytics events. Destructuring with the rest operator (`const { stack, ...safeData } = data`) is a safe way to remove sensitive keys without mutating the original object.
