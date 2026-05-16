## 2024-05-16 - ChatMessage Memoization
**Learning:** In chat interfaces using Vercel AI SDK's `useChat`, rendering items directly inside `messages.map()` causes O(N²) re-renders of the entire message list during text streaming.
**Action:** Always extract message list items into standalone components wrapped in `React.memo()` with a defined `displayName` when working with AI streaming.
