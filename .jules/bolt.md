## 2024-05-31 - Memoize Vercel AI SDK Streaming Messages
**Learning:** In Next.js apps using Vercel AI SDK text streaming, mapping over the `messages` array inline causes O(N²) re-renders on every chunk because each chunk updates the array, causing all previous messages to re-render.
**Action:** Always extract message list items into standalone components wrapped in `React.memo()` defined outside the parent to ensure only the actively streaming message re-renders.
