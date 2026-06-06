## 2025-06-06 - Optimize Vercel AI SDK messages rendering
**Learning:** When using Vercel AI SDK text streaming, inline components mapped over the `messages` array trigger O(N²) re-renders on every chunk because React cannot correctly reuse the anonymous inline map component even with keys.
**Action:** Extract inline mapped items into standalone components wrapped in `React.memo()` (defined outside the parent, setting `displayName` to prevent lint errors) to ensure only the actively streaming message re-renders.
