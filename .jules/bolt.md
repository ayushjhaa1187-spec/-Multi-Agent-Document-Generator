## 2024-05-18 - Optimize Database Connections in API Routes
**Learning:** In Prisma-based applications, placing explicit database health checks (like `await prisma.$queryRaw\`SELECT 1\``) before executing queries is a redundant anti-pattern that adds unnecessary network latency (10-50ms+ per request).
**Action:** Remove explicit manual database pings in API routes. Prisma automatically manages its own robust connection pool and handles unreachable states gracefully during actual transactions. Rely on natural query failures instead.
