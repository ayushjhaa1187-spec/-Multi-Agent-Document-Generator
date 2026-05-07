## 2025-05-07 - Memoizing chat messages during streaming
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, the parent component re-renders frequently during streaming. Without memoization, this causes O(N²) re-renders of the entire message list.
**Action:** Always extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` to prevent unnecessary re-renders.
