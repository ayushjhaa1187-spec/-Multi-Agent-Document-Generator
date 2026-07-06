## 2024-07-06 - Unnecessary explicit database health checks in API Routes
**Learning:** Checking database health via `SELECT 1` in Prisma on every API request adds unnecessary network latency (10-50ms+ per request). Prisma inherently manages its connection pool efficiently, making this explicit check redundant and a performance anti-pattern.
**Action:** Remove explicit health checks in frequently called API routes and rely on actual Prisma query failures to handle unreachable database states.
