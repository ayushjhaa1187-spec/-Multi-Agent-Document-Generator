## 2024-07-23 - Missing Authentication on Admin Endpoints
**Vulnerability:** Found `app/api/analytics/route.ts` and `app/api/metrics/route.ts` exposing sensitive system metrics and analytical data without any authentication checks.
**Learning:** Admin endpoints can easily be overlooked in API routes, especially when focusing on user-facing features. The environment variables wrapper should include an administrative secret.
**Prevention:** Always verify authorization and authentication requirements on all API endpoints. Use the centralized `ENV` object to manage access secrets securely and fail safe.
