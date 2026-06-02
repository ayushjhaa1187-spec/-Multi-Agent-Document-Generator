## 2024-06-02 - Prevent Stack Trace Leakage in Analytics Export
**Vulnerability:** The analytics system could potentially leak sensitive server-side or client-side stack traces through exported analytics events via the `/api/analytics` endpoint.
**Learning:** Even though error tracking is internal, endpoints that expose "raw" analytics events can unintentionally turn into information disclosure vectors if sensitive fields like error stacks aren't scrubbed prior to serialization.
**Prevention:** Always implement a sanitization layer on data export boundaries. When stripping sensitive fields from objects (like `stack`), use object destructuring with the rest operator (`const { stack, ...safeData } = event.properties`) rather than mutating the original array elements.
