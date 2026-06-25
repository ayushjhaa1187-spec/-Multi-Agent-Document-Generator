## 2024-06-25 - Prevent Leakage of Stack Traces via Internal Analytics

**Vulnerability:** The analytics tracker's `getEvents()` method exported raw tracked events, which could contain stack traces of caught errors in the `properties` object. This could leak sensitive internal application structures and environment details.
**Learning:** Even when errors are caught safely, storing their full stack traces in an in-memory analytics array that gets exposed via an endpoint (like `/api/analytics`) creates an Information Disclosure vulnerability.
**Prevention:** Destructure and safely remove sensitive keys like `stack` before returning tracked events from the analytics tracker, avoiding the mutation of original objects using the `delete` keyword.
