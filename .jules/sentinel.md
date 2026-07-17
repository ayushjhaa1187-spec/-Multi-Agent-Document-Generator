## 2025-03-09 - Missing Authentication on Sensitive API Endpoints
**Vulnerability:** The application exposes sensitive internal metrics (`/api/metrics`) and analytics data (`/api/analytics`) without any authentication or authorization checks.
**Learning:** Any user could access internal metrics and analytics information, which might leak potentially sensitive operation details or performance characteristics.
**Prevention:** Always implement authentication, specifically checking for a predefined admin secret for endpoints that reveal internal application state or analytics to ensure only authorized administrators can access them.
