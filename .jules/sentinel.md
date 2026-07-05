## 2025-07-05 - Prevent stack trace information leakage
**Vulnerability:** Internal error stack traces being recorded and potentially exposed through analytics tracking.
**Learning:** Exposing full stack traces in analytics or error responses can leak internal code structure, file paths, and dependency versions, which attackers can use for reconnaissance.
**Prevention:** Sanitize error objects to exclude stack traces before logging or tracking them in production environments.
