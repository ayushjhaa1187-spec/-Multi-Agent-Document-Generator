
## 2024-05-24 - AI Streaming Re-renders
**Learning:** In chat interfaces using `useChat` (AI SDK), the entire message list re-renders constantly during streaming. List item components (like `CopyButton`) that only depend on primitive props (`content`) should always be wrapped in `React.memo` to prevent cascading render cycles.
**Action:** Always wrap static/pure UI components inside `messages.map` loops with `React.memo()` to optimize chat streaming performance.
