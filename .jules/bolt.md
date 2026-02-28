
## 2025-02-28 - Removed Synchronous Database Health Check Anti-Pattern
**Learning:** Adding a synchronous database connectivity check (e.g., `SELECT 1`) at the very beginning of an API route before calling third-party APIs (like `streamText` for Vercel AI SDK) adds a completely unnecessary database roundtrip that delays the initial streaming response to the user. Database interactions should be deferred to asynchronous callbacks (like `onFinish`) to prevent blocking the main thread and ensure the lowest possible latency for streaming responses.
**Action:** Always avoid putting synchronous connectivity checks on the critical path in streaming or real-time endpoints. Defer database work and error handling to the background wherever possible to improve perceived latency.
