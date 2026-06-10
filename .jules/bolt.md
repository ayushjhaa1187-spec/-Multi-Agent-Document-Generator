## 2024-05-24 - Vercel AI SDK Re-render Optimization
**Learning:** Inline components mapped over the `messages` array in Vercel AI SDK text streaming trigger O(N²) re-renders on every chunk because the parent component updates constantly.
**Action:** Extract these mapped items into standalone components wrapped in `React.memo()` (defined outside the parent component) to ensure only the actively streaming message re-renders, significantly improving performance.
