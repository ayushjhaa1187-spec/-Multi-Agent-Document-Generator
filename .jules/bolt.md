## 2024-05-29 - Optimize Vercel AI SDK Text Streaming React Re-renders
**Learning:** When using Vercel AI SDK text streaming, inline components mapped over the `messages` array trigger O(N²) re-renders on every chunk because React recreates component instances.
**Action:** Always extract items into standalone components wrapped in `React.memo()` defined outside the parent, ensuring only the actively streaming message re-renders.
