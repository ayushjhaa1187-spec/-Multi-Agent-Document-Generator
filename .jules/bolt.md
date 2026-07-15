## 2024-07-15 - [Database Health Checks]
**Learning:** Explicit database health checks (like `SELECT 1`) on every request in Prisma add unnecessary network latency. Prisma automatically manages connection pooling.
**Action:** Remove explicit health checks in Prisma endpoints and rely on natural query failures.
