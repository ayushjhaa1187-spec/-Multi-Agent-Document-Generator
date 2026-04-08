## 2024-05-22 - Explicit DB Health Checks in Serverless
**Learning:** `SELECT 1` checks at the start of API routes add significant latency (network round-trip) and are redundant in serverless/connection-pooled environments where connection errors can be handled lazily.
**Action:** Remove explicit health checks; rely on `try/catch` around actual queries or `onFinish` callbacks for async operations.
