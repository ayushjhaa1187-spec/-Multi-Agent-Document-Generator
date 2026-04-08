## 2024-05-24 - Information Exposure via Unauthenticated API Endpoint
**Vulnerability:** The internal analytics tracker stored full error stack traces in-memory. Since these events are publically exported via `GET /api/analytics` endpoint, this caused an unintended information exposure of stack trace details.
**Learning:** Be very careful with unauthenticated metrics or diagnostic endpoints. Any in-memory caching or analytics systems that feed into such endpoints must be thoroughly sanitized of internal system details.
**Prevention:** Never store stack traces in data structures intended for public-facing metrics APIs. Retain them only in explicit server-side logging mechanisms (e.g. `console.error`) that are inaccessible externally.
