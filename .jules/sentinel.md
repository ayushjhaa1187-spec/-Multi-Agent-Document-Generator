## 2024-05-19 - Information Exposure via Unsanitized Logging and Analytics

**Vulnerability:** Internal server error stack traces were being directly captured by the analytics tracker (`error.stack`) and exposed publicly via the `/api/analytics` endpoint. Full error objects were also being printed via `console.error` which risks leaking sensitive details to standard logs.

**Learning:** Analytics endpoints that expose internally tracked state to public routes must rigorously sanitize tracked events, especially error details. The `console.error` function by default stringifies whole objects which could inadvertently contain sensitive secrets.

**Prevention:** Always sanitize `console.error` logs to output only the error message (e.g., `error instanceof Error ? error.message : String(error)`). Exclude stack traces from persistent analytics trackers or metrics tools when they may be publicly queried. Add sanitization logic specifically to analytics endpoints to drop fields like `stack`, `password`, or `token`.
