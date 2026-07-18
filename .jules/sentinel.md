## 2024-07-18 - Prevent Stack Trace Exposure in Analytics
**Vulnerability:** The custom analytics tracker (`lib/analytics.ts`) logged full error stack traces alongside events, potentially exposing internal file paths and logic.
**Learning:** Even internal tracking tools should follow data minimization principles; exposing stack traces broadly increases the risk of information disclosure.
**Prevention:** Explicitly omit or sanitize stack traces in analytics payloads and rely solely on the error message and contextual properties.
