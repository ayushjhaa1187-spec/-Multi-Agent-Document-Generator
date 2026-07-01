## 2024-07-01 - Redundant DB Health Checks
**Learning:** Adding explicit database health checks (like `SELECT 1`) on every API request when using Prisma adds unnecessary network latency (10-50ms+ per request). Prisma automatically manages a robust connection pool, making these manual pings redundant and an anti-pattern.
**Action:** Rely on natural query failures to handle unreachable database states rather than explicit ping queries on hot paths.
