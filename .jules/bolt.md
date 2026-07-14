## 2025-07-14 - Removed explicit Prisma database health check
**Learning:** Explicit manual database pings (e.g. `SELECT 1`) on every API request add unnecessary network latency (10-50ms+ per request), as Prisma automatically manages its own robust connection pool. This is a common anti-pattern that hurts performance.
**Action:** Rely on natural query failures to handle unreachable database states rather than explicit pinging on every request.
