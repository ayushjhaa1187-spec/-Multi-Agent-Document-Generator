## 2024-06-25 - Web Crypto API usage
**Learning:** Use standard global `crypto` in Next.js edge/browser environments.
**Action:** Always check `typeof crypto !== 'undefined'` before usage.

## 2024-06-25 - Redundant DB connection health checks
**Learning:** Performing explicit DB health checks (e.g. `prisma.$queryRaw\`SELECT 1\``) on every API request adds measurable overhead (10-50ms latency). Prisma already maintains a robust connection pool.
**Action:** Trust Prisma's connection pooling and rely on natural query failures instead of preemptive pinging to optimize API route latency.
