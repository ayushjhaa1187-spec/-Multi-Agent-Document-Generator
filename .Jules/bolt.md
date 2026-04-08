## 2026-03-16 - Avoid Synchronous DB Checks Before Streaming
**Learning:** Performing a synchronous database connectivity check (e.g. `SELECT 1`) before initiating an AI stream significantly worsens Time-To-First-Token (TTFT).
**Action:** Remove synchronous DB checks when the actual database interaction is deferred to the `onFinish` callback of the stream. Handle any database connection errors asynchronously during the save phase.
