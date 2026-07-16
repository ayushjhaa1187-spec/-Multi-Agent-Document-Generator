## 2025-02-23 - Removed Redundant Database Health Check
**Learning:** Found a redundant `SELECT 1` database health check directly inside the hot path of `/api/chat`. This blocks every single chat request synchronously before processing starts, despite the `prisma` connection pool already managing connections under the hood.
**Action:** Remove explicit ping checks from hot paths; trust the ORM's connection pooling and let actual operations fail naturally to reduce latency by 10-50ms per request.
