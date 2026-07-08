
## 2025-03-08 - Removed redundant database health checks
**Learning:** The codebase was performing explicit `await prisma.$queryRaw\`SELECT 1\`` checks on every API request. This is a common anti-pattern, as Prisma handles its own robust connection pooling. These manual pings add significant overhead per request.
**Action:** Removed the manual pings and relied on natural query failures within transaction blocks to handle unreachable database states, saving latency on every chat API call.
