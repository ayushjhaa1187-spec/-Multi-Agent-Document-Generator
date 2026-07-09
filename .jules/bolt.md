## 2025-02-28 - Removed Database Ping
**Learning:** Prisma maintains a robust connection pool. Manual `SELECT 1` queries before API processing add an unnecessary 10-50ms latency per request.
**Action:** Remove redundant explicit database health checks. Rely on natural query failures.
