## 2026-07-12 - [Database Optimization]
**Learning:** Explicitly pinging the database with `SELECT 1` in Prisma applications adds unnecessary network latency, since Prisma manages its own robust connection pool.
**Action:** Removed the explicit health check from API routes and rely on natural query failures to improve response times.
