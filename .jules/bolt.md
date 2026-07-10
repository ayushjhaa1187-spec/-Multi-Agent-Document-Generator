## 2024-07-10 - Removed redundant explicit database ping

**Learning:** When using Prisma, executing a manual explicit database ping (e.g. `await prisma.$queryRaw\`SELECT 1\``) on every request is a performance anti-pattern. Prisma natively manages a robust connection pool internally, making these explicit checks redundant.
**Action:** Remove explicit database pings and rely on natural query failures. This eliminates unnecessary network latency per API request (often saving 10-50ms+ per request).
