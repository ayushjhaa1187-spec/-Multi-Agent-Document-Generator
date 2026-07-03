## 2025-01-01 - Removed redundant database health check
**Learning:** Explicit database pings like `SELECT 1` on every request add unnecessary network latency (10-50ms+). Prisma manages its own robust connection pool.
**Action:** Rely on natural query failures to handle unreachable database states rather than explicit manual pings.
