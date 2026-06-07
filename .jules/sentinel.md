## 2025-06-07 - Sanitize Stack Traces from Analytics Events
**Vulnerability:** The analytics tracker exposed application internals by blindly exporting error stack traces via getEvents().
**Learning:** Destructuring with the rest operator provides a secure way to remove sensitive fields without mutating original object instances.
**Prevention:** Always sanitize outbound internal events or logs before exposing them externally or locally.
