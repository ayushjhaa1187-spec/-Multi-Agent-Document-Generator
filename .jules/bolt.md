## 2024-06-26 - Remove Redundant Prisma DB Ping
**Learning:** Explicit database health checks (like `SELECT 1`) on every API request using Prisma add unnecessary network latency, as Prisma handles its own robust connection pool.
**Action:** Rely on natural query failures for db errors rather than explicit manual pings before queries in critical paths.
