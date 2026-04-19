## 2024-03-24 - Information Exposure via in-memory analytics

**Vulnerability:** The `AnalyticsTracker` class stored full error objects, including sensitive stack traces, in memory. This memory was exposed publicly via an unauthenticated GET request at `/api/analytics`, leading to potential information leakage of internal server structure and paths.

**Learning:** When creating global singletons for state management or analytics that are exposed via API routes, special care must be taken to sanitize data before storage. The boundary between internal tracking and public exposure was implicitly crossed.

**Prevention:** Ensure sensitive data (like stack traces, PII, internal paths) is sanitized *before* being added to any in-memory data store that might be exposed. Error details should be preserved in server-side logs (e.g., `console.error`) rather than stored in analytics structures meant for public or client consumption.