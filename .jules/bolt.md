## 2023-10-27 - Remove explicit database health check ping

**Learning:** In Prisma-based applications, placing an explicit database ping (e.g., `await prisma.$queryRaw\`SELECT 1\``) on every API request is an anti-pattern. Prisma automatically manages its robust connection pool and naturally fails queries when unreachable, making the ping redundant and adding unnecessary network latency (10-50ms+) to every single request.

**Action:** When using an ORM with built-in connection pooling, rely on natural query failures instead of manual pre-flight database checks in API routes unless specifically diagnosing startup/cold-start issues.
