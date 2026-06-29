## 2025-02-28 - Removed redundant explicit database health checks

**Learning:** Explicit database health checks (e.g., `await prisma.$queryRaw\`SELECT 1\``) on every API request in Prisma-based backend applications are redundant. Prisma inherently manages its own connection pool robustly. These checks add unnecessary network latency (10-50ms+ per request) and are a common anti-pattern. Relying on natural query failures is a more performant approach to handling unreachable states.
**Action:** Always avoid manually pinging the database on every request to verify connectivity. Only apply connectivity checks at startup/initialization if necessary, and use standard error handling for queries within the request lifecycle.
