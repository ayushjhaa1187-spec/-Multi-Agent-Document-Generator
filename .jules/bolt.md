## 2024-05-24 - Explicit Database Health Checks Introduce Latency

**Learning:** Explicit database connectivity health checks (e.g., `SELECT 1`) executed at the start of Serverless API endpoints are an anti-pattern. They synchronously block execution and introduce measurable latency for every request, regardless of whether a database operation is immediately required or if it will be handled asynchronously later (e.g., in a background save or Vercel AI SDK `onFinish` callback). In our `/api/chat` route, this resulted in an unnecessary round-trip to the DB prior to streaming AI text.

**Action:** Removed the `SELECT 1` check from `app/api/chat/route.ts`. In the future, prefer defensive coding where database errors are caught during the actual query execution (which often happens asynchronously without blocking the user response) instead of via preliminary synchronous health checks.
