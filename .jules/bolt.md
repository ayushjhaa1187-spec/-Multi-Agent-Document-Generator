## 2025-02-28 - Optimize MessageItem rendering in Next.js streaming API
**Learning:** Vercel AI SDK text streaming in `useChat` updates the last message continuously. If inline components are mapped over the `messages` array, this triggers O(N²) re-renders. Every chunk update causes all message items to re-render.
**Action:** Extract inline items into standalone components wrapped in `React.memo()` (defined outside the parent). Explicitly set `displayName` property to satisfy `react/display-name` ESLint rules.
