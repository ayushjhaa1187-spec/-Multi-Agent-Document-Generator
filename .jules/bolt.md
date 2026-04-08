## 2025-02-26 - API Route Database Check Worsens TTFT
**Learning:** Adding a synchronous database connectivity check (like `SELECT 1`) in the AI streaming API route blocks the main thread unnecessarily and worsens Time-To-First-Token (TTFT), especially when database interaction is already deferred to the `onFinish` callback of the stream.
**Action:** Remove synchronous connectivity checks before streaming begins. Rely on handling database errors asynchronously inside the stream's `onFinish` callback to optimize TTFT.
