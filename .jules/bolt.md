## 2025-06-28 - Removed redundant Prisma database health check
**Learning:** In Prisma-based Next.js applications, explicit database health checks (e.g., `await prisma.$queryRaw\`SELECT 1\``) on every API request add unnecessary network latency (10-50ms+). Prisma automatically manages its own robust connection pool.
**Action:** Remove explicit manual pings to the database on every API request and rely on natural query failures to handle unreachable database states appropriately.
