## 2024-05-15 - Vercel AI SDK Re-render Optimization
**Learning:** During Vercel AI SDK text streaming, inline components mapped over the `messages` array trigger O(N²) re-renders on every streamed chunk because the component references change constantly.
**Action:** Always extract these mapped inline items into standalone components wrapped in `React.memo()` and define them outside the parent to ensure only the actively streaming message re-renders, reducing operations to O(1).
