## 2025-02-14 - Redundant Database Health Checks
**Learning:** Found a `SELECT 1` database health check at the beginning of the `/api/chat` route, executing before the LLM streaming process. This adds unnecessary latency (~10-50ms per request) since the database connection is implicitly tested when actual queries run later in the request lifecycle (like saving the generated BRD).
**Action:** Remove premature/redundant database health checks in critical path API routes when actual queries will naturally catch connection failures.
