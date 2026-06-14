## 2024-06-14 - Optimize Vercel AI SDK Message Rendering
**Learning:** When using Vercel AI SDK text streaming (`useChat`), inline components mapped over the `messages` array trigger O(N^2) re-renders on every streamed chunk because the parent component updates constantly.
**Action:** Always extract message array items into standalone components wrapped in `React.memo()` (defined outside the parent) to ensure only the actively streaming message re-renders.
