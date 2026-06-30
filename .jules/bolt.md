## 2025-02-12 - Remove redundant Prisma database connection check
**Learning:** Prisma automatically manages its own robust connection pool. Placing explicit `SELECT 1` health checks on every API request is a redundant anti-pattern that introduces unnecessary network latency (10-50ms+ per request).
**Action:** Remove explicit database pings in the hot path. Rely on Prisma's internal connection handling and catch natural query failures instead.
