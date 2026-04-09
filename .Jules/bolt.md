# Bolt's Performance Journal

## 2024-05-23 - Blocking Database Health Checks
**Learning:** Explicit database health checks (e.g., `SELECT 1`) at the start of API routes add unnecessary latency to every request. In serverless environments, DB connections should be established lazily or handled gracefully during the actual operation.
**Action:** Remove blocking health checks and rely on try/catch blocks around the actual database operations. This improves Time To First Token (TTFT) for AI streaming endpoints.
