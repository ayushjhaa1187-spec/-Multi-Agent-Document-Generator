## 2026-06-03 - Optimize Message Rendering in AI Chat
**Learning:** Vercel AI SDK text streaming causes inline components mapped over the messages array to trigger O(N²) re-renders on every chunk.
**Action:** Extract these items into standalone components wrapped in `React.memo()` defined outside the parent to ensure only the actively streaming message re-renders.