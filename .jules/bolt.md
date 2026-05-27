## 2026-05-27 - Memoize AI Chat Messages
**Learning:** When using Vercel AI SDK text streaming, inline components mapped over the messages array trigger O(N²) re-renders on every chunk because a new function reference is created each render.
**Action:** Always extract message list items into standalone components wrapped in React.memo() defined outside the parent component so that only the actively streaming message re-renders.
