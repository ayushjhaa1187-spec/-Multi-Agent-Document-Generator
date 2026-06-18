## 2025-02-18 - Prevent Sensitive Data Leak in Analytics Export
**Vulnerability:** The `getEvents` method in `lib/analytics.ts` exposed the full `stack` trace of errors (from the `properties` object) when analytics events were exported via the `/api/analytics` endpoint.
**Learning:** Even internal monitoring endpoints can leak internal implementation details if error objects are passed directly into analytics events without sanitization. Error properties like stack traces contain paths, function names, and potentially sensitive environment variables or secrets if they exist on the stack.
**Prevention:** Destructure the `stack` trace out of the `properties` object before returning events from internal tracking utilities, ensuring sensitive internals are not exposed externally.
