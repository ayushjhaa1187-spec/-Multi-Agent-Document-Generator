# Bolt's Performance Journal

## 2025-02-24 - AI Streaming TTFT bottleneck with DB checks
**Learning:** Performing a synchronous database check (like `SELECT 1`) prior to invoking AI models unnecessarily blocks the main thread and severely impacts Time-To-First-Token (TTFT) when streaming text responses. The app architecture correctly defers DB writes to the stream's asynchronous `onFinish` callback, making upfront DB checks useless for the critical path.
**Action:** When working on APIs that stream AI responses or large files, ensure NO synchronous infrastructure connectivity checks execute beforehand. Any database actions should be placed in sidecar asynchronous callbacks after streams complete.