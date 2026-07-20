## 2024-07-21 - Missing Authentication on Sensitive Endpoints
**Vulnerability:** The `/api/analytics` and `/api/metrics` endpoints exposed application data without authentication.
**Learning:** Internal or metric endpoints must always be secured, as they can leak sensitive metrics and information.
**Prevention:** Always implement an authentication layer using secrets or tokens for endpoints that shouldn't be publicly accessible.
