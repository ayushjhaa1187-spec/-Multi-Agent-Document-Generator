## 2024-06-15 - [Medium] Fix Stack Trace Leak in Analytics Tracker
**Vulnerability:** The analytics tracker (`lib/analytics.ts`) was logging and exporting full error stack traces (`error.stack`). This data was available via the `/api/analytics` endpoint.
**Learning:** Exporting raw stack traces in public endpoints can leak sensitive internal paths and code structure to external users or attackers.
**Prevention:** Avoid saving or logging `error.stack` inside tracking events. Destructure objects or explicitly construct objects containing only safe error strings.
