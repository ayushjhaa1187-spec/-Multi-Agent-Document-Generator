## 2024-05-20 - Database checks blocking TTFT
**Learning:** Synchronous database connectivity checks (like `SELECT 1`) executed before AI stream generation unnecessarily block the critical path and worsen Time-To-First-Token (TTFT), especially when database operations are already deferred to the `onFinish` background callback.
**Action:** Remove synchronous database connectivity checks before streaming responses if the database interaction is safely handled asynchronously.
