## 2025-02-17 - Vercel AI SDK Streaming Re-renders
**Learning:** Vercel AI SDK text streaming updates the `messages` array continuously in chunks. Inline mapped components re-render every item in the array on every single chunk, causing O(N²) renders.
**Action:** Always extract items mapped over the `messages` array into standalone components wrapped in `React.memo()` (defined outside the parent component) so only the actively streaming message re-renders.
