## 2024-02-19 - [Preventing Information Leakage in Analytics]
**Vulnerability:** Full error stack traces were being exposed in the `/api/analytics` endpoint.
**Learning:** Analytics tracking utilities that capture full Error objects and expose them through an API endpoint inadvertently create information leakage vulnerabilities, potentially revealing sensitive server internals.
**Prevention:** Sanitize error objects before logging/storing them for public or internal endpoints, and ensure properties like stack traces are explicitly excluded from API responses.
