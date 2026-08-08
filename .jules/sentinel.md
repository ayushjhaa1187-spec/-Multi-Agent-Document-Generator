## 2026-08-08 - Prevent Stack Trace Leakage in Analytics API
**Vulnerability:** The `/api/analytics` endpoint exposed full stack traces of `Internal server error` responses by storing `error.stack` in the `AnalyticsTracker`.
**Learning:** Custom tracking and logging frameworks often capture too much data by default, turning debugging features into security risks when exposed unauthenticated.
**Prevention:** Explicitly omit stack traces from tracking endpoints and validate what properties are collected on runtime exceptions.
